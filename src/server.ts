import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { formRoutes } from './routes/form'
import { questionRoutes } from './routes/question'
import { topicRoutes } from './routes/topic'
import { questionTypeRoutes } from './routes/questionType'
import { getUsers } from './routes/users/getAll'

import { loginRoute } from './routes/auth/login'
import { registerRoute } from './routes/auth/register'
import { getOneUser } from './routes/users/getOne'

const app = fastify()

// auth routes
app.register(loginRoute)
app.register(registerRoute)

app.register(formRoutes)
app.register(questionRoutes)
app.register(topicRoutes)
app.register(questionTypeRoutes)

// Users
app.register(getUsers)
app.register(getOneUser)

app.register(jwt, { secret: 'B9S1G094LXL' })
app.register(cors, { origin: true })

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server listening on http://localhost:3333')
})
