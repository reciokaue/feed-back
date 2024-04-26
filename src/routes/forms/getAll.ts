import { FastifyInstance } from 'fastify'
import { statusMessage } from '../../utils/statusMessage'
import { jwtUser } from '../../types/jwtUser'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'
import { paginationSchema } from '../../utils/schemas/pagination'

export async function getAllForms(app: FastifyInstance) {
  app.addHook('onRequest', async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(statusMessage.notVerified)
    }
  })

  app.get('/form', async (request) => {
    const user = request.user as jwtUser

    const { page, pageSize, isDefault, query } = paginationSchema.parse(
      request.query,
    )

    const forms = await prisma.form.findMany({
      where: {
        ...(!isDefault && { userId: user.sub }),
        ...(query !== '' && {
          name: {
            contains: query,
          },
          about: {
            contains: query,
          },
        }),
        isDefault,
      },
      include: { _count: true },
      take: pageSize,
      skip: page * pageSize,
    })

    return forms
  })
}
