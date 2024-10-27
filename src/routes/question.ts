import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { jwtRequest, verifyJwt } from '../middlewares/JWTAuth'


import { formatForAdding, getArrayChanges } from '../utils/getArrayChanges'
import { questionResponsesSelect, questionSchemaCreate, questionSchemaUpdate, questionSelect } from '../../prisma/models/Question'
import { paginationSchema } from '../utils/paginationSchema'

const paramsSchema = z.object({
  questionId: z.coerce.number().int().positive().optional(),
  formId: z.coerce.number().int().positive().optional(),
})

export async function questionRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/question/:questionId', async (request, reply) => {
    const { questionId } = paramsSchema.parse(request.params)
    const question = await prisma.question.findUnique({
      where: { id: questionId },
      select: questionResponsesSelect,
    })
    if (!question)
      return reply.status(404).send({ message: 'Question not found' })

    return question
  })
  // public questions
  app.get('/questions', async (request, reply) => {
    const { query, page, pageSize, categoryId } = paginationSchema.parse(request.query)

    const questions = await prisma.question.findMany({
      where: {
        form: {
          isPublic: true,
          ...(categoryId && { categoryId: categoryId }),
        },
        ...(query && {
          text: {contains: query, mode: 'insensitive'},
        }),
      },
      take: pageSize,
      skip: pageSize * page,
      select: { ...questionSelect, formId: true },
    })

    return questions
  })
  app.post('/question/:questionId/form/:formId', async (request: jwtRequest, reply) => {
    const { questionId, formId } = paramsSchema.parse(request.params)
    
    const question = await prisma.question.findUnique({
      where: {id: questionId}
    })

    const createQuestionData = formatForAdding([question])

    const newQuestion = await prisma.question.create({
      data: {
        ...createQuestionData[0],
        formId
      }
    })

    reply.status(201).send(newQuestion)
  })
}
