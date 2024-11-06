import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { querySchema } from '../utils/querySchema'

export async function responseRoutes(app: FastifyInstance) {
  app.get('/analytics/forms/:formId/total-sessions', async (request) => {
    const { formId } = querySchema.parse(request.params);
  
    const totalSessions = await prisma.session.count({
      where: { formId: Number(formId) },
    });
  
    return { totalSessions };
  });

  app.get('/analytics/forms/:formId/completion-rate', async (request) => {
    const { formId } = querySchema.parse(request.params);
  
    const totalQuestions = await prisma.question.count({
      where: { formId: Number(formId) },
    });
  
    const sessions = await prisma.session.findMany({
      where: { formId: Number(formId) },
      include: {
        responses: true,
      },
    });
  
    const completionRates = sessions.map(session => ({
      sessionId: session.id,
      completionRate: session.responses.length / totalQuestions,
    }));
  
    return { totalQuestions, completionRates };
  });

  // TODO teria que adicionar uma data de inicio e fim pra completion times funcionar
  // app.get('/analytics/forms/:formId/average-completion-time', async (request) => {
  //   const { formId } = querySchema.parse(request.params);
  
  //   const sessions = await prisma.session.findMany({
  //     where: { formId: Number(formId) },
  //     include: { responses: true },
  //   });
  
  //   const completionTimes = sessions.map(session => {
  //     const times = session.responses.map(response => new Date(response.createdAt).getTime());
  //     const startTime = Math.min(...times);
  //     const endTime = Math.max(...times);
  //     return (endTime - startTime) / 1000; // Tempo em segundos
  //   });
  
  //   const averageCompletionTime = completionTimes.reduce((a, b) => a + b, 0) / completionTimes.length;
  
  //   return { averageCompletionTime };
  // });
  
  // app.get('/analytics/forms/:formId/quantitative-answers', async (request) => {
  //   const { formId } = querySchema.parse(request.params);
  
  //   const quantitativeResponses = await prisma.response.groupBy({
  //     by: ['questionId'],
  //     where: {
  //       question: { formId: Number(formId) },
  //       value: { not: null },
  //     },
  //     _avg: { value: true },
  //     _count: { value: true },
  //   });
  
  //   return { quantitativeResponses };
  // });
  
  app.get('/analytics/forms/:formId/multiple-choice-popularity', async (request) => {
    const { formId } = querySchema.parse(request.params);
  
    const optionPopularity = await prisma.option.findMany({
      where: {
        question: { formId: Number(formId) },
      },
      include: {
        responses: true,
      },
    });
  
    const popularity = optionPopularity.map(option => ({
      optionId: option.id,
      text: option.text,
      responseCount: option.responses.length,
    }));
  
    return { popularity };
  });
  
  app.get('/analytics/forms/:formId/responses-by-date', async (request) => {
    const { formId } = querySchema.parse(request.params);
  
    const responsesByDate = await prisma.response.findMany({
      where: { question: { formId: Number(formId) }, },
      orderBy: {
        session: {
          createdAt: 'desc'
        }
      }
    });
  
    return { responsesByDate };
  });

  app.get('/analytics/forms/:formId/incomplete-responses', async (request) => {
    const { formId } = querySchema.parse(request.params);
  
    const totalQuestions = await prisma.question.count({
      where: { formId: Number(formId) },
    });
  
    const incompleteSessions = await prisma.session.findMany({
      where: {
        formId: Number(formId),
      },
      include: {
        responses: true,
      },
    });
  
    const incompleteResponses = incompleteSessions.filter(
      session => session.responses.length < totalQuestions
    );
  
    return { incompleteResponses };
  });
  
  app.get('/analytics/forms/:formId/export', async (request, reply) => {
    const { formId } = querySchema.parse(request.params);
  
    const sessions = await prisma.session.findMany({
      where: { formId: Number(formId) },
      include: {
        responses: true,
      },
    });
  
    reply
      .header('Content-Type', 'application/json')
      .header('Content-Disposition', `attachment; filename="form_${formId}_responses.json"`)
      .send(sessions);
  });
  
}
