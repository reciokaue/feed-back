import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { jwtRequest, verifyJwt } from '../middlewares/JWTAuth'

import { formatForAdding } from '../utils/getArrayChanges'
import { questionResponsesSelect, questionSelect } from '../../prisma/models/Question'
import { querySchema } from '../utils/querySchema'

const paramsSchema = z.object({
  questionId: z.coerce.number().int().positive().optional(),
  formId: z.coerce.number().int().positive().optional(),
  toFormId: z.coerce.number().int().positive().optional(),
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
  app.get('/questions', async (request, reply) => {
    const { query, page, pageSize, categoryId } = querySchema.parse(request.query)

    const questions = await prisma.question.findMany({
      where: {
        form: {
          isPublic: true,
          ...(categoryId && { categoryId: categoryId }),
        },
        ...(query && {
          text: { contains: query, mode: 'insensitive' },
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
      where: { id: questionId }
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
  app.post('/questions/from/:formId/to/:toFormId', async (request: jwtRequest, reply) => {
      const { formId, toFormId } = paramsSchema.parse(request.params)

      if (!formId || !toFormId)
        return reply.status(404).send({ message: 'Formulário modelo não encontrado' })

      const questions = await prisma.question.findMany({
        where: { formId: formId },
        select: questionSelect
      })

      await prisma.form?.update({
        where: { id: toFormId },
        data: { questions: formatForAdding(questions) },
      })

      reply.status(200).send({ message: 'Questões copiadas com sucesso!' })
  })
}
