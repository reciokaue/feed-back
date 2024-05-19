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

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server listening on http://localhost:3333')
})
