import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {

    
  } catch (err) {
    return reply
      .status(401)
      .send({ message: 'Informe o token de acesso devidamente.' })
  }
}
