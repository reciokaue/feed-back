import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'

import { questionRoutes } from './routes/question'
import { topicRoutes } from './routes/topic'
import { questionTypeRoutes } from './routes/questionType'

import { createForm } from './routes/forms/create'
import { editForm } from './routes/forms/edit'
import { deleteForm } from './routes/forms/delete'
import { getAllForms } from './routes/forms/getAll'
import { getOneForm } from './routes/forms/getOne'
import { authRoutes } from './routes/auth'
import { userRoutes } from './routes/user'

const app = fastify()

app.register(authRoutes)
app.register(userRoutes)

// form routes
app.register(createForm)
app.register(deleteForm)
app.register(editForm)
app.register(getAllForms)
app.register(getOneForm)

app.register(questionRoutes)
app.register(topicRoutes)
app.register(questionTypeRoutes)

app.register(cors, { origin: true })

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server listening on http://localhost:3333')
})
