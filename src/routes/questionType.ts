import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { verifyJwt } from '../middlewares/JWTAuth'

const paramsSchema = z.object({
  id: z.coerce.number().int().positive().optional(),
  name: z.string(),
})

export async function questionTypeRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  // Listar todos os QuestionTypes
  app.get('/question-types', async (request, reply) => {
    const questionTypes = await prisma.questionType.findMany()
    return reply.status(200).send(questionTypes)
  })

  // Criar um novo QuestionType
  app.post('/question-types', async (request, reply) => {
    const { name } = paramsSchema.parse(request.body)

    const newQuestionType = await prisma.questionType.create({
      data: { name },
    })

    return reply.status(201).send(newQuestionType)
  })

  // Editar um QuestionType existente
  app.put('/question-types/:id', async (request, reply) => {
    const { id } = paramsSchema.parse(request.params)
    const { name } = paramsSchema.parse(request.body)

    const updatedQuestionType = await prisma.questionType.update({
      where: { id },
      data: { name },
    })

    return reply.status(200).send(updatedQuestionType)
  })

  // Excluir um QuestionType
  app.delete('/question-types/:id', async (request, reply) => {
    const { id } = paramsSchema.parse(request.params)

    await prisma.questionType.delete({
      where: { id },
    })

    return reply.status(204).send()
  })
}
