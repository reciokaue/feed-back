import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import bcrypt from 'bcrypt'
import { statusCode } from '../utils/statusCode'
import { statusMessage } from '../utils/statusMessage'

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', async (request, reply) => {
    const bodySchema = z.object({
      password: z.string().min(6).max(30),
      email: z.string().email(),
      name: z.string().max(50),
    })
    const { password, email, name } = bodySchema.parse(request.body)
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user
      .create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      })
      .catch((e) => {
        return reply
          .status(statusCode.badRequest)
          .send(statusMessage.emailAlreadyExistis)
      })

    const token = app.jwt.sign(
      { name, email },
      { sub: user.id, expiresIn: '30 days' },
    )

    return { token }
  })

  app.post('/login', async (request, reply) => {
    const bodySchema = z.object({
      password: z.string().min(6).max(30),
      email: z.string().email(),
    })
    const { password, email } = bodySchema.parse(request.body)

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user)
      return reply.status(statusCode.notFound).send(statusMessage.emailNotExist)

    const comparedPassword = await bcrypt.compare(password, user?.password)
    if (!comparedPassword)
      return reply
        .status(statusCode.badRequest)
        .send(statusMessage.invalidPassword)

    const token = app.jwt.sign(
      { name: user.name, email },
      { sub: user.id, expiresIn: '30 days' },
    )

    return token
  })
}
