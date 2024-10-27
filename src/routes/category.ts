import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { verifyJwt } from '../middlewares/JWTAuth'
import { paginationSchema } from '../utils/paginationSchema'
import { CategorySchema } from '../../prisma/models/Category'

export async function categoryRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/category', async (request, reply) => {
    const { page, pageSize, query } = paginationSchema.parse(request.query)

    const category = await prisma.category.findMany({
      where: {...(query && {label: { contains: query }})},
      take: pageSize,
      skip: pageSize * page,
    })

    return reply.status(200).send(category)
  })
  app.post('/category', async (request, reply) => {
    const bodySchema = z.array(CategorySchema.partial())
    const category = bodySchema.parse(request.body)

    if (category.length === 0) {
      return reply.status(400).send({ message: 'Dados insuficientes' })
    }
    await prisma.category.createMany({
      data: category.map(({label, icon}) => ({ label, icon })) as any,
      skipDuplicates: true,
    })

    reply.status(201)
  })

  app.delete('/category', async (request, reply) => {
    const bodySchema = z.array(z.number())
    const category = bodySchema.parse(request.body)

    if (category.length === 0)
      return Response.json({ message: 'Dados insuficientes' }, { status: 400 })

    await prisma.category.deleteMany({
      where: {
        id: { in: category },
      },
    })

    reply.send()
  })
}
