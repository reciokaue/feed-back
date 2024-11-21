import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { querySchema } from '../utils/querySchema'

export async function analyticsRoutes(app: FastifyInstance) {
  app.get('/analytics/forms/:formId/summary', async (request) => {
    const { formId } = querySchema.parse(request.params)
    
    const [totalSessions, totalResponses, questions] = await Promise.all([
      prisma.session.count({ where: { formId } }),
      prisma.response.count({ 
        where: { question: { formId } }
      }),
      prisma.question.count({ where: { formId } })
    ])

    const averageResponsesPerSession = totalSessions > 0 
      ? totalResponses / totalSessions 
      : 0

    return {
      totalSessions,
      totalResponses,
      totalQuestions: questions,
      averageResponsesPerSession,
      completionRate: (questions > 0 
        ? (averageResponsesPerSession / questions) * 100 
        : 0) + '%'
    }
  })
  app.get('/analytics/forms/:formId/questions-results', async (request) => {
    const { formId } = querySchema.parse(request.params)
    
    // Busca todas as questões do formulário com seus tipos e opções
    const questions = await prisma.question.findMany({
      where: { formId },
      include: {
        questionType: true,
        options: {
          orderBy: {
            index: 'asc'
          }
        },
      },
      orderBy: {
        index: 'asc'
      }
    })

    const questionsResults = await Promise.all(
      questions.map(async (question) => {
        // Se a questão tem opções
        if (["list", "options",].includes(question?.questionType?.name || '')) {
          const optionCounts = await prisma.response.groupBy({
            by: ['optionId'],
            where: {
              questionId: question.id,
              optionId: {
                not: null
              }
            },
            _count: true
          })

          const totalResponses = optionCounts.reduce((sum, count) => sum + count._count, 0)

          // Formata dados para gráfico
          const chartData = question.options.map(option => {
            const count = optionCounts.find(c => c.optionId === option.id)?._count ?? 0
            return {
              label: option.text,
              value: count,
              percentage: totalResponses > 0 ? (count / totalResponses) * 100 : 0
            }
          })

          return {
            id: question.id,
            text: question.text,
            type: question.questionType?.name,
            index: question.index,
            required: question.required,
            isMultipleChoice: true,
            totalResponses,
            chartData
          }
        }
        
        // Para questões de texto ou outros tipos sem opções
        if(["text", "phone", "email", "time", "date", "longText"].includes(question?.questionType?.name || '')) {
          const uniqueResponses = await prisma.response.groupBy({
            by: ['text'],
            where: {
              questionId: question.id,
              text: {
                not: null
              }
            },
            _count: true
          })
          return {
            id: question.id,
            text: question.text,
            type: question.questionType?.name,
            index: question.index,
            required: question.required,
            isMultipleChoice: false,
            hasNumericValues: false,
            totalResponses: uniqueResponses.length,
            responses: uniqueResponses.map(response => ({
              text: response.text,
              count: response._count
            }))
          }
        }

        // Para questões que retornam um value
        if(["starRating", "slider",].includes(question?.questionType?.name || '')){
          const responses = await prisma.response.findMany({
            where: {
              session:{ formId },
              questionId: question.id,
              value: {not: null}
            }
          })
          const numericResponses = responses.map(r => r.value)
            .filter((value): value is number => value !== null);
        
          const average = numericResponses.reduce((a, b) => a + b, 0) / numericResponses.length;
          const min = Math.min(...numericResponses);
          const max = Math.max(...numericResponses);
        
          // Agrupa valores por frequência
          const frequencyMap: Record<number, number> = {};
          numericResponses.forEach(value => {
            frequencyMap[value] = (frequencyMap[value] || 0) + 1;
          });
        
          // Transforma os dados de frequência em um formato para gráfico
          const chartData = Object.entries(frequencyMap).map(([value, count]) => ({
            label: value,
            value: count 
          }));
        
          return {
            id: question.id,
            text: question.text,
            type: question.questionType?.name,
            index: question.index,
            required: question.required,
            isMultipleChoice: false,
            hasNumericValues: true,
            totalResponses: numericResponses.length,
            statistics: {
              average,
              min,
              max,
              median: numericResponses.sort()[Math.floor(numericResponses.length / 2)]
            },
            chartData,
          };
        }
      })
    )

    return {
      formId,
      totalQuestions: questions.length,
      questions: questionsResults
    }
  })
  app.get('/analytics/forms/:formId/total-sessions', async (request) => {
    const { formId } = querySchema.parse(request.params);
  
    const totalSessions = await prisma.session.count({
      where: { formId: Number(formId) },
    });
  
    return { totalSessions };
  });

  app.get('/analytics/forms/:formId/quantitative-answers', async (request) => {
    const { formId } = querySchema.parse(request.params);
  
    const quantitativeResponses = await prisma.response.groupBy({
      by: ['questionId'],
      where: {  
        question: { formId: Number(formId) },
        value: { not: null },
      },
      _avg: { value: true },
      _count: { value: true },
    });
  
    return { quantitativeResponses };
  });
  
  app.get('/analytics/question/:questionId/multiple-choice-popularity', async (request) => {
    const { questionId } = querySchema.parse(request.params);
  
    const optionPopularity = await prisma.option.findMany({
      where: {
        question: { id: questionId },
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
  
  app.get('/analytics/forms/:formId/completion-rate', async (request) => {
    const { formId } = querySchema.parse(request.params);
  
    const totalResponses = await prisma.response.count({
      where: {
        question: {
          formId: formId
        }
      },
    })
    const totalSessions = await prisma.session.count({
      where: { formId },
    })
    const totalQuestions = await prisma.question.count({
      where: {formId}
    }) 

    const completionRate = Math.round(((totalResponses/totalSessions)/totalQuestions)*100)

    return { completionRate };
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
