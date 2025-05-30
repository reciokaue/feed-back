import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { querySchema } from '../utils/querySchema'

export async function analyticsRoutes(app: FastifyInstance) {
  app.get('/analytics/forms/:formId/summary', async (request) => {
    const { formId, query, from, to } = querySchema.parse(request.params)

    const [totalSessions, totalResponses, questions] = await Promise.all([
      prisma.session.count({ where: {
        formId,
        ...(query && {responses: { some: { text: {contains: query, mode: 'insensitive'} } }}),
        ...(from  && to && {createdAt: { gte: from, lte: to }})
      } }),
      prisma.response.count({ where: {
        session: { formId },
        ...(query && { some: { text: {contains: query, mode: 'insensitive'} } }),
        ...(from && to && {session: { createdAt: { gte: from, lte: to } }})
      } }),
      prisma.question.count({ where: { formId } })
    ])

    const averageResponsesPerSession = totalSessions > 0 
      ? totalResponses / totalSessions 
      : 0
    const completionRate = (questions > 0 
      ? (averageResponsesPerSession / questions) * 100 
      : 0)

    return {
      totalSessions,
      totalResponses,
      totalQuestions: questions,
      averageResponsesPerSession: averageResponsesPerSession.toFixed(1),
      completionRate: (completionRate > 100? 100: completionRate.toFixed(1)) + '%'
    }
  })
  app.get('/analytics/forms/:formId/questions-results', async (request, reply) => {
    const { formId, query, from, to } = querySchema.parse(request.params)
    
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
        const questionType = question?.questionType?.name || ''

        // Se a questão tem opções
        if (["list", "options",].includes(questionType)) {
          const optionCounts = await prisma.response.groupBy({
            by: ['optionId'],
            where: {
              questionId: question.id,
              optionId: { not: null },
              ...(query && { some: { text: {contains: query, mode: 'insensitive'} } }),
              ...(from && to && {session: { createdAt: { gte: from, lte: to } }})
            },
            _count: true,
          });
          
          const totalResponses = optionCounts.reduce((sum, item) => sum + item._count, 0);
          
          const chartData = question.options.map((option) => {
            const count = optionCounts.find((c) => c.optionId === option.id)?._count ?? 0;
            const percentage = totalResponses > 0 ? (count / totalResponses) * 100 : 0;
            return {
              label: option.text,
              value: count,
              percentage: parseFloat(percentage.toFixed(1))
            };
          });

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
        if(["text", "phone", "email", "time", "date", "longText"].includes(questionType)) {
          const uniqueResponses = await prisma.response.groupBy({
            by: ['text'],
            where: {
              questionId: question.id,
              text: { not: null},
              ...(query && { some: { text: {contains: query, mode: 'insensitive'} } }),
              ...(from && to && {session: { createdAt: { gte: from, lte: to } }})
            },
            _count: true
          })
          const countDates = () => {
            const map = new Map()
            uniqueResponses.forEach((response) => {
              const count = map.get(response.text?.substring(0, 10))?.count || 0
              map.set(response.text?.substring(0, 10), {
                text: response.text,
                count: count + 1
              })
            })
            return Array.from(map.values())
          }

          return {
            id: question.id,
            text: question.text,
            type: question.questionType?.name,
            index: question.index,
            required: question.required,
            isMultipleChoice: false,
            hasNumericValues: false,
            totalResponses: uniqueResponses.length,
            responses: 
              questionType === 'date'? countDates():
              uniqueResponses.map(response => ({
                text: response.text,
                count: response._count
              }))
          }
        }

        // Para questões que retornam um value
        if(["starRating", "slider",].includes(questionType)){
          const responses = await prisma.response.findMany({
            where: {
              session:{ formId },
              questionId: question.id,
              value: {not: null},
              ...(from && to && {session: { createdAt: { gte: from, lte: to } }})
            },
            select: {
              value: true
            }
          }) as {value: number}[]

          const map: Record<number, number> = {};
          const numericResponses = responses.map(r => r.value)
          numericResponses.concat((questionType === 'slider'? [0,1,2,3,4,5,6,7,8,9,10]: [1,2,3,4,5])).forEach(value => {map[value] = (map[value] + 1) || 0});
          
          const entries = Object.entries(map); 
          const minEntry = entries.reduce((min, curr) => (curr[1] < min[1] ? curr : min), entries[0]);
          const maxEntry = entries.reduce((max, curr) => (curr[1] > max[1] ? curr : max), entries[0]);

          const min = `${minEntry[0]}: ${minEntry[1]}`;
          const max = `${maxEntry[0]}: ${maxEntry[1]}`;

          const sortedEntries = entries.sort((a, b) => a[1] - b[1]);
          const medianIndex = Math.floor(sortedEntries.length / 2);
          const medianEntry = sortedEntries[medianIndex];

          const median = `${medianEntry[0]}: ${medianEntry[1]}`;
          const average = (numericResponses.reduce((acc, val) => acc + val, 0) / numericResponses.length)?.toFixed(2);

          const chartData = Object.entries(map).map(([value, count]) => ({
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
              median
            },
            chartData,
          };
        }
      })
    )

    return reply.send({
        formId,
        totalQuestions: questions.length,
        questions: questionsResults
    }) 
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
