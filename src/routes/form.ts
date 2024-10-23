import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { jwtRequest, verifyJwt } from '../middlewares/JWTAuth'
import { paginationSchema } from '../utils/schemas/pagination'
import { formSchema, formSchemaCreate, formSchemaUpdate } from '../utils/schemas/form'
import { formatForm } from '../utils/format/form'
import {
  formCompareSelect,
  formDetailSelect,
  formSelect,
} from '../utils/selects/form'
import { getArrayChanges } from '../utils/getArrayChanges'
import { questionSchemaUpdate } from '../utils/schemas/question'

const paramsSchema = z.object({
  id: z.coerce.number().positive().int().optional(),
  modelId: z.coerce.number().positive().int().optional(),
})

export async function formRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/forms', async (request: jwtRequest) => {
    const { page, pageSize, query, isPublic, topics } = paginationSchema.parse(
      request.query,
    )

    const filters: any = {
      ...(query && {
        OR: [{ name: { contains: query } }, { about: { contains: query } }],
      }),
      ...(isPublic ? { isPublic: true } : { userId: request.user?.sub }),
      ...(topics &&
        topics.length > 0 && {
          formTopics: {
            some: {
              topicId: {
                in: topics, // Filtra os formulários que têm os tópicos selecionados
              },
            },
          },
        }),
    }

    const totalCount = await prisma.form.count({
      where: filters,
    })

    const forms = await prisma.form.findMany({
      where: filters,
      take: pageSize,
      skip: pageSize * page,
      select: formSelect,
    })

    return {
      meta: { page, pageSize, totalCount },
      forms: forms?.map((form) => formatForm(form)),
    }
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

      await prisma.formTopic?.createMany({
        data: topics?.map((topicId) => ({
          formId: newForm.id,
          topicId,
        })) as any,
        skipDuplicates: true,
      })

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

      await prisma.question?.createMany({
        data: baseForm.questions.map(({ formId }, question) => ({
          formId: Number(formId),
          ...(question as any),
        })) as any,
        skipDuplicates: true,
      })

      reply.status(200).send({ message: 'Questões copiadas com sucesso!' })
    } catch (err) {
      console.log(err)
      return reply.status(400).send({ message: 'Erro inesperado', error: err })
    }
  })
  app.put('/form/:id', async (request: jwtRequest, reply) => {
    const { id } = paramsSchema.parse(request.params)
    const form = formSchema.parse(request.body)

    const topics = form.topics
    delete form.topics
    delete form.questions

    const formExists = await prisma.form.findUnique({
      where: { id },
      select: formSelect,
    })
    if (!formExists)
      return reply.status(404).send({ message: 'Formulário não encontrado' })
    
    const deletedTopics = 
      topics?.length === 0? {}: getArrayChanges(topics || [], formExists.formTopics)
 
    await prisma.form.update({
      where: { id },
      data: {
        ...form,
        formTopics: deletedTopics
      } as any,
    })
  })
  app.put('/form/:id/questions', async (request: jwtRequest, reply) => {
    try {
      const { id: formId } = paramsSchema.parse(request.params)
      const questions = z.array(questionSchemaUpdate).parse(request.body)

      if (questions.length === 0)
        return reply
          .status(404)
          .send({ message: 'Não há questões para atualizar' })
      if (questions[0].formId !== formId)
        return reply
          .status(404)
          .send({ message: 'Questão não pertence ao formulário' })

      const form = await prisma.form.findUnique({
        where: { id: formId },
        select: formCompareSelect,
      })

      if (!form)
        return reply.status(404).send({ message: 'Formulário não encontrado' })
      if (form?.userId !== request?.user?.sub)
        return reply
          .status(400)
          .send({ message: 'Este não é o seu formulário' })

      const formQuestionsToUpdate = getArrayChanges(
        questions || [],
        form.questions,
      )

      await prisma.form.update({
        where: { id: formId },
        data: {
          questions: formQuestionsToUpdate,
        },
      })

      return reply.status(200).send({
        message: 'Questões atualizadas com sucesso',
        data: {
          formQuestionsToUpdate,
          questions,
          form,
        },
      })
    } catch (err) {
      console.log(err)
      return reply.status(400).send({ message: 'Erro inesperado', error: err })
    }
  })
  app.delete('/form/:id', async (request: jwtRequest, reply) => {
    const { id } = paramsSchema.parse(request.params)

    const form = await prisma.form.findUnique({
      where: { id },
    })
    if (!form)
      return reply.status(404).send({ message: 'Formulário não encontrado' })
    if (form.userId !== request?.user?.sub)
      return reply.status(400).send({ message: 'Este não é o seu formulário' })

    await prisma.form.delete({
      where: { id: form.id },
    })

    return form
  })
  app.post('/form/:id/question-order', async (request: jwtRequest, reply) => {
    const bodySchema = z.object({
      newOrder: z.array(z.number().int()),
    })

    const { id } = paramsSchema.parse(request.params)
    const { newOrder } = bodySchema.parse(request.body)

    const questions = await prisma.question.findMany({
      where: { formId: id },
      select: { id: true },
      orderBy: { index: 'asc' },
    })

    if (questions.length !== newOrder.length)
      return reply.status(400).send({
        error: 'O número de questões não corresponde à nova ordem fornecida.',
      })

    const allQuestionsExist = questions.every((question) =>
      newOrder.includes(question.id),
    )
    if (!allQuestionsExist)
      return reply.status(400).send({
        error:
          'Algum dos ids selecionados não existe nas questões do formulário',
      })

    const updatePromises = newOrder.map((questionId, i) => {
      return prisma.question.update({
        where: { id: questionId },
        data: { index: i },
      })
    })
    await Promise.all(updatePromises)

    return reply.send({
      success: true,
      message: 'Ordem das questões atualizada com sucesso.',
    })
  })
}
