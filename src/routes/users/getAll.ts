import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'
import { statusMessage } from '../../utils/statusMessage'

export async function getUsers(app: FastifyInstance) {
  app.addHook('onRequest', async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(statusMessage.notVerified)
    }
  })
  app.get('/users', async (request) => {
    const paramsSchema = z.object({
      page: z.number().default(0),
      pageSize: z.number().default(15)
    })
    const { page, pageSize } = paramsSchema.parse(request.params)
    
    const questions = await prisma.user.findMany({
      take: pageSize,
      skip: page * pageSize,
    })

    return questions
  })
}
