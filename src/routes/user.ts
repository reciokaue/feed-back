import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { jwtRequest, verifyJwt } from '../middlewares/JWTAuth'
import bcrypt from 'bcrypt'
import { UserSchema } from '../../prisma/models/User'
import path from 'path'
import fs from 'fs'

const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
})

export async function userRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/users', async (request: jwtRequest) => {
    const paramsSchema = z.object({
      page: z.number().default(0),
      pageSize: z.number().default(15),
    })
    const { page, pageSize } = paramsSchema.parse(request.params)

    const users = await prisma.user.findMany({
      take: pageSize,
      skip: page * pageSize,
    })

    return users
  })
  app.get('/user/:id', async (request, reply) => {
    const { id } = paramsSchema.parse(request.params)

    const user = await prisma.user.findUnique({
      where: { id },
    })
    if (!user) return reply.status(404).send({ message: 'User not found' })

    return user
  })
  app.put('/user/:id', async (request, reply) => {
    const { id } = paramsSchema.parse(request.params)
    const user = UserSchema.partial().parse(request.body)

    const userExists = await prisma.user.findUnique({
      where: { id },
    })
    if (!userExists || id !== user.id)
      return reply.status(404).send({ message: 'User not found' })

    const hashedPassword =
      user.password && (await bcrypt.hash(user?.password, 10))

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...user,
        ...(user.password && { password: hashedPassword }),
      },
    })

    return reply.send(updatedUser)
  })
  app.patch('/user/:id/upload', async (request: jwtRequest, reply) => {
    const { id } = paramsSchema.parse(request.params)
    const file = await request.file();
    
    if(!file)
      return reply.status(400).send({message: 'Imagem invalida'})

    const userExists = await prisma.user.findUnique({
      where: { id }
    })

    if(!file)
      return reply.status(404).send({message: 'Usuário não existe'})

    if(userExists?.profileImage)
      fs.unlink(path.join(process.cwd(), 'uploads', userExists.profileImage.split('/uploads/')[1]), console.log)

    const filename = `${Date.now()}-${file.filename}`
    const uploadDir = path.join(process.cwd(), 'uploads/profile')
    const filePath = path.join(uploadDir, filename);
    const writeStream = fs.createWriteStream(filePath);
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    file.file.pipe(writeStream);
    
    const profileImage = `${process.env.API_URL}/uploads/profile/${filename}`;

    await prisma.user.update({
      where: { id },
      data: { profileImage } as any,
    });

    return reply.status(200).send({profileImage});
  })

  app.delete('/user/:id', async (request, reply) => {
    const { id } = paramsSchema.parse(request.params)

    const userExists = await prisma.user.findUnique({
      where: { id },
    })
    if (!userExists)
      return reply.status(404).send({ message: 'User not found' })

    const deletedUser = await prisma.user.delete({
      where: { id },
    })

    return reply.send(deletedUser)
  })
}
