import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'

import { questionRoutes } from './routes/question'
import { topicRoutes } from './routes/topic'
import { authRoutes } from './routes/auth'
import { userRoutes } from './routes/user'
import { formRoutes } from './routes/form'
import { optionRoutes } from './routes/options'
import { responseRoutes } from './routes/response'
import { questionTypeRoutes } from './routes/questionType'
import { z } from 'zod'

const app = fastify()

app.register(authRoutes)
app.register(userRoutes)
app.register(topicRoutes)
app.register(formRoutes)
app.register(questionRoutes)
app.register(optionRoutes)
app.register(responseRoutes)
app.register(questionTypeRoutes)

app.register(cors, { origin: true })

app.setErrorHandler((error, request, reply) => {
  console.log(error)

  if (error instanceof z.ZodError) {
    reply.status(400).send({
      statusCode: 400,
      error: 'Bad Request',
      message: 'Validation error',
      issues: error.errors, // Array com os detalhes dos erros de validação
    })
  } else {
    reply.status(error.statusCode || 500).send({
      statusCode: error.statusCode || 500,
      error: error.name || 'Internal Server Error',
      message: error.message || 'An unexpected error occurred',
    })
  }
})

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server listening on http://localhost:3333')
})
