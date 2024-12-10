/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

export interface jwtUser {
  name: string
  email: string
  sub: number
  iat: number
  exp: number
}

const secret = process.env.SECRET || '';

export interface jwtRequest extends FastifyRequest {
  user?: jwtUser | any;
}

const publicPaths = [
  '/forms', '/responses/form/:formId', '/form/:id', '/categories'
];

function isPublicPath(url) {
  // Remove query parameters and hash from the URL
  const cleanedUrl = url.split('?')[0].split('#')[0];

  return publicPaths.some((path) => {
    const pathSegments = path.split('/');
    const urlSegments = cleanedUrl.split('/');

    if (pathSegments.length !== urlSegments.length) return false;

    return pathSegments.every((segment, index) =>
      segment.startsWith(':') || segment === urlSegments[index]
    );
  });
}

export async function verifyJwt(
  request: jwtRequest | any,
  reply: FastifyReply,
) {
  try {
    if (isPublicPath(request.url) && request.method === 'GET') {
      return;
    }

    const bearerHeader = request.headers.authorization;
    const token = typeof bearerHeader !== 'undefined' && bearerHeader.split(' ')[1];

    if (!token) return reply.status(404).send({ message: 'Missing token' });

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return reply
          .status(403)
          .send({ message: 'Failed to authenticate', error: err });
      }
      request.user = decoded as jwtUser;
    });
  } catch (err) {
    return reply
      .status(401)
      .send({ message: 'Informe o token de acesso devidamente.' });
  }
}
