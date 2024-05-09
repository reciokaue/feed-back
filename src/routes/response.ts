import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { paginationSchema } from '../utils/schemas/pagination'
import { ResponseSchema } from '../utils/schemas/form'

const paramsSchema = z.object({
  questionId: z.string().uuid().optional(),
  responseId: z.string().uuid().optional(),
  sessionId: z.string().uuid().optional(),
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

    if (!response.sessionId) {
      const session = await prisma.session.create({
        data: {
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

    await prisma.response.deleteMany({
      where: { id: responseId },
    })
  })
}
