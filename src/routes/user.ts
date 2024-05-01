import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { jwtRequest, verifyJwt } from '../middlewares/JWTAuth'
import { verifyAccessLevel } from '../middlewares/accessLevel'

export async function userRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/users', async (request: jwtRequest, reply) => {
    verifyAccessLevel(request, reply)

    const paramsSchema = z.object({
      page: z.number().default(0),
      pageSize: z.number().default(15),
    })
    const { page, pageSize } = paramsSchema.parse(request.params)

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
