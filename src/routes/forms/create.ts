import { FastifyInstance } from 'fastify'
import { statusMessage } from '../../utils/statusMessage'
import { jwtUser } from '../../types/jwtUser'
import { prisma } from '../../lib/prisma'
import { statusCode } from '../../utils/statusCode'
import { FormSchema } from './schemas'

export async function createForm(app: FastifyInstance) {
  app.addHook('onRequest', async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(statusMessage.notVerified)
    }
  })
  app.post('/form', async (request, reply) => {
    const user = request.user as jwtUser
    let validatedData

    try {
      validatedData = FormSchema.parse(request.body)
      validatedData.userId = user.sub
      console.log(validatedData)
    } catch (e) {
      reply.send('Dados inválidos')
    }

    const topicExistis = await prisma.topic.findUnique({
      where: {
        name: validatedData.topic,
      },
    })
    if (!topicExistis)
      return reply.status(statusCode.notFound).send(statusMessage.topicNotFound)

    const form = await prisma.form.create({
      data: validatedData,
    })

    return form
  })
}
