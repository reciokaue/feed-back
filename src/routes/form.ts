import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { jwtRequest, verifyJwt } from '../middlewares/JWTAuth'
import { querySchema } from '../utils/querySchema'
import {
  formDetailSelect,
  FormSchema,
  formSelect,
} from '../../prisma/models/Form'
import { formatForAdding, getArrayChanges } from '../utils/getArrayChanges'
import { questionSelect } from '../../prisma/models/Question'
import path from 'path'
import fs from 'fs';

const paramsSchema = z.object({
  id: z.coerce.number().positive().int().optional(),
  templateId: z.coerce.number().positive().int().optional(),
})

export async function formRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/forms', async (request: jwtRequest, reply) => {
    const { page, pageSize, query, isPublic, categoryId } = querySchema.parse(
      request.query,
    )

    if(!isPublic && !request?.user?.sub)
      return reply.status(401).send({message: 'Você não esta autenticado'})

    const filters: any = {
      ...(query && {
        OR: [{ name: { contains: query } }, { about: { contains: query } }],
      }),
      ...(isPublic
        ? { isPublic: true, active: true }
        : { userId: request.user?.sub }),
      ...(categoryId && { category: { id: categoryId } }),
    }

    const totalCount = await prisma.form.count({
      where: filters,
    })

    const forms = await prisma.form.findMany({
      where: filters,
      take: pageSize,
      skip: pageSize * page,
      select: formSelect,
    })

    reply.send({ meta: { page, pageSize, totalCount }, forms })
  })
  app.get('/form/:id', async (request, reply) => {
    const { id } = paramsSchema.parse(request.params)

    const form = await prisma.form.findUnique({
      where: { id },
      select: formDetailSelect,
    })

    if (!form)
      return reply.status(404).send({ message: 'Formulário não encontrado' })

    return reply.status(200).send(form)
  })
  app.post('/form', async (request: jwtRequest, reply) => {
    const form = FormSchema.partial().parse(request.body)
    const { templateId } = paramsSchema.parse(request.query)

    if (templateId) {
      const questions = await prisma.question.findMany({
        where: { formId: templateId },
        select: questionSelect,
      })

      form.questions = formatForAdding(questions) as any
    }
    const newForm = await prisma.form.create({
      data: {
        name: form.name,
        description: form.description,
        userId: request.user.sub,
        categoryId: form?.category?.id || form.categoryId,
      } as any,
    })

    reply.status(200).send(newForm)
  })
  app.put('/form/:id', async (request: jwtRequest, reply) => {
    const { id } = paramsSchema.parse(request.params)
    const form = FormSchema.pick({
      id: true,
      name: true,
      description: true,
      active: true,
      isPublic: true,
      category: true,
    }).parse(request.body)

    const formExists = await prisma.form.findUnique({where: { id }});
    if (!formExists) {
      return reply.status(404).send({ error: 'Formulário não encontrado.' });
    }

    const updatedForm = await prisma.form.update({
      where: { id },
      data: {
        name: form.name,
        description: form.description,
        active: form.active,
        logoUrl: form.logoUrl,
        isPublic: form.isPublic,
        category: {
          connect: {id: form.category?.id}
        }
        // logoUrl,
      } as any,
    });

    return reply.status(200).send(updatedForm);
  })
  app.patch('/form/:id/upload', async (request: jwtRequest, reply) => {
    const { id } = paramsSchema.parse(request.params)
    const file = await request.file();

    if(!file)
      return reply.status(400).send({message: 'Imagem invalida'})

    const uploadDir = path.join(process.cwd(), 'uploads')
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    const filePath = path.join(uploadDir, file.filename);
    const writeStream = fs.createWriteStream(filePath);

    file.file.pipe(writeStream);

    const logoUrl = `${process.env.API_URL}/uploads/${file.filename}`;

    const updatedForm = await prisma.form.update({
      where: { id: Number(id) },
      data: { logoUrl } as any,
    });

    return reply.status(200).send({logoUrl});
  })

  app.delete('/form/:id', async (request: jwtRequest, reply) => {
    const { id } = paramsSchema.parse(request.params)

    const form = await prisma.form.findUnique({
      where: { id },
    })
    if (!form)
      return reply.status(404).send({ message: 'Formulário não encontrado' })
    if (form.userId !== request?.user?.sub)
      return reply.status(400).send({ message: 'Este não é o seu formulário' })

    await prisma.form.delete({
      where: { id: form.id },
    })

    return form
  })
}
