import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { jwtRequest, verifyJwt } from '../middlewares/JWTAuth'
import { paginationSchema } from '../utils/schemas/pagination'
import { formSchemaCreate, formSchemaUpdate } from '../utils/schemas/form'
import { formatForm } from '../utils/format/form'
import { formDetailSelect, formSelect } from '../utils/selects/form'

const paramsSchema = z.object({
  id: z.coerce.number().positive().int().optional(),
})

export async function formRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/forms', async (request: jwtRequest) => {
    const { page, pageSize, query, isPublic } = paginationSchema.parse(
      request.query,
    )

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

    if (!form) return reply.status(404).send({ message: 'Form not found' })

    return formatForm(form)
  })
  app.post('/form', async (request: jwtRequest, reply) => {
    try {
      const { id: baseFormId } = paramsSchema.parse(request.query)
      const form = formSchemaCreate.parse(request.body)
      console.log(form)

      form.userId = request.user?.sub
      const topics = form.topics
      delete form.topics

      const newForm = await prisma.form.create({
        data: {
          ...form,
          ...(baseFormId && (await getBaseFormQuestions(baseFormId, reply))),
        } as any,
      })
      await prisma.formTopic.createMany({
        data: topics?.map((topicId) => ({
          formId: newForm.id,
          topicId,
        })) as any,
        skipDuplicates: true,
      })

      reply.status(200).send(newForm)
    } catch (err) {
      console.log(err)
      return reply.status(400).send({ message: 'Invalid data', error: err })
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
      return reply.status(404).send({ message: 'Form not found' })

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
    if (!form) return reply.status(404).send({ message: 'Form not found' })
    if (form.userId !== request?.user?.sub && request.user?.access === 0)
      return reply.status(400).send({ message: 'Not your form' })

    await prisma.form.delete({
      where: { id: form.id },
    })

    return form
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
  if (!baseForm) reply.status(404).send({ message: 'Base form not found' })

  return {
    questions: questionsSchemaForPrisma.parse(baseForm?.questions),
  }
}
