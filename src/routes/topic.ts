import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { paginationSchema } from '../utils/schemas/pagination'
import { verifyJwt } from '../middlewares/JWTAuth'

export async function topicRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/topics', async (request) => {
    const { page, pageSize, query } = paginationSchema.parse(request.params)

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

    return formatedTopics
  })
  app.post('/topics', async (request) => {
    const bodySchema = z.array(z.string())
    const topics = bodySchema.parse(request.body)

    if (topics.length === 0)
      return Response.json({ message: 'missing data' }, { status: 400 })

    async function addTopic(topic: string) {
      try {
        await prisma.topic.create({
          data: { name: topic },
        })
      } catch (e) {}
    }

    await Promise.all(
      topics.map((topic: string) => {
        return addTopic(topic)
      }),
    )
  })
  app.delete('/topics', async (request) => {
    const bodySchema = z.array(z.string())
    const topics = bodySchema.parse(request.body)

    if (topics.length === 0)
      return Response.json({ message: 'missing data' }, { status: 400 })

    await prisma.topic.deleteMany({
      where: {
        name: { in: topics },
      },
    })
  })
}
