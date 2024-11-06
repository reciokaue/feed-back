import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { querySchema } from '../utils/querySchema'
import { MultipleResponsesSchema, ResponseSchema } from '../../prisma/models/Response'
import { formatForAdding } from '../utils/getArrayChanges'

const paramsSchema = z.object({
  questionId: z.coerce.number().int().positive().optional(),
  responseId: z.coerce.number().int().positive().optional(),
  sessionId: z.coerce.number().int().positive().optional(),
  formId: z.coerce.number().int().positive().optional(),
})

export async function responseRoutes(app: FastifyInstance) {
  app.get('/responses/question/:questionId', async (request) => {
    const { page, pageSize, query } = querySchema.parse(request.query)
    const { questionId } = paramsSchema.parse(request.params)

    const responses = await prisma.response.findMany({
      where: {
        questionId,
        ...(query && { value: { contains: query } }),
      },
      take: pageSize,
      skip: pageSize * page,
    })

    return responses
  })
  app.get('/responses/session/:sessionId', async (request) => {
    const { page, pageSize, query } = querySchema.parse(request.query)
    const { sessionId } = paramsSchema.parse(request.params)

    const responses = await prisma.response.findMany({
      where: {
        sessionId,
        ...(query && { value: { contains: query } }),
      },
      take: pageSize,
      skip: pageSize * page,
    })

    return responses
  })
  app.get('/responses/form/:formId', async (request) => {
    const { formId } = paramsSchema.parse(request.params);
  
    const sessions = await prisma.session.findMany({
      where: { formId },
      include: {
        responses: true,
      },
    });
  
    // Análise estatística dos dados
    // const stats = {
    //   totalSessions: sessions.length,
    //   averageRating: 0,
    //   satisfactionDistribution: {},
    //   responseCounts: {},
    //   popularOptions: {},
    // };
  
    // let ratingSum = 0;
    // let ratingCount = 0;
    // const satisfactionResponses = [];
    // const optionCounts = {};
  
    // sessions.forEach((session) => {
    //   session.responses.forEach((response) => {
    //     const { questionId, value, optionId } = response;
  
    //     // Exemplo: média de respostas numéricas para uma questão específica (e.g., questionId: 38)
    //     if (questionId === 38 && !isNaN(Number(value))) {
    //       ratingSum += Number(value);
    //       ratingCount++;
    //     }
  
    //     // Exemplo: distribuição de respostas de satisfação (questionId: 37)
    //     if (questionId === 37) {
    //       satisfactionResponses.push(value);
    //       stats.satisfactionDistribution[value] = 
    //         (stats.satisfactionDistribution[value] || 0) + 1;
    //     }
  
    //     // Exemplo: contagem de opções selecionadas (e.g., questionId: 36)
    //     if (questionId === 36 && optionId) {
    //       optionCounts[optionId] = (optionCounts[optionId] || 0) + 1;
    //     }
  
    //     // Contagem de respostas por questionId
    //     stats.responseCounts[questionId] = 
    //       (stats.responseCounts[questionId] || 0) + 1;
    //   });
    // });
  
    // // Cálculo da média de avaliação para questionId 38
    // if (ratingCount > 0) {
    //   stats.averageRating = ratingSum / ratingCount;
    // }
  
    // Opções populares para questionId 36
    // stats.popularOptions = Object.entries(optionCounts)
    //   .sort((a, b) => b[1] - a[1])
    //   .reduce((acc, [optionId, count]) => {
    //     acc[optionId] = count;
    //     return acc;
    //   }, {});
  
    return {
      sessions,
      // stats,
    };
  });
  app.post('/responses/form/:formId', async (request, reply) => {
    const responses = MultipleResponsesSchema.parse(request.body)
    const { formId } = querySchema.parse(request.params)

    console.log({
      formId: formId,
      responses: JSON.stringify(formatForAdding(responses))
    })
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
    const { responseId } = paramsSchema.parse(request.params)

    await prisma.response.delete({
      where: { id: responseId },
    })
  })
  app.delete('/session/:sessionId', async (request) => {
    const { sessionId } = paramsSchema.parse(request.params)

    await prisma.session.delete({
      where: { id: sessionId },
    })
  })

  app.get('/sessions/:formId', async (request) => {
    const { page, pageSize, query } = querySchema.parse(request.query)
    const { formId } = paramsSchema.parse(request.params)

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
}
