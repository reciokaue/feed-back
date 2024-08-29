import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { jwtRequest, verifyJwt } from '../middlewares/JWTAuth'
import { paginationSchema } from '../utils/schemas/pagination'
import { formSchemaCreate, formSchemaUpdate } from '../utils/schemas/form'
import { formatForm } from '../utils/format/form'
import { formDetailSelect, formSelect } from '../utils/selects/form'
import { questionSchemaCreate } from '../utils/schemas/question'
import { insertFormTopicsSQLite } from '../utils/insertFormTopicsSQLite'
import {
  insertMultipleQuestionsSQLite,
  insertQuestionSQLite,
} from '../utils/insertQuestionSQLite'

const paramsSchema = z.object({
  id: z.coerce.number().positive().int().optional(),
  modelId: z.coerce.number().positive().int().optional(),
})

export async function formRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/forms', async (request: jwtRequest) => {
    const { page, pageSize, query, isPublic } = paginationSchema.parse(
      request.query,
    )
    console.log(query)

    const forms = await prisma.form.findMany({
      where: {
        ...(query && {
          OR: [{ name: { contains: query } }, { about: { contains: query } }],
        }),
        ...(isPublic ? { isPublic: true } : { userId: request.user?.sub }),
      },
      take: pageSize,
      skip: pageSize * page,
      select: formSelect,
    })
    const formated = forms?.map((form) => formatForm(form))

    return formated
  })
  app.get('/form/:id', async (request, reply) => {
    const { id } = paramsSchema.parse(request.params)

    const form = await prisma.form.findUnique({
      where: { id },
      select: formDetailSelect,
    })

    if (!form)
      return reply.status(404).send({ message: 'Formulário não encontrado' })

    return formatForm(form)
  })
  app.post('/form', async (request: jwtRequest, reply) => {
    try {
      const form = formSchemaCreate.parse(request.body)
      form.userId = request.user?.sub

      const topics = form.topics
      delete form.topics

      const newForm = await prisma.form.create({
        data: form as any,
      })

      // Verifica o tipo de banco de dados
      const dbType = process.env.DATABASE_TYPE || 'mysql' // Assumindo que o tipo de banco de dados está em DATABASE_TYPE no .env

      if (dbType === 'sqlite') {
        if (topics && topics.length > 0) {
          await insertFormTopicsSQLite(topics, newForm.id)
        }
      } else {
        await prisma.formTopic?.createMany({
          data: topics?.map((topicId) => ({
            formId: newForm.id,
            topicId,
          })) as any,
          skipDuplicates: true,
        })
      }

      reply.status(200).send(newForm)
    } catch (err) {
      console.log(err)
      return reply.status(400).send({ message: 'Erro inesperado', error: err })
    }
  })
  app.post('/form/:id/model/:modelId', async (request: jwtRequest, reply) => {
    try {
      const { id: formId, modelId } = paramsSchema.parse(request.params)

      const baseForm = await prisma.form.findUnique({
        where: { id: modelId },
        include: {
          questions: {
            include: {
              options: true,
            },
          },
        },
      })

      if (!baseForm || !formId) {
        return reply
          .status(404)
          .send({ message: 'Formulário modelo não encontrado' })
      }

      const dbType = process.env.DATABASE_TYPE || 'mysql'

      if (dbType === 'sqlite') {
        await insertMultipleQuestionsSQLite(baseForm.questions, +formId)
      } else {
        await prisma.question?.createMany({
          data: baseForm.questions.map(({ formId }, question) => ({
            formId: Number(formId),
            ...question,
          })),
          skipDuplicates: true,
        })
      }

      reply.status(200).send({ message: 'Questões copiadas com sucesso!' })
    } catch (err) {
      console.log(err)
      return reply.status(400).send({ message: 'Erro inesperado', error: err })
    }
  })
  app.put('/form/:id', async (request: jwtRequest, reply) => {
    const { id } = paramsSchema.parse(request.params)
    const form = formSchemaUpdate.parse(request.body)

    const topics = form.topics
    delete form.topics
    delete form.questions

    const formExists = await prisma.form.findUnique({
      where: { id },
      select: formSelect,
    })
    if (!formExists)
      return reply.status(404).send({ message: 'Formulário não encontrado' })

    const topicsIds = formExists.formTopics.map(
      (formTopic) => formTopic.topic.id,
    )
    const deletedTopics = topicsIds
      ?.filter((topic) => !topics?.includes(topic))
      .map((topic) => ({ topicId: topic, formId: id }))
    const newTopics = topics
      ?.filter((topic) => !topicsIds?.includes(topic))
      .map((topic) => ({ topicId: topic }))

    await prisma.form.update({
      where: { id },
      data: {
        ...form,
        formTopics: {
          deleteMany: deletedTopics,
          createMany: { data: newTopics },
        },
      } as any,
    })
  })
  app.delete('/form/:id', async (request: jwtRequest, reply) => {
    const { id } = paramsSchema.parse(request.params)

    const form = await prisma.form.findUnique({
      where: { id },
    })
    if (!form)
      return reply.status(404).send({ message: 'Formulário não encontrado' })
    if (form.userId !== request?.user?.sub && request.user?.access === 0)
      return reply.status(400).send({ message: 'Este não é o seu formulário' })

    await prisma.form.delete({
      where: { id: form.id },
    })

    return form
  })

  app.post('/form/:id/question-order', async (request: jwtRequest, reply) => {
    const bodySchema = z.object({
      from: z.number().int(),
      to: z.number().int(),
    })
    const { id } = paramsSchema.parse(request.params)
    const { from, to } = bodySchema.parse(request.body)
    console.log(from, to)
    if (from === to) return reply.send()

    const questions = await prisma.question.findMany({
      where: {
        formId: id,
        index: {
          in: [from, to],
        },
      },
      select: {
        id: true,
        index: true,
      },
      orderBy: {
        index: 'asc',
      },
    })
    await prisma.question.update({
      where: { id: questions[0].id },
      data: { index: questions[1].index },
    })
    await prisma.question.update({
      where: { id: questions[1].id },
      data: { index: questions[0].index },
    })

    return reply.send({ from, to, id, questions })

    // const { id: baseFormId } = paramsSchema.parse(request.query)
  })
}

async function getBaseFormQuestions(id: number, reply: any) {
  const baseForm = await prisma.form.findUnique({
    where: { id },
    include: {
      questions: {
        include: {
          options: true,
        },
      },
    },
  })
  if (!baseForm)
    reply.status(404).send({ message: 'Base formulário não encontrado' })

  return {
    questions: {
      create: z.array(questionSchemaCreate).parse(baseForm?.questions),
    },
  }
}
