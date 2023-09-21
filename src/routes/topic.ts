import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function topicRoutes(app: FastifyInstance) {
  app.get('/topic', async (request) => {
    const bodySchema = z.object({ q: z.string().nullable() })
    const { q } = bodySchema.parse(request.query)

    const topic = await prisma.topic.findMany({
      orderBy: {
        name: 'asc',
      },
      where: {
        name: { contains: q || undefined },
      },
    })

    return topic
  })
  app.post('/topic', async (request) => {
    const bodySchema = z.object({
      name: z.string(),
    })
    const { name } = bodySchema.parse(request.body)
    const topic = await prisma.topic.create({
      data: { name },
    })

    return topic
  })
  app.delete('/topic/:name', async (request) => {
    const paramsSchema = z.object({
      name: z.string(),
    })
    const { name } = paramsSchema.parse(request.params)
    const topic = await prisma.topic.findUniqueOrThrow({
      where: {
        name,
      },
    })
    await prisma.topic.delete({
      where: { name },
    })
    return topic
  })
}
