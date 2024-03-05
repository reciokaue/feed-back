import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { statusMessage } from '../utils/statusMessage'
import { jwtUser } from '../types/jwtUser'

export async function questionRoutes(app: FastifyInstance) {
  app.addHook('onRequest', async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(statusMessage.notVerified)
    }
  })

  app.post('/form/:formId/question', async (request) => {
    const user = request.user as jwtUser
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
    console.log(request.body)
    const questions = bodySchema.parse(request.body)
    console.log(questions)

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
            isDefault: false,
            type,
            text,
            topic,
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
  app.get('/question/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(request.params)

    const question = await prisma.question.findUniqueOrThrow({
      where: { id },
    })

    return question
  })
  app.post('/question', async (request) => {
    const bodySchema = z.object({
      text: z.string(),
      formId: z.string().uuid(),
      questionType: z.string(),
      topic: z.string(),
      responses: z.array(
        z.object({
          text: z.string(),
          value: z.number().nonnegative().lte(10),
        }),
      ),
    })
    const { text, formId, questionType, responses, topic } = bodySchema.parse(
      request.body,
    )
    console.log(responses)

    const question = await prisma.question.create({
      data: {
        text,
        formId,
        type: questionType,
        isDefault: false,
        topic,
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
