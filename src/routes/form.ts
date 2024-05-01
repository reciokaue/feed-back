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
  app.get('/form/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const form = await prisma.form.findUniqueOrThrow({
      where: { id },
      include: {
        topics: true,
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
    const form = FormSchema.parseAsync(request.params)

    reply.status(200).send(form)
  })
}
