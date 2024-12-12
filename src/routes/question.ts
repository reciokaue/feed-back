import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { jwtRequest, verifyJwt } from '../middlewares/JWTAuth'

import { formatForAdding, getArrayChanges } from '../utils/getArrayChanges'
import { questionResponsesSelect, QuestionSchema, questionSelect } from '../../prisma/models/Question'
import { querySchema } from '../utils/querySchema'

export async function questionRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/question/:questionId', async (request, reply) => {
    const { questionId } = querySchema.parse(request.params)
    const question = await prisma.question.findUnique({
      where: { id: questionId },
      select: questionResponsesSelect,
    })
    if (!question)
      return reply.status(404).send({ message: 'Question not found' })

    return question
  })
  app.get('/questions', async (request, reply) => {
    const { query, page, pageSize, categoryId, questionTypeId  } = querySchema.parse(request.query)

    const filters: any = {
      form: {
        isPublic: true,
        ...(categoryId && { OR: [
          {categoryId: categoryId},
          {category: {
            parentId: categoryId
          }}
        ] }),
      },
      ...(query && {
        OR: [
         { text: { contains: query, mode: 'insensitive' }},
         { options: { some: {text: { contains: query, mode: 'insensitive' }}}}
        ]
      }),
      ...(questionTypeId && {
        typeId: questionTypeId
      })
    }

    const totalCount = await prisma.question.count({
      where: filters,
    })

    const questions = await prisma.question.findMany({
      where: filters,
      take: pageSize,
      skip: pageSize * page,
      select: { ...questionSelect, formId: true },
    })

    return reply.send({ meta: { page, pageSize, totalCount }, questions })
  })
  app.post('/question/:questionId/form/:formId', async (request: jwtRequest, reply) => {
    const { questionId, formId } = querySchema.parse(request.params)

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
      const { formId, toFormId } = querySchema.parse(request.params)

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
  app.put('/questions/form/:formId', async (request: jwtRequest, reply) => {
    const { formId } = querySchema.parse(request.params)
    const questions = z.array(QuestionSchema).parse(request.body)

    const formQuestions = await prisma.question.findMany({
      where: { formId },
      select: questionSelect,
      orderBy: {
        index: 'asc',
      },
    })

    if (!formQuestions)
      return reply.status(404).send({ message: 'Formulário não encontrado' })

    const formQuestionsToUpdate =
      (formQuestions !== null || formQuestions !== undefined) &&
      getArrayChanges(questions || [], formQuestions || [])

    const data = {
      ...{ questions: formQuestionsToUpdate },
    }

    await prisma.form.update({
      where: { id: formId },
      data: data as any,
    })
  })

  app.delete('/question/:questionId', async (request: jwtRequest, reply) => {
    const { questionId } = querySchema.parse(request.params)

    const questionExists = await prisma.question.findUnique({
      where: { id: questionId },
    })
    if(!questionExists)
      return reply.status(404).send({message: 'Questão não encontrada'})

    await prisma.question.delete({
      where: { id: questionId },
    })

    reply.status(200).send({ message: 'Questão deletada com sucesso!' })
  })
}
