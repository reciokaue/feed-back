import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { querySchema } from '../utils/querySchema'
import { MultipleResponsesSchema } from '../../prisma/models/Response'
import { formatForAdding } from '../utils/getArrayChanges'
import { faker } from '@faker-js/faker';

export async function responseRoutes(app: FastifyInstance) {
  app.get('/responses/question/:questionId', async (request) => {
    const { page, pageSize, query } = querySchema.parse(request.query)
    const { questionId } = querySchema.parse(request.params)

    const responses = await prisma.response.findMany({
      where: {
        questionId,
        ...(query && { text: { contains: query } }),
      },
      take: pageSize,
      skip: pageSize * page,
    })

    return {responses}
  })
  app.get('/responses/session/:sessionId', async (request) => {
    const { page, pageSize, query } = querySchema.parse(request.query)
    const { sessionId } = querySchema.parse(request.params)

    const responses = await prisma.response.findMany({
      where: {
        sessionId,
        ...(query && { text: { contains: query } }),
      },
      take: pageSize,
      skip: pageSize * page,
    })

    return {responses}
  })
  app.get('/responses/form/:formId', async (request, reply) => {
    const { page, pageSize, query, from, to } = querySchema.parse(request.query)
    const { formId } = querySchema.parse(request.params);
    
    const questions = await prisma.question.findMany({
      where: { formId },
      select: { id: true, index: true},
      orderBy: { index: 'asc' }
    })
    const order = new Map();
    questions.forEach((question) => {
      order.set(question.id, null);
    });

    const filters = {
      formId,
      ...(query && {responses: { some: { text: {contains: query, mode: 'insensitive'} } }}),
      ...(from  && to && {createdAt: { gte: from, lte: to }}),
    } as any

    console.log(request.params)

    const sessions = await prisma.session.findMany({
      where: filters,
      select: { 
        id: true,
        createdAt: true,
        responses: true,
      },
      take: pageSize,
      skip: pageSize * page,
    });
    const totalCount = await prisma.session.count({
      where: filters
    })

    const formatedSessions = sessions.map(session => {
      const groupedResponses = new Map(order)

      session.responses.forEach((response) => {
        const text = groupedResponses.get(response.questionId )?.text || ''
        if(response?.value)
          return groupedResponses.set(response.questionId, response)

        groupedResponses.set(response.questionId, {
          ...response,
          text: text? text + ', ' + response.text: response?.text
        })
      })
      return {
        ...session,
        responses: Array.from(groupedResponses.values())
      }
    })
  
    reply.send({ meta: { page, pageSize, totalCount }, sessions: formatedSessions, })
  });
  app.post('/responses/form/:formId', async (request, reply) => {
    const responses = MultipleResponsesSchema.parse(request.body)
    const { formId } = querySchema.parse(request.params)

    if(!formId)
      return reply.status(404).send({message: 'ID do formulário não informado'})

    await prisma.session.create({
      data: {
        formId: formId,
        responses: formatForAdding(responses)
      }
    })

    return reply.send()
  })
  app.delete('/response/:responseId', async (request) => {
    const { responseId } = querySchema.parse(request.params)

    await prisma.response.delete({
      where: { id: responseId },
    })
  })
  app.delete('/session/:sessionId', async (request) => {
    const { sessionId } = querySchema.parse(request.params)

    await prisma.session.delete({
      where: { id: sessionId },
    })
  })
  app.get('/sessions/:formId', async (request) => {
    const { page, pageSize, query } = querySchema.parse(request.query)
    const { formId } = querySchema.parse(request.params)

    const sessions = await prisma.session.findMany({
      where: {
        formId,
        ...(query && { createdAt: query }),
      },
      take: pageSize,
      skip: pageSize * page,
      include: {
        responses: {
          select: {
            id: true,
            optionId: true,
            value: true,
          },
        },
      },
    })

    return sessions
  })
  app.get('/responses/questions/:formId', async (request) => {
    const { formId } = querySchema.parse(request.params)

    const questions = await prisma.question.findMany({
      where: {
        formId: formId,
      },
      include: {
        responses: true,
        options: true,
        questionType: true,
      }
    })

    return questions
  })
}
