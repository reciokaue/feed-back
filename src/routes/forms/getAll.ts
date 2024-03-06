import { FastifyInstance } from 'fastify'
import { statusMessage } from '../../utils/statusMessage'
import { jwtUser } from '../../types/jwtUser'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function getAllForms(app: FastifyInstance) {
  app.addHook('onRequest', async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(statusMessage.notVerified)
    }
  })

  app.get('/form', async (request) => {
    const user = request.user as jwtUser

    const paramsSchema = z.object({
      page: z.number().default(0),
      pageSize: z.number().default(6),
    })
    const { page, pageSize } = paramsSchema.parse(request.params)

    const form = await prisma.form.findMany({
      orderBy: { id: 'asc' },
      where: {
        userId: user.sub,
      },
      include: { _count: true },
      take: pageSize,
      skip: page * pageSize,
    })

    return form
  })
}
