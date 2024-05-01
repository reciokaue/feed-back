import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { verifyJwt } from '../middlewares/JWTAuth'

export async function userRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/users', async (request: any, reply) => {
    const paramsSchema = z.object({
      page: z.number().default(0),
      pageSize: z.number().default(15),
    })
    const { page, pageSize } = paramsSchema.parse(request.params)

    const userExists = await prisma.user.findUniqueOrThrow({
      where: { id: request?.user?.sub },
    })

    if (userExists.accessLevel === 0)
      return reply
        .status(400)
        .send({ message: "You don't have access level do to it" })

    const users = await prisma.user.findMany({
      take: pageSize,
      skip: page * pageSize,
    })

    return users
  })
  app.get('/user/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(request.params)

    const user = await prisma.user.findUniqueOrThrow({
      where: { id },
    })

    return user
  })
}
