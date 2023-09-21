import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function questionTypeRoutes(app: FastifyInstance) {
  app.get('/questionType', async (request) => {
    const { q }: any = request.query

    const questionType = await prisma.questionType.findMany({
      orderBy: {
        name: 'asc',
      },
      where: {
        name: { contains: q }
      }
    })

    return questionType
  })
  app.post('/questionType', async (request) => {
    const bodySchema = z.object({
      name: z.string(),
    })
    const { name } = bodySchema.parse(request.body)
    const questionType = await prisma.questionType.create({
      data: { name },
    })

    return questionType
  })
  app.delete('/questionType/:name', async (request, reply) => {
    const paramsSchema = z.object({
      name: z.string()
    })
    const { name } = paramsSchema.parse(request.params)
    const questionType = await prisma.questionType.findUniqueOrThrow({
      where: {
        name,
      },
    })
    await prisma.questionType.delete({
      where: { name },
    })
    return questionType
  })
}