import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { formRoutes } from './routes/form'
import { questionRoutes } from './routes/question'
import { topicRoutes } from './routes/topic'
import { questionTypeRoutes } from './routes/questionType'
import { authRoutes } from './routes/auth'

const app = fastify()

app.register(formRoutes)
app.register(questionRoutes)
app.register(topicRoutes)
app.register(questionTypeRoutes)
app.register(authRoutes)

app.register(jwt, { secret: 'B9S1G094LXL' })
app.register(cors, { origin: true })

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server listening on http://localhost:3333')
})
