import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
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
      completionRate: questions > 0 
        ? (averageResponsesPerSession / questions) * 100 
        : 0
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
        responses: {
          include: {
            option: true
          }
        }
      },
      orderBy: {
        index: 'asc'
      }
    })

    const questionsResults = await Promise.all(
      questions.map(async (question) => {
        // Se a questão tem opções (múltipla escolha)
        if (question.options.length > 0) {
          // Agrupa respostas por opção
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

        // Se tiver value, tenta converter para número e criar dados do gráfico
        const hasNumericValues = question.responses.every(
          response => response.value !== null && !isNaN(Number(response.value))
        )

        if (hasNumericValues) {
          const numericResponses = question.responses
            .map(r => r.value)
            .filter((value): value is number => value !== null)

          const average = numericResponses.reduce((a, b) => a + b, 0) / numericResponses.length
          const min = Math.min(...numericResponses)
          const max = Math.max(...numericResponses)

          // Agrupa valores em intervalos para o gráfico
          const intervals = 10
          const range = max - min
          const intervalSize = range / intervals

          const distribution: Record<string, number> = {}
          numericResponses.forEach(value => {
            const intervalIndex = Math.floor((value - min) / intervalSize)
            const intervalStart = min + (intervalIndex * intervalSize)
            const intervalEnd = intervalStart + intervalSize
            const label = `${intervalStart.toFixed(1)} - ${intervalEnd.toFixed(1)}`
            distribution[label] = (distribution[label] || 0) + 1
          })

          const chartData = Object.entries(distribution).map(([label, count]) => ({
            label,
            value: count,
            percentage: (count / numericResponses.length) * 100
          }))

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
            chartData
          }
        }

        // Para respostas textuais
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
