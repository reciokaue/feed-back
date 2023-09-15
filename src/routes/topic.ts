import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function topicRoutes(app: FastifyInstance) {
  app.get('/topic', async (request) => {
    const { q }: any = request.query

    const topic = await prisma.topic.findMany({
      orderBy: {
        title: 'asc',
      },
      where: {
        title: { contains: q }
      }
    })

    return topic
  })
  app.post('/topic', async (request) => {
    const bodySchema = z.object({
      title: z.string(),
    })
    const { title } = bodySchema.parse(request.body)
    const topic = await prisma.topic.create({
      data: { title },
    })

    return topic
  })
  app.delete('/topic/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(request.params)
    const topic = await prisma.topic.findUniqueOrThrow({
      where: {
        id,
      },
    })
    await prisma.topic.delete({
      where: { id },
    })
    return topic
  })
}
