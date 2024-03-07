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

  app.delete('/form/:formId', async (request) => {
    const paramsSchema = z.object({
      formId: z.string().uuid(),
    })
    const { formId } = paramsSchema.parse(request.params)

    const form = await prisma.form.findUniqueOrThrow({
      where: {
        id: formId,
      },
    })
    console.log(form)

    await prisma.form.delete({
      where: {
        id: formId,
      },
    })
    return form
  })
}
