export const statusMessage = {
  success: {
    message: 'Sucesso',
    description: 'A operação foi concluída com sucesso.',
  },
  created: {
    message: 'Recurso criado',
    description: 'O recurso foi criado com sucesso.',
  },
  accepted: {
    message: 'Requisição aceita',
    description: 'A requisição foi aceita para processamento.',
  },
  noContent: {
    message: 'Sem conteúdo',
    description:
      'A requisição foi bem-sucedida, mas não há conteúdo a ser retornado.',
  },
  invalidPassword: {
    message: 'Senha incorreta',
    description: 'A senha fornecida está incorreta.',
  },
  emailAlreadyExistis: {
    message: 'Este e-mail já existe, por favor use outro',
    description: 'O e-mail fornecido já está registrado no sistema.',
  },
  emailNotExist: {
    message: 'E-mail não existe',
    description: 'O e-mail fornecido não está registrado no sistema.',
  },
  notVerified: {
    message: 'Usuário não verificado',
    description: 'O usuário ainda não foi verificado.',
  },
  badRequest: {
    message: 'Requisição inválida',
    description:
      'A requisição não pôde ser entendida ou estava faltando parâmetros necessários.',
  },
  unauthorized: {
    message: 'Não autorizado',
    description: 'Você não tem permissão para acessar este recurso.',
  },
  forbidden: {
    message: 'Proibido',
    description: 'Você não tem autorização para acessar este recurso.',
  },
  topicNotFound: {
    message:
      'Este tópico não foi encontrado no nosso sistema, pode ter sido excluído, tente outro',
    description:
      'O tópico especificado não foi encontrado ou pode ter sido excluído.',
  },
  notFound: {
    message: 'Não encontrado',
    description: 'O recurso solicitado não foi encontrado.',
  },
  methodNotAllowed: {
    message: 'Método não permitido',
    description: 'O método HTTP usado não é permitido para este recurso.',
  },
  conflict: {
    message: 'Conflito',
    description:
      'A requisição não pôde ser concluída devido a um conflito com o estado atual do recurso.',
  },
  unprocessableEntity: {
    message: 'Entidade não processável',
    description: 'A requisição foi compreendida, mas não pôde ser processada.',
  },
  tooManyRequests: {
    message: 'Muitas requisições',
    description: 'Você fez muitas requisições em um curto período de tempo.',
  },
  internalServerError: {
    message: 'Erro interno do servidor',
    description:
      'Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.',
  },
}
