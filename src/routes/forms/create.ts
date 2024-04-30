import { FastifyInstance } from 'fastify'
import { statusMessage } from '../../utils/statusMessage'
import { prisma } from '../../lib/prisma'
import { statusCode } from '../../utils/statusCode'
import { FormSchema } from './schemas'
import { verifyJwt } from '../../middlewares/JWTAuth'

export async function createForm(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/form', async (request, reply) => {
    const user = request.user

    const validated = FormSchema.safeParse(request.body)
    if (!validated.success) {
      return reply.status(statusCode.badRequest).send('Invalid parameters')
    }
    validated.data.userId = user.sub

    const topicExistis = await prisma.topic.findUnique({
      where: {
        name: validated.data.topic,
      },
    })
    if (!topicExistis)
      return reply.status(statusCode.notFound).send(statusMessage.topicNotFound)

    console.log(JSON.stringify(validated.data))

    const form = await prisma.form.create({
      data: validated.data,
    })

    return form
  })
}
