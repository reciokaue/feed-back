export function formatQuestion(question: any) {
  question.topics = question.topics.map((topic: any) => topic.name)

  if (question._count) question.responses = question._count.responses
  delete question._count

  if (question?.options?.length > 0)
    question?.options.forEach((option: any) => {
      if (option.responses) option.responses = option._count.responses

      delete option._count
    })

  return question
}

export function formatQuestions(data: any) {
  return data.map((q) => formatQuestion(q))
}
