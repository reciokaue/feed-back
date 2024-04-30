import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'

import { questionRoutes } from './routes/question'
import { topicRoutes } from './routes/topic'
import { questionTypeRoutes } from './routes/questionType'
import { getUsers } from './routes/users/getAll'

import { loginRoute } from './routes/auth/login'
import { registerRoute } from './routes/auth/register'
import { getOneUser } from './routes/users/getOne'
import { createForm } from './routes/forms/create'
import { editForm } from './routes/forms/edit'
import { deleteForm } from './routes/forms/delete'
import { getAllForms } from './routes/forms/getAll'
import { getOneForm } from './routes/forms/getOne'

const app = fastify()

// auth routes
app.register(loginRoute)
app.register(registerRoute)

// form routes
app.register(createForm)
app.register(deleteForm)
app.register(editForm)
app.register(getAllForms)
app.register(getOneForm)

app.register(questionRoutes)
app.register(topicRoutes)
app.register(questionTypeRoutes)

// Users
app.register(getUsers)
app.register(getOneUser)

app.register(cors, { origin: true })

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server listening on http://localhost:3333')
})
