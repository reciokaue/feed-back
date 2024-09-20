import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { jwtRequest, verifyJwt } from '../middlewares/JWTAuth'
import { paginationSchema } from '../utils/schemas/pagination'
<<<<<<< HEAD
import { questionSchemaCreate } from '../utils/schemas/question'
import { questionSelect } from '../utils/selects/question'
import { insertQuestionSQLite } from '../utils/insertQuestionSQLite'
=======
import {
  questionSchema,
  questionSchemaCreate,
  questionSchemaUpdate,
} from '../utils/schemas/question'
import { questionSelect } from '../utils/selects/question'
import { getOptionsPutStatus } from '../utils/getOptiosPutStatus'
>>>>>>> 83b5007 (coomit)

const paramsSchema = z.object({
  id: z.coerce.number().int().positive().optional(),
  formId: z.coerce.number().int().positive().optional(),
})

export async function questionRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/question/:id', async (request, reply) => {
    const { id } = paramsSchema.parse(request.params)
    const question = await prisma.question.findUnique({
      where: { id },
      select: questionSelect,
    })
    if (!question)
      return reply.status(404).send({ message: 'Question not found' })

    return question
  })
  app.get('/questions/form/:formId', async (request, reply) => {
    const { formId } = paramsSchema.parse(request.params)
    const { query } = paginationSchema.parse(request.query)

    const questions = await prisma.question.findMany({
      where: {
        formId,
        OR: [
          { text: { contains: query } },
          { options: { some: { text: { contains: query } } } },
        ],
      },
      select: questionSelect,
    })
    if (!questions)
      return reply.status(404).send({ message: 'Formulário não encontrado' })

    return questions
  })
  // public questions
  app.get('/questions', async (request, reply) => {
    const { query, page, pageSize } = paginationSchema.parse(request.query)

    const questions = await prisma.question.findMany({
      where: {
        OR: [
          { text: { contains: query } },
          { options: { some: { text: { contains: query } } } },
        ],
        form: {
          isPublic: true,
        },
      },
      take: pageSize,
      skip: pageSize * page,
      select: { ...questionSelect, formId: true },
    })
    if (!questions)
      return reply.status(404).send({ message: 'Formulário não encontrado' })

    return questions
  })
  app.post('/question', async (request: jwtRequest, reply) => {
    try {
<<<<<<< HEAD
      const question = questionSchemaCreate.parse(request.body)
=======
      const question = questionSchema.parse(request.body)
>>>>>>> 83b5007 (coomit)

      if (question?.formId) {
        const formExists = await prisma.form.findUnique({
          where: { id: question.formId },
        })

        if (!formExists)
          return reply
            .status(404)
            .send({ message: 'Este formulário não existe' })

        if (formExists.userId !== request.user?.sub)
          return reply
            .status(400)
            .send({ message: 'Este não é seu formulário' })
      }

<<<<<<< HEAD
      const dbType = process.env.DATABASE_TYPE || 'mysql'
      let newQuestion

      if (dbType === 'sqlite') {
        newQuestion = await insertQuestionSQLite(question)
      } else {
        newQuestion = await prisma.question.create({
          data: question as any,
        })
      }
=======
      const newQuestion = await prisma.question.create({
        data: question as any,
      })
>>>>>>> 83b5007 (coomit)

      reply.status(201).send(newQuestion)
    } catch (err) {
      console.log(err)
      reply.status(400).send({ message: 'Erro inesperado', error: err })
    }
  })
  app.put('/question/:id', async (request, reply) => {
    try {
      const question = questionSchemaUpdate.parse(request.body)
      const { id } = paramsSchema.parse(request.params)

      const oldQuestion = await prisma.question.findUnique({
        where: { id },
        select: questionSelect,
      })

      if (!oldQuestion || !question)
        return reply.status(404).send({ message: 'Question not found' })

      if (oldQuestion.formId !== question.formId)
        return reply.status(400).send({ message: 'This is not your question' })

      const newQuestionData = {
        ...question,
        ...(question.options && {
          options: getOptionsPutStatus(
            oldQuestion?.options as any,
            question?.options as any,
          ),
        }),
      }

      const newQuestion = await prisma.question.update({
        where: { id },
        data: newQuestionData as any,
        select: questionSelect,
      })

      return reply.status(200).send({ newQuestion })
    } catch (e) {
      return reply.status(500).send({ error: e })
    }
  })
  app.put('/question/form/:formId', async (request: jwtRequest, reply) => {
    try {
      const { formId } = paramsSchema.parse(request.params)
      const questions = z.array(questionSchemaUpdate).parse(request.body)

      const form = await prisma.form.findUnique({
        where: { id: formId },
        select: { userId: true, questions: { select: { options: true } } },
      })

      if (!form || questions === undefined)
        return reply.status(404).send({ message: 'Formulário não encontrado' })
      if (form?.userId !== request?.user?.sub)
        return reply
          .status(400)
          .send({ message: 'Este não é o seu formulário' })

      const questionsToUpdate = questions?.map((question, index) => ({
        ...question,
        options: getOptionsPutStatus(
          form.questions[index].options,
          question?.options as any,
        ),
      }))

      const updatePromises = questionsToUpdate.map((question) =>
        prisma.question.update({
          where: { id: question.id },
          data: question as any,
        }),
      )

      await prisma.$transaction(updatePromises)

      return reply.status(200).send({
        message: 'Questões atualizadas com sucesso',
      })
    } catch (err) {
      console.log(err)
      return reply.status(400).send({ message: 'Erro inesperado', error: err })
    }
  })
  app.delete('/question/:id', async (request, reply) => {
    const { id } = paramsSchema.parse(request.params)

    const question = await prisma.question.findUnique({
      where: { id },
    })
    if (!question)
      return reply.status(404).send({ message: 'Question not found' })

    await prisma.question.delete({
      where: { id },
    })

    return question
  })
}
