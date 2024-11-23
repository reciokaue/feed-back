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
  app.get('/responses/form/:formId', async (request) => {
    const { page, pageSize, query } = querySchema.parse(request.query)
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

    const sessions = await prisma.session.findMany({
      where: { formId },
      select: {
        id: true,
        createdAt: true,
        responses: true,
      },
      take: pageSize,
      skip: pageSize * page,
    });

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
  
    return {
      sessions: formatedSessions,
    };
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

  app.post('/responses/fake/form/:formId', async (request, reply) => {
    const { formId } = querySchema.parse(request.params)
    const { sessionId: sessionsCount } = querySchema.parse(request.query)
  
    const questions = await prisma.question.findMany({
      where: {
        formId: formId,
      },
      include: {
        options: true,
        questionType: true,
      },
    });
  
    // Gera respostas fake para cada sessão
    const sessions: any[] = [];
    for (let i = 0; i < (sessionsCount || 0); i++) {
      const responses = questions.map((question) => {
        const questionType = question?.questionType?.name || ''; 
        const questionId = question.id;
  
        if (["list", "options"].includes(questionType)) {
          const optionIds = question.options.map((option) => option.id);
          const selectedOptions = faker.helpers.arrayElements(optionIds, {
            min: 1,
            max: question.options.length, // Máximo de 2 opções por resposta
          });
          return selectedOptions.map((optionId) => ({
            questionId,
            optionId,
            text: question.options.find((o) => o.id === optionId)?.text,
          }));
        }
  
        if (["text", "phone", "email", "time", "date", "longText"].includes(questionType)) {
          let text;
          switch (questionType) {
            case "text":
              text = faker.lorem.sentence();
              break;
            case "phone":
              text = faker.phone.number();
              break;
            case "email":
              text = faker.internet.email();
              break;
            case "time":
              text = faker.date.soon({days: 1}).toISOString();
              break;
            case "date":
              text = faker.date.soon({days: 20}).toISOString();
              break;
            case "longText":
              text = faker.lorem.paragraph();
              break;
          }
  
          return {
            questionId,
            text,
          };
        }
        if(questionType === 'starRating')
          return ({
            questionId,
            value: faker.number.int({min: 1, max: 5}),
          });
        if(questionType === 'slider')
          return ({
            questionId,
            value: faker.number.int({min: 0, max: 10}),
          });
        return null;
      });
  
      // Filtra respostas válidas e cria uma sessão
      const sessionResponses = responses.flat().filter(Boolean);
      const session = {
        createdAt: faker.date.recent(),
        formId: formId,
        responses: sessionResponses,
      };
  
      sessions.push(session);
    }
    Promise.all(
      sessions.map((session: any) =>
        prisma.session.create({
          data: {
            createdAt: session.createdAt,
            formId: session.formId,
            responses: {
              create: session.responses,
            },
          },
        })
      )
    );
  
    reply.send();
  });
}
