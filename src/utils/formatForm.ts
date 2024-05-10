export function formatForm(data: any) {
  data.topics = data.topics.map((topic: any) => topic.name)

  if (data?.questions?.length > 0)
    data.questions.forEach((question: any) => {
      question.topics = question.topics.map((topic: any) => topic.name)

      question.responses = question._count.responses
      delete question._count

      if (question?.options?.length > 0)
        question?.options.forEach((option: any) => {
          option.responses = option._count.responses

          delete option._count
        })
    })

  return data
}
