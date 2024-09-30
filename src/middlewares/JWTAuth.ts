/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import { jwtUser } from '../utils/types/jwtUser'

const secret = process.env.SECRET || ''

export interface jwtRequest extends FastifyRequest {
  user?: jwtUser | any
}

export async function verifyJwt(
  request: jwtRequest | any,
  reply: FastifyReply,
) {
  try {
    const bearerHeader = request.headers.authorization
    const token =
      typeof bearerHeader !== 'undefined' && bearerHeader.split(' ')[1]

    if (!token) return reply.status(404).send({ message: 'Missing token' })

    jwt.verify(token, secret, (err, decoded) => {
      if (err)
        return reply
          .status(403)
          .send({ message: 'Failed to authenticate', error: err })

      request.user = decoded as jwtUser
    })
  } catch (err) {
    return reply
      .status(401)
      .send({ message: 'Informe o token de acesso devidamente.' })
  }
}
