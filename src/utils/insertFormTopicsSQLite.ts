import { Prisma } from '@prisma/client'
import { prisma } from '../lib/prisma'

// Função auxiliar para inserção manual em SQLite
export async function insertFormTopicsSQLite(topics: number[], formId: number) {
  for (const topicId of topics) {
    try {
      await prisma.formTopic.create({
        data: {
          formId,
          topicId,
        },
      })
    } catch (error) {
      // Ignora o erro se o registro já existir (equivalente ao skipDuplicates)
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code !== 'P2002'
      ) {
        throw error
      }
    }
  }
}
