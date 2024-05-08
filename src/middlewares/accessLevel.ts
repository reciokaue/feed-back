import { FastifyReply } from 'fastify'
import { jwtRequest } from './JWTAuth'

export async function verifyAccessLevel(
  request: jwtRequest,
  reply: FastifyReply,
) {
  try {
    if (request?.user?.access === 0)
      return reply
        .status(400)
        .send({ message: "You don't have access level do to it" })
  } catch (e) {
    reply.status(400).send({ message: 'User not found' })
  }
}
