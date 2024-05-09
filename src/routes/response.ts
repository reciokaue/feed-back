import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { paginationSchema } from '../utils/schemas/pagination'

const paramsSchema = z.object({
  questionId: z.string().uuid().optional(),
  responseId: z.string().uuid().optional(),
})

export async function responseRoutes(app: FastifyInstance) {
  app.get('/responses/:questionId', async (request) => {
    const { page, pageSize, query } = paginationSchema.parse(request.query)
    const { questionId } = paramsSchema.parse(request.params)

    const responses = await prisma.response.findMany({
      where: { questionId, OR: [{ value: query }] },
      take: pageSize,
      skip: pageSize * page,
    })

    return responses
  })
  app.post('/responses', async (request) => {
    const bodySchema = z.array(z.string().toLowerCase())
    const responses = bodySchema.parse(request.body)

    if (responses.length === 0)
      return Response.json({ message: 'missing data' }, { status: 400 })

    await prisma.response.createMany({
      data: responses.map((name) => ({ name })),
      skipDuplicates: true,
    })
  })
  app.delete('/responses', async (request) => {
    const bodySchema = z.array(z.string())
    const responses = bodySchema.parse(request.body)

    if (responses.length === 0)
      return Response.json({ message: 'missing data' }, { status: 400 })

    await prisma.response.deleteMany({
      where: {
        name: { in: responses },
      },
    })
  })
}
