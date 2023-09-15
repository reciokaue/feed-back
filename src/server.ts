import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'

import { formRoutes } from './routes/form'
import { questionRoutes } from './routes/question'
import { topicRoutes } from './routes/topic'

const app = fastify()

app.register(formRoutes)
app.register(questionRoutes)
app.register(topicRoutes)

app.register(cors, {origin: true})
app.listen({port: 3333, host: '0.0.0.0'})
.then(() => {
  console.log('HTTP server listening on http://localhost:3333')
})
