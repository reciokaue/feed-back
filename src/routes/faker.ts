import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { querySchema } from '../utils/querySchema'
import { Faker, base, pt_BR } from '@faker-js/faker';

export const faker = new Faker({
  locale: [base, pt_BR],
});

export async function fakerRoutes(app: FastifyInstance) {
  app.post('/faker/responses/form/:formId', async (request, reply) => {
    const { formId } = querySchema.parse(request.params)
    const { count: sessionsCount } = querySchema.parse(request.query)
  
    const questions = await prisma.question.findMany({
      where: {
        formId: formId,
      },
      include: {
        options: true,
        questionType: true,
      },
    });
  
    const sessions: any[] = [];
    for (let i = 0; i < (sessionsCount); i++) {
      const responses = questions.map((question) => {
        const questionType = question?.questionType?.name || ''; 
        const questionId = question.id;
  
        if (["list", "options"].includes(questionType)) {
          const optionIds = question.options.map((option) => option.id);
          const selectedOptions = faker.helpers.arrayElements(optionIds, {
            min: 1,
            max: question.options.length, // Máximo de 2 opções por resposta
          });
          return selectedOptions.map((optionId) => ({
            questionId,
            optionId,
            text: question.options.find((o) => o.id === optionId)?.text,
          }));
        }
  
        if (["text", "phone", "email", "time", "date", "longText"].includes(questionType)) {
          let text;
          switch (questionType) {
            case "text":
              text = faker.lorem.sentence();
              break;
            case "phone":
              text = faker.phone.number();
              break;
            case "email":
              text = faker.internet.email();
              break;
            case "time":
              text = faker.date.soon({days: 1}).toISOString();
              break;
            case "date":
              text = faker.date.soon({days: 20}).toISOString();
              break;
            case "longText":
              text = faker.lorem.paragraph();
              break;
          }
  
          return {
            questionId,
            text,
          };
        }
        if(questionType === 'starRating')
          return ({
            questionId,
            value: faker.number.int({min: 1, max: 5}),
          });
        if(questionType === 'slider')
          return ({
            questionId,
            value: faker.number.int({min: 0, max: 10}),
          });
        return null;
      });
  
      // Filtra respostas válidas e cria uma sessão
      const sessionResponses = responses.flat().filter(Boolean);
      const session = {
        createdAt: faker.date.recent(),
        formId: formId,
        responses: sessionResponses,
      };
  
      sessions.push(session);
    }
    Promise.all(
      sessions.map((session: any) =>
        prisma.session.create({
          data: {
            createdAt: session.createdAt,
            formId: session.formId,
            responses: {
              create: session.responses,
            },
          },
        })
      )
    );
  
    reply.send();
  });
  app.post("/faker/users", async (request, reply) => {
    const { count } = querySchema.parse(request.query); // Número de usuários a serem criados

    const users = generateUsers(count || 1)
    
    const createdUsers = await prisma.user.createMany({
      data: users,
    });

    reply.send({ createdUsers });
  });
  app.post("/faker/forms/:userId", async (request, reply) => {
    const { userId } = querySchema.parse(request.params);
    const { count } = querySchema.parse(request.query);
  
    const questionTypes = await prisma.questionType.findMany();
    const categories = await prisma.category.findMany({
      where: {parentId: { not: null }}
    });

    const forms = await generateForms(count || 1, userId, categories, questionTypes)
  
    await prisma.$transaction(
      forms.map((form) =>
        prisma.form.create({
          data: form as any
        })
      )
    );
  
    reply.send();
  });

  app.post('/faker/users/:userId/forms/:count', async (request, reply) => {
    const { userId, count } = querySchema.parse(request.params);

    const questionTypes = await prisma.questionType.findMany();
    const categories = await prisma.category.findMany({
      where: {parentId: { not: null }}
    });

    const users = generateUsers(userId || 1);
    const createdUsers = await prisma.user.createManyAndReturn({
      data: users,
      skipDuplicates: true,
    }); 

    const forms = await Promise.all(
      createdUsers.map(async (user: any) => {
        return await generateForms(count, user.id, categories, questionTypes);
      })
    );

    await prisma.$transaction(
      forms.flat().map((form) =>
        prisma.form.create({
          data: form as any
        })
      )
    );

    reply.send();
  })
}

function generateUsers(count?: number){
  const users = Array.from({ length: count || 10 }, () => ({
    name: faker.company.name(),
    email: faker.internet.email(),
    password: '$2b$10$Rc1qP.k1UMGMAmZaup/1SO6MrNrIJszhKNSfh/YoWhEfxV5eRIidi',
    profileImage: faker.image.avatar(),
  }));

  return users
}

async function generateForms(count: any, userId: any, categories: any, questionTypes: any){
  // Gera os formulários
  const forms = Array.from({ length: count || 5 }, () => ({
    name: faker.lorem.words(3),
    description: faker.lorem.paragraph(),
    logoUrl: faker.helpers.arrayElement([
      '/images/blog/blog-post-1.jpg',
      '/images/blog/blog-post-2.jpg',
      '/images/blog/blog-post-3.jpg',
      '/images/blog/blog-post-4.jpg',
    ]),
    isPublic: true,
    active: true,
    categoryId: faker.helpers.arrayElement(categories).id,
    userId: userId,
    questions: { create: Array.from({ length: faker.number.int({ min: 2, max: 10 }) }, (_, index) => {
      const questionType = faker.helpers.arrayElement(questionTypes);

      const questionData = {
        text: faker.lorem.sentence(),
        index,
        required: faker.datatype.boolean(),
        questionType: { connect: { id: questionType.id } },
      };

      if (["list", "options"].includes(questionType.name)) {
        return {
          ...questionData,
          options: {
            create: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }, (__, optIndex) => ({
              text: faker.lorem.word(),
              index: optIndex,
            })),
          },
        };
      }

      return questionData;
    })}
  }));
  
  return forms
}