import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { querySchema } from '../utils/querySchema'
import { MultipleResponsesSchema } from '../../prisma/models/Response'
import { formatForAdding } from '../utils/getArrayChanges'

import { parse } from 'json2csv'; 
import ExcelJS from 'exceljs';

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
  app.get('/responses/form/:formId/download', async (request, reply) => {
    const { formId } = querySchema.parse(request.params)
    const { format } = querySchema.parse(request.query)
  
    const questions = await prisma.question.findMany({
      where: { formId },
      select: { id: true, text: true, index: true},
      orderBy: { index: 'asc' }
    })
    const questionsMap = new Map();
    questions.forEach((question) => {
      questionsMap.set(question.id, question.text);
    });

    const sessions = await prisma.session.findMany({
      where: { formId },
      select: { 
        createdAt: true,
        responses: true,
      },
    });
    
    const formatedSessions = sessions.map(session => {
      const groupedResponses = new Map(questionsMap)

      session.responses.forEach((response) => {
        const text = groupedResponses.get(response.questionId )?.text || ''
        if(response?.value)
          return groupedResponses.set(response.questionId, response)

        groupedResponses.set(response.questionId, {
          ...response,
          text: text? text + ', ' + response.text: response?.text
        })
      })

      const objetoTransformado = Object.fromEntries(
        Array.from(groupedResponses, ([key, value]) => {
          const newKey = questionsMap.get(key)
          const newValue = value.value || value.text
          return [newKey, newValue];
        })
      );

      return {
        criado_em: session.createdAt,
        ...objetoTransformado
      }
    })

    if (format === 'csv') {
      const csv = parse(formatedSessions );
      reply.header('Content-Type', 'text/csv');
      reply.header('Content-Disposition', `attachment; filename=responses.csv`);
      reply.send(csv);
    } else if (format === 'excel') {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Respostas');
    
      const questionHeaders = questions.map((q: any) => q.text);
      const headers = ['Criado em', ...questionHeaders];
      worksheet.addRow(headers)
    
      formatedSessions.forEach((session) => {
        const row = [ session.criado_em, ...questionHeaders.map((header) => session[header] || '')];
        worksheet.addRow(row);
      });
    
      reply.header('Content-Type','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      reply.header('Content-Disposition', `attachment; filename=responses.xlsx`);
    
      const buffer = await workbook.xlsx.writeBuffer();
      reply.send(buffer);
    } else {
      reply.code(400).send({ error: 'Invalid format. Use "csv" or "excel".' });
    }
  });
}
