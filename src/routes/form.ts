import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function formRoutes(app: FastifyInstance) {
  app.get('/form', async (request) => {
    const form = await prisma.form.findMany({
      orderBy: {
        id: 'asc',
      },
      include: {
        _count: true
      }
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
            responses: true,
            _count: true,
          }
        }
      }
    })

    return form
  })
  app.post('/form', async (request) => {
    const bodySchema = z.object({
      name: z.string(),
      about: z.string(),
    })

    const { name, about } = bodySchema.parse(request.body)

    const form = await prisma.form.create({
      data: {
        name,
        about
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
  app.delete('/form/:id', async (request, reply) => {
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
  })
}
