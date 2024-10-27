import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { verifyJwt } from '../middlewares/JWTAuth'
import { QuestionTypeSchema } from '../../prisma/models/QuestionType'

export async function questionTypeRoutes(app: FastifyInstance) {
  // app.addHook('onRequest', verifyJwt)

  app.get('/question-types', async (request, reply) => {
    const questionTypes = await prisma.questionType.findMany()
    return reply.status(200).send(questionTypes)
  })

  app.post('/question-types', async (request, reply) => {
    const questionType = QuestionTypeSchema.parse(request.body)

    const newQuestionType = await prisma.questionType.create({
      data: questionType as any,
    })

    return reply.status(201).send(newQuestionType)
  })

  app.put('/question-types/:id', async (request, reply) => {
    const { id } = QuestionTypeSchema.parse(request.params)
    const questionType = QuestionTypeSchema.parse(request.body)

    const updatedQuestionType = await prisma.questionType.update({
      where: { id },
      data: questionType,
    })

    return reply.status(200).send(updatedQuestionType)
  })

  app.delete('/question-types/:id', async (request, reply) => {
    const { id } = QuestionTypeSchema.parse(request.params)

    await prisma.questionType.delete({
      where: { id },
    })

    return reply.status(204).send()
  })
}
