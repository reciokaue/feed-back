import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { jwtRequest, verifyJwt } from '../middlewares/JWTAuth'
import { userSchema } from '../utils/schemas/user'
import bcrypt from 'bcrypt'

const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
})

export async function userRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/users', async (request: jwtRequest) => {
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
  app.get('/user/:id', async (request, reply) => {
    const { id } = paramsSchema.parse(request.params)

    const user = await prisma.user.findUnique({
      where: { id },
    })
    if (!user) return reply.status(404).send({ message: 'User not found' })

    return user
  })
  app.put('/user/:id', async (request, reply) => {
    const { id } = paramsSchema.parse(request.params)
    const user = userSchema.parse(request.body)

    const userExists = await prisma.user.findUnique({
      where: { id },
    })
    if (!userExists || id !== user.id)
      return reply.status(404).send({ message: 'User not found' })

    const hashedPassword =
      user.password && (await bcrypt.hash(user?.password, 10))

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...user,
        ...(user.password && { password: hashedPassword }),
      },
    })

    return reply.send(updatedUser)
  })
  app.delete('/user/:id', async (request, reply) => {
    const { id } = paramsSchema.parse(request.params)

    const userExists = await prisma.user.findUnique({
      where: { id },
    })
    if (!userExists)
      return reply.status(404).send({ message: 'User not found' })

    const deletedUser = await prisma.user.delete({
      where: { id },
    })

    return reply.send(deletedUser)
  })
}
