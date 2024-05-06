import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { jwtRequest, verifyJwt } from '../middlewares/JWTAuth'
import { FormSchema } from '../utils/schemas/form'

export async function formRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/forms', async (request: jwtRequest) => {
    const user = request.user

    const form = await prisma.form.findMany({
      where: { userId: user?.sub },
      include: { topics: true, _count: true },
    })

    return form
  })
  app.get('/form/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const form = await prisma.form.findUnique({
      where: { id },
      include: {
        topics: true,
        questions: {
          include: {
            options: true,
          },
        },
      },
    })

    if (!form) return reply.status(404).send({ message: 'Form not found' })

    return form
  })
  app.post('/form', async (request, reply) => {
    try {
      const paramsSchema = z.object({
        baseFormId: z.string().uuid().optional(),
      })

      const form = FormSchema.parse(request.body)
      const { baseFormId } = paramsSchema.parse(request.params)

      const newForm = await prisma.form.create({
        data: form as any,
      })

      if (baseFormId) {
        const baseForm = await prisma.form.findUnique({
          where: { id: baseFormId },
          include: {
            questions: true,
          },
        })
        const promiseQuestions = baseForm?.questions
          ? baseForm?.questions.map(async (question) => {
              try {
                await prisma.question.create({
                  data: { ...question, formId: newForm.id } as any,
                })
              } catch (e) {
                console.log(e)
              }
            })
          : []

        await Promise.all(promiseQuestions)
      }

      reply.status(200).send(form)
    } catch (err) {
      console.log(err)
      return reply.status(400).send({ message: 'Invalid data', error: err })
    }
  })
}
