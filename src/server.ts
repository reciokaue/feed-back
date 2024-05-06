import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'

import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

import { questionRoutes } from './routes/question'
import { topicRoutes } from './routes/topic'
import { authRoutes } from './routes/auth'
import { userRoutes } from './routes/user'
import { formRoutes } from './routes/form'

const app = fastify()

app.register(authRoutes)
app.register(userRoutes)
app.register(formRoutes)

app.register(questionRoutes)
app.register(topicRoutes)

app.register(cors, { origin: true })

// app.register(fastifySwaggerUi, {})
// eslint-disable-next-line @typescript-eslint/no-var-requires
app.register(fastifySwagger, {
  routePrefix: '/docs',
})

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server listening on http://localhost:3333')
})

// app.ready((err) => {
//   if (err) throw err
//   fastify.swagger()
// })
