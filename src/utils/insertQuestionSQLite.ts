import { Prisma } from '@prisma/client'
import { prisma } from '../lib/prisma'

// Função auxiliar para inserir uma questão individualmente no SQLite
export async function insertQuestionSQLite(question: any, newFormId: number) {
  try {
    // Cria a questão no banco de dados
    const createdQuestion = await prisma.question.create({
      data: {
        text: question.text,
        index: question.index,
        required: question.required,
        formId: newFormId,
        typeId: question.typeId || undefined, // Conectando ao questionType, se existir
      },
    })
    console.log(question)
    // Se existirem opções para a questão, cria as promessas para a inserção das opções
    if (question.options && question.options.length > 0) {
      console.log('TEM')
      const optionPromises = question.options.map((option: any) => {
        return prisma.option.create({
          data: {
            text: option.text,
            index: option.index,
            questionId: createdQuestion.id,
          },
        })
      })

      // Espera que todas as promessas sejam resolvidas
      await Promise.all(optionPromises)
    }

    return createdQuestion
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw error
    } else {
      console.error('Unexpected error:', error)
      throw new Error('Failed to insert question')
    }
  }
}

// Função principal para inserir múltiplas questões
export async function insertMultipleQuestionsSQLite(
  questions: any[],
  newFormId: number,
) {
  try {
    // Cria as promessas para a inserção de cada questão
    const questionPromises = questions.map((question) =>
      insertQuestionSQLite(question, newFormId),
    )

    // Aguarda todas as questões serem inseridas
    await Promise.all(questionPromises)
  } catch (error) {
    console.error('Failed to insert multiple questions:', error)
    throw error
  }
}
