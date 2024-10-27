import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { jwtRequest, verifyJwt } from '../middlewares/JWTAuth'
import { paginationSchema } from '../utils/paginationSchema'
import {
  formDetailSelect,
  FormSchema,
  formSelect,
} from '../../prisma/models/Form'
import { getArrayChanges } from '../utils/getArrayChanges'

const paramsSchema = z.object({
  id: z.coerce.number().positive().int().optional(),
  modelId: z.coerce.number().positive().int().optional(),
})

export async function formRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/forms', async (request: jwtRequest) => {
    const { page, pageSize, query, isPublic, categoryId } = paginationSchema.parse(
      request.query,
    )

    const filters: any = {
      ...(query && {
        OR: [
          { name: { contains: query } },
          { about: { contains: query } }
        ],
      }),
      ...(isPublic ? { isPublic: true } : { userId: request.user?.sub }),
      ...(categoryId && { category: { id: categoryId } }),
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

    return { meta: { page, pageSize, totalCount }, forms }
  })
  app.get('/form/:id', async (request, reply) => {
    const { id } = paramsSchema.parse(request.params)

    const form = await prisma.form.findUnique({
      where: { id },
      select: formDetailSelect,
    })

    if (!form)
      return reply.status(404).send({ message: 'Formulário não encontrado' })

    return reply.status(200).send(form)
  })
  app.post('/form', async (request: jwtRequest, reply) => {
    try {
      const form = FormSchema.partial().parse(request.body)

      const newForm = await prisma.form.create({
        data: {
          ...form,
          userId: request.user.sub,
          categoryId: form?.category?.id || form.categoryId
        } as any,
      })

      reply.status(200).send(newForm)
    } catch (err) {
      console.log(err)
      return reply.status(400).send({ message: 'Erro inesperado', error: err })
    }
  })
  app.put('/form/:id', async (request: jwtRequest, reply) => {
    const { id } = paramsSchema.parse(request.params)
    const form = FormSchema.partial().parse(request.body)
    const category = form?.category?.id || form.categoryId
    delete form.id
    delete form.userId
    delete form.category
    delete form.createdAt

    const formExists = (await prisma.form.findUnique({
      where: { id },
      select: formDetailSelect,
    }))

    if (!formExists)
      return reply.status(404).send({ message: 'Formulário não encontrado' })
    if (formExists?.userId !== request?.user?.sub)
      return reply.status(400).send({ message: 'Este não é o seu formulário' })

    const formQuestionsToUpdate = (form.questions !== null || form.questions !== undefined) &&
      getArrayChanges(form?.questions || [], formExists.questions || [])


    const data = {
      ...form,
      category: { connect: { id: category } },
      ...({ questions: formQuestionsToUpdate })
    }

    await prisma.form.update({
      where: { id },
      data: data as any,
    })
  })
  app.put('/form/:id/topics', async (request: jwtRequest, reply) => {
    const { id } = paramsSchema.parse(request.params)
    const form = formSchema.parse(request.body)

    const topics = form.topics

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
      ?.filter((topic: any) => !topics?.includes(topic))
      .map((topic: any) => ({ topicId: topic, formId: id }))
    const newTopics = topics
      ?.filter((topic: any) => !topicsIds?.includes(topic))
      .map((topic: any) => ({ topicId: topic.id }))

    await prisma.form.update({
      where: { id },
      data: {
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
    if (form.userId !== request?.user?.sub)
      return reply.status(400).send({ message: 'Este não é o seu formulário' })

    await prisma.form.delete({
      where: { id: form.id },
    })

    return form
  })
}
