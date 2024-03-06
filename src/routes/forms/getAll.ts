import { FastifyInstance } from 'fastify'
import { statusMessage } from '../../utils/statusMessage'
import { jwtUser } from '../../types/jwtUser'
import { prisma } from '../../lib/prisma'

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

    const form = await prisma.form.findMany({
      orderBy: { id: 'asc' },
      where: {
        userId: user.sub,
      },
      include: { _count: true },
    })

    return form
  })
}
