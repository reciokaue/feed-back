import { FastifyReply } from 'fastify'
import { prisma } from '../lib/prisma'
import { jwtRequest } from './JWTAuth'

export async function verifyAccessLevel(
  request: jwtRequest,
  reply: FastifyReply,
) {
  try {
    const userExists = await prisma.user.findUniqueOrThrow({
      where: { id: request?.user?.sub },
    })

    if (userExists.accessLevel === 0)
      return reply
        .status(400)
        .send({ message: "You don't have access level do to it" })
  } catch (e) {
    reply.status(400).send({ message: 'User not found' })
  }
}
