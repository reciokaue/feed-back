import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { paginationSchema } from '../utils/schemas/pagination'
import { ResponseSchema } from '../utils/schemas/form'

const paramsSchema = z.object({
  questionId: z.string().uuid().optional(),
  responseId: z.string().uuid().optional(),
  sessionId: z.string().uuid().optional(),
  formId: z.string().uuid().optional(),
})

export async function responseRoutes(app: FastifyInstance) {
  app.get('/responses/:questionId', async (request) => {
    const { page, pageSize, query } = paginationSchema.parse(request.query)
    const { questionId } = paramsSchema.parse(request.params)

    const responses = await prisma.response.findMany({
      where: {
        questionId,
        ...(query && { value: { contains: query } }),
      },
      take: pageSize,
      skip: pageSize * page,
    })

    return responses
  })
  app.get('/responses/session/:sessionId', async (request) => {
    const { page, pageSize, query } = paginationSchema.parse(request.query)
    const { sessionId } = paramsSchema.parse(request.params)

    const responses = await prisma.response.findMany({
      where: {
        sessionId,
        ...(query && { value: { contains: query } }),
      },
      take: pageSize,
      skip: pageSize * page,
    })

    return responses
  })
  app.post('/response', async (request, reply) => {
    const response = ResponseSchema.parse(request.body)

    const question = await prisma.question.findUnique({
      where: { id: response.questionId },
    })
    if (!question)
      return reply.status(404).send({ message: 'Question does not exist' })

    if (!response.sessionId) {
      const session = await prisma.session.create({
        data: {
          formId: question.formId,
          responses: {
            create: response,
          },
        },
      })
      return reply.status(201).send(session.id)
    }

    await prisma.response.create({
      data: response,
    })
  })
  app.delete('/response/:responseId', async (request) => {
    const { responseId } = paramsSchema.parse(request.params)

    await prisma.response.delete({
      where: { id: responseId },
    })
  })
  app.delete('/session/:sessionId', async (request) => {
    const { sessionId } = paramsSchema.parse(request.params)

    await prisma.session.delete({
      where: { id: sessionId },
    })
  })

  app.get('/sessions/:formId', async (request) => {
    const { page, pageSize, query } = paginationSchema.parse(request.query)
    const { formId } = paramsSchema.parse(request.params)

    const sessions = await prisma.session.findMany({
      where: {
        formId,
        ...(query && { createdAt: query }),
      },
      take: pageSize,
      skip: pageSize * page,
      include: {
        responses: {
          select: {
            id: true,
            optionId: true,
            value: true,
          },
        },
      },
    })

    return sessions
  })
}
