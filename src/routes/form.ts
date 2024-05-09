import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { jwtRequest, verifyJwt } from '../middlewares/JWTAuth'
import {
  FormSchema,
  FormSchemaForPrisma,
  questionsSchemaForPrisma,
} from '../utils/schemas/form'
import { paginationSchema } from '../utils/schemas/pagination'

const paramsSchema = z.object({
  id: z.string().uuid(),
})

export async function formRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/forms', async (request: jwtRequest) => {
    const { page, pageSize, query, isPublic } = paginationSchema.parse(
      request.query,
    )

    const forms = await prisma.form.findMany({
      where: {
        ...(query && {
          OR: [{ name: { contains: query } }, { about: { contains: query } }],
        }),
        ...(isPublic ? { isPublic: true } : { userId: request.user?.sub }),
      },
      take: pageSize,
      skip: pageSize * page,
      include: {
        _count: true,
      },
    })

    return forms
  })
  app.get('/form/:id', async (request, reply) => {
    const { id } = paramsSchema.parse(request.params)

    const form = await prisma.form.findUnique({
      where: { id },
      include: {
        topics: true,
        questions: {
          include: {
            options: {
              select: {
                value: true,
                emoji: true,
                text: true,
                _count: true,
              },
            },
          },
        },
      },
    })
    if (!form) return reply.status(404).send({ message: 'Form not found' })

    return form
  })
  app.post('/form', async (request: jwtRequest, reply) => {
    try {
      const paramsSchema = z.object({
        baseFormId: z.string().uuid().optional(),
      })

      const form = FormSchemaForPrisma.parse(request.body)
      const { baseFormId } = paramsSchema.parse(request.query)
      form.userId = request.user?.sub

      async function getBaseFormQuestions(id: string) {
        const baseForm = await prisma.form.findUnique({
          where: { id },
          include: {
            questions: {
              include: {
                options: true,
              },
            },
          },
        })
        if (!baseForm)
          reply.status(404).send({ message: 'Base form not found' })

        return {
          questions: questionsSchemaForPrisma.parse(baseForm?.questions),
        }
      }

      const newForm = await prisma.form.create({
        data: {
          ...form,
          ...(baseFormId && (await getBaseFormQuestions(baseFormId))),
        } as any,
      })
      reply.status(200).send(newForm)
    } catch (err) {
      console.log(err)
      return reply.status(400).send({ message: 'Invalid data', error: err })
    }
  })
  app.put('/form/:id', async (request: jwtRequest, reply) => {
    const { id } = paramsSchema.parse(request.params)
    const form = FormSchema.parse(request.body)

    const formExists = await prisma.form.findUnique({
      where: { id },
    })
    if (!formExists)
      return reply.status(404).send({ message: 'Form not found' })

    const updatedForm = await prisma.form.update({
      where: { id },
      data: form as any,
    })

    return updatedForm
  })
  app.delete('/form/:id', async (request, reply) => {
    const { id } = paramsSchema.parse(request.params)

    const form = await prisma.form.findUnique({
      where: { id },
    })
    if (!form) return reply.status(404).send({ message: 'Form not found' })

    await prisma.form.delete({
      where: { id: form.id },
    })

    return form
  })
}
