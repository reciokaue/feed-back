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
      where: { userId: user.sub },
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
  app.post('/form', async (request, reply) => {
    const user = request.user as jwtUser
    const bodySchema = z.object({
      name: z.string(),
      about: z.string(),
      topic: z.string(),
    })
    const { name, about, topic } = bodySchema.parse(request.body)

    const topicExistis = await prisma.topic.findUnique({
      where: {
        name: topic,
      },
    })
    if (!topicExistis)
      return reply.status(statusCode.notFound).send(statusMessage.topicNotFound)

    const form = await prisma.form.create({
      data: {
        name,
        about,
        topic,
        userId: user.sub,
      },
    })

    return form
  })
  app.put('/form/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const bodySchema = z.object({
      name: z.string(),
      about: z.string(),
    })

    const { name, about } = bodySchema.parse(request.body)
    const { id } = paramsSchema.parse(request.params)

    let form = await prisma.form.findUniqueOrThrow({
      where: {
        id,
      },
    })

    form = await prisma.form.update({
      where: {
        id,
      },
      data: {
        name,
        about,
      },
    })

    return form
  })
  app.delete('/form/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(request.params)

    const form = await prisma.form.findUniqueOrThrow({
      where: {
        id,
      },
    })

    await prisma.form.delete({
      where: { id },
    })
    return form
  })
}
