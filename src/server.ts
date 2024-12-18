import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'

import { questionRoutes } from './routes/question'
import { categoryRoutes } from './routes/category'
import { authRoutes } from './routes/auth'
import { userRoutes } from './routes/user'
import { formRoutes } from './routes/form'
import { optionRoutes } from './routes/options'
import { responseRoutes } from './routes/response'
import { questionTypeRoutes } from './routes/questionType'
import { analyticsRoutes } from './routes/analytics'
import { fakerRoutes } from './routes/faker'
import { z } from 'zod'
import fastifyMultipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import path from 'path'

const app = fastify()

app.register(cors, { origin: true,  })
app.register(fastifyMultipart);

app.register(authRoutes)
app.register(userRoutes)
app.register(categoryRoutes)
app.register(formRoutes)
app.register(questionRoutes)
app.register(optionRoutes)
app.register(responseRoutes)
app.register(questionTypeRoutes)
app.register(analyticsRoutes)
app.register(fakerRoutes)

app.setErrorHandler((error, request, reply) => {
  console.log(error)

  if (error instanceof z.ZodError) {
    reply.status(400).send({
      statusCode: 400,
      error: 'Erro de validação',
      message: 'Formato dos dados inválidos',
      issues: error.errors, // Array com os detalhes dos erros de validação
    })
  } else {
    reply.status(error.statusCode || 500).send({
      statusCode: error.statusCode || 500,
      error: error.name || 'Erro interno do servidor',
      message: error.message || 'Erro inesperado, tente novamente mais tarde',
    })
  }
})

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server listening on http://localhost:3333')
})

app.register(fastifyStatic, {
  root: path.join(process.cwd(), 'uploads'), // Serve the "uploads" folder
  prefix: '/uploads/', // Files will be accessible at "/uploads/<filename>"
});