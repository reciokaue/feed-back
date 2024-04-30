import { jwtUser } from './jwtUser'

declare module 'fastify' {
  interface FastifyRequest {
    user: jwtUser
  }
}
