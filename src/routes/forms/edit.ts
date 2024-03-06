import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { statusMessage } from '../../utils/statusMessage'
import { prisma } from '../../lib/prisma'
import { FormSchema } from './schemas'
import { statusCode } from '../../utils/statusCode'
import { jwtUser } from '../../types/jwtUser'

export async function editForm(app: FastifyInstance) {
  app.addHook('onRequest', async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(statusMessage.notVerified)
    }
  })

  app.put('/form/:formId', async (request, reply) => {
    const user = request.user as jwtUser
    const paramsSchema = z.object({
      formId: z.string().uuid(),
    })

    const validatedParams = paramsSchema.safeParse(request.params)
    if (!validatedParams.success) {
      reply.status(statusCode.badRequest).send('Invalid parameters')
      return
    }

    const formId = validatedParams.data.formId
    const validatedData = FormSchema.safeParse(request.body)
    if (!validatedData.success) {
      reply.status(statusCode.badRequest).send('Invalid form data')
      return
    }

    validatedData.data.userId = user!.sub

    try {
      await prisma.topic.findUnique({
        where: { name: validatedData.data.topic },
      })
    } catch {
      reply.status(statusCode.notFound).send('Topic not found')
    }

    try {
      await prisma.form.findUnique({
        where: { id: formId },
      })
    } catch {
      reply.status(statusCode.notFound).send('Form not found')
    }

    const updatedForm = await prisma.form.update({
      where: { id: formId },
      data: validatedData.data,
    })

    return updatedForm
  })
}
