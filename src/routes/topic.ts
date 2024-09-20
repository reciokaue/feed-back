import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { paginationSchema } from '../utils/schemas/pagination'
import { verifyJwt } from '../middlewares/JWTAuth'

export async function topicRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/topics', async (request, reply) => {
    const { page, pageSize, query } = paginationSchema.parse(request.query)

    const topics = await prisma.topic.findMany({
      where: {
        ...(query && {
          name: { contains: query },
        }),
      },
      take: pageSize,
      skip: pageSize * page,
    })

    return reply.status(200).send(topics)
  })
  app.post('/topics', async (request, reply) => {
    const bodySchema = z.array(z.string().toLowerCase())
    const topics = bodySchema.parse(request.body)

    if (topics.length === 0) {
      return reply.status(400).send({ message: 'missing data' })
    }

    await prisma.topic.createMany({
      data: topics.map((name) => ({ name })),
      skipDuplicates: true,
    })

    const newTopics = await prisma.topic.findMany({
      where: {},
      take: -topics.length,
    })

    reply.status(201).send(newTopics)
  })

  app.delete('/topics', async (request, reply) => {
    const bodySchema = z.array(z.number())
    const topics = bodySchema.parse(request.body)

    if (topics.length === 0)
      return Response.json({ message: 'missing data' }, { status: 400 })

    await prisma.topic.deleteMany({
      where: {
        id: { in: topics },
      },
    })

    reply.send()
  })
}
