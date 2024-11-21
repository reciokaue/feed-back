import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import bcrypt from 'bcrypt'
import { statusCode } from '../utils/statusCode'
import { statusMessage } from '../utils/statusMessage'
import jwt from 'jsonwebtoken'

const secret = process.env.SECRET || ''
const expires = process.env.EXPIRES_IN || '1 day'

export async function authRoutes(app: FastifyInstance) {
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

    const token = jwt.sign({ name: user.name, email, sub: user.id }, secret, {
      expiresIn: expires,
    })

    return {
      user,
      token
    }
  })
  app.post('/register', async (request, reply) => {
    const bodySchema = z.object({
      password: z.string().min(6).max(30),
      email: z.string().email(),
      name: z.string().max(50).min(3),
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
        console.log(e)
        return reply
          .status(statusCode.badRequest)
          .send(statusMessage.emailAlreadyExistis)
      })

    const token = jwt.sign({ name: user.name, email, sub: user.id }, secret, {
      expiresIn: expires,
    })

    return {
      user,
      token
    }
  })
  app.post('/refresh', async (request, reply) => {
    const bodySchema = z.object({
      token: z.string(),
    })
    const { token } = bodySchema.parse(request.body)
    console.log()
    const newToken = jwt.verify(
      token,
      secret,
      { ignoreExpiration: true },
      async (err, decoded) => {
        if (err || !decoded)
          return reply.status(400).send({ message: 'Invalid token' })

        const { sub, name, email } = decoded as never
        const userExists = await prisma.user.findUniqueOrThrow({
          where: { id: sub },
        })

        if (userExists) {
          const newToken = jwt.sign({ name, email, sub }, secret, {
            expiresIn: expires,
          })
          return newToken
        }
      },
    )

    return newToken
  })
}
