import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { statusMessage } from '../utils/statusMessage'
import { statusCode } from '../utils/statusCode'
import { jwtUser } from '../types/jwtUser'

export async function formRoutes(app: FastifyInstance) {
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
  app.get('/form/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const form = await prisma.form.findUniqueOrThrow({
      where: { id },
      include: {
        questions: {
          include: {
            options: true,
            _count: true,
          },
        },
      },
    })

    return form
  })
}
