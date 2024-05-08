import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { jwtRequest, verifyJwt } from '../middlewares/JWTAuth'
import { paginationSchema } from '../utils/schemas/pagination'

const paramsSchema = z.object({
  id: z.string().uuid().optional(),
  formId: z.string().uuid().optional(),
})

export async function questionRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/question/:id', async (request, reply) => {
    const { id } = paramsSchema.parse(request.params)
    const question = await prisma.question.findUnique({
      where: { id },
      include: {
        options: true,
        topics: true,
      },
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
      include: {
        topics: true,
        options: true,
      },
    })
    if (!questions) return reply.status(404).send({ message: 'Form not found' })

    return questions
  })
  app.get('/questions', async (request, reply) => {
    const { query, page, pageSize } = paginationSchema.parse(request.query)

    const questions = await prisma.question.findMany({
      where: {
        isPublic: true,
        OR: [
          { text: { contains: query } },
          { options: { some: { text: { contains: query } } } },
        ],
      },
      take: pageSize,
      skip: pageSize * page,
      include: {
        topics: true,
        options: true,
      },
    })
    if (!questions) return reply.status(404).send({ message: 'Form not found' })

    return questions
  })
  app.post('/form/:formId/question', async (request: jwtRequest) => {
    const paramsSchema = z.object({
      formId: z.string().uuid(),
    })
    const bodySchema = z.array(
      z.object({
        text: z.string(),
        type: z.string(),
        topic: z.string(),
        options: z.array(
          z.object({
            text: z.string(),
            value: z.number().nonnegative().lte(10),
          }),
        ),
      }),
    )

    const { formId } = paramsSchema.parse(request.params)
    const questions = bodySchema.parse(request.body)

    const createdQuestions = await Promise.all(
      questions.map(async (question) => {
        const { type, text, topic } = question
        const optionsData = question.options.map((response) => ({
          text: response.text,
          value: response.value,
        }))

        const newQuestion = await prisma.question.create({
          data: {
            formId,
            isPublic: false,
            type,
            text,
            // topic,
            options: {
              create: optionsData,
            },
          },
        })

        return newQuestion
      }),
    )

    return createdQuestions
  })
  app.post('/question', async (request) => {
    const bodySchema = z.object({
      text: z.string(),
      formId: z.string().uuid(),
      questionType: z.string(),
      topics: z.array(z.string()),
      responses: z.array(
        z.object({
          text: z.string(),
          value: z.number().nonnegative().lte(10),
        }),
      ),
    })
    const { text, formId, questionType, responses, topics } = bodySchema.parse(
      request.body,
    )
    console.log(responses)

    const question = await prisma.question.create({
      data: {
        text,
        formId,
        type: questionType,
        isPublic: false,
        topics,
        options: {
          create: responses.map((response) => {
            return {
              text: response.text,
              value: response.value, // Assuming response has text and value properties
            }
          }),
        },
      },
      include: {
        options: true,
      },
    })

    return question
  })
  app.put('/question/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const bodySchema = z.object({
      text: z.string(),
      formId: z.string().uuid(),
      questionType: z.string(),
    })

    const { text, formId, questionType } = bodySchema.parse(request.body)
    const { id } = paramsSchema.parse(request.params)

    let question = await prisma.question.findUniqueOrThrow({
      where: {
        id,
      },
    })

    question = await prisma.question.update({
      where: {
        id,
      },
      data: {
        text,
        formId,
        type: questionType,
      },
    })

    return question
  })
  app.delete('/question/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(request.params)

    const question = await prisma.question.findUniqueOrThrow({
      where: {
        id,
      },
    })

    await prisma.question.delete({
      where: { id },
    })

    return question
  })
}
