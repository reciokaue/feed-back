import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function questionRoutes(app: FastifyInstance) {
  app.get('/form/question/:formId', async (request) => {
    const paramsSchema = z.object({
      formId: z.string().uuid(),
    })
    const { formId } = paramsSchema.parse(request.params)

    const question = await prisma.question.findMany({
      orderBy: {
        id: 'asc',
      },
      where: {
        formId,
      },
    })

    return question
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
        IsCustom: true,
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
