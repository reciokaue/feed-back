import { FastifyInstance } from 'fastify'
import { statusMessage } from '../../utils/statusMessage'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'

export async function deleteForm(app: FastifyInstance) {
  app.addHook('onRequest', async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(statusMessage.notVerified)
    }
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
