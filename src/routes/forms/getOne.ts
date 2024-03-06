import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'

export async function getOneForm(app: FastifyInstance) {
  app.get('/form/:id', async (request) => {
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
}
