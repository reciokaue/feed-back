import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { verifyJwt } from '../middlewares/JWTAuth'
import { querySchema } from '../utils/querySchema'
import { CategorySchema, CategorySelect } from '../../prisma/models/Category'

export async function categoryRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/categories', async (request, reply) => {
    const { page, pageSize, query, parentId } = querySchema.parse(request.query)

    const filters = {
      ...(query && { label: { contains: query } }),
      ...(parentId ? { parentId: parentId }: {parentId: null})
    }

    const category = await prisma.category.findMany({
      where: filters,
      select: CategorySelect,
      take: pageSize,
      skip: pageSize * page,
    });
    const totalCount = await prisma.category.count({
      where: filters
    })

    return reply.status(200).send({
      meta: { page, pageSize, totalCount, parentId },
      categories: category
    })
  })
  app.get('/category/:categoryId', async (request, reply) => {
    const { categoryId } = querySchema.parse(request.params)
    
    const category = await prisma.category.findFirst({
      where: { id: categoryId},
      select: CategorySelect,
    });

    return reply.status(200).send(category)
  })

  app.post('/category', async (request, reply) => {
    const bodySchema = z.array(CategorySchema)
    const category = bodySchema.parse(request.body)

    if (category.length === 0) {
      return reply.status(400).send({ message: 'Dados insuficientes' })
    }
    await prisma.category.createMany({
      data: category.map((category) => (category)) as any,
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
