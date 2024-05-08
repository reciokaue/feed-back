import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { verifyJwt } from '../middlewares/JWTAuth'
import { OptionSchema } from '../utils/schemas/form'

export async function optionRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  const paramsSchema = z.object({
    questionId: z.string().uuid().optional(),
    optionId: z.string().uuid().optional(),
  })

  app.get('/options/:questionId', async (request) => {
    const { questionId } = z
      .object({ questionId: z.string().uuid() })
      .parse(request.params)

    const options = await prisma.option.findMany({
      where: { questionId },
    })

    return options
  })
  app.post('/option', async (request) => {
    const option = OptionSchema.extend({
      questionId: z.string().uuid(),
    }).parse(request.body)

    const newOption = await prisma.option.create({
      data: option,
    })

    return newOption
  })
  app.delete(`/option/:optionId`, async (request) => {
    const { optionId } = paramsSchema.parse(request.params)

    await prisma.option.delete({
      where: { id: optionId },
    })
  })
}
