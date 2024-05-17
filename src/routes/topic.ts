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
    const formatedTopics = topics.map((topic) => topic.name)

    return reply.status(200).send(formatedTopics)
  })
  app.post('/topics', async (request, reply) => {
    const bodySchema = z.array(z.string().toLowerCase())
    const topics = bodySchema.parse(request.body)

    if (topics.length === 0)
      return Response.json({ message: 'missing data' }, { status: 400 })

    await prisma.topic.createMany({
      data: topics.map((name) => ({ name })),
      skipDuplicates: true,
    })

    reply.status(201).send()
  })
  app.delete('/topics', async (request, reply) => {
    const bodySchema = z.array(z.string())
    const topics = bodySchema.parse(request.body)

    if (topics.length === 0)
      return Response.json({ message: 'missing data' }, { status: 400 })

    await prisma.topic.deleteMany({
      where: {
        name: { in: topics },
      },
    })

    reply.send()
  })
}
