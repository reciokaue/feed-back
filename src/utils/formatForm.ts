export function formatForm(data: any) {
  data.topics = data.topics.map((topic: any) => topic.name)

  data = { ...data, ...data._count }
  delete data._count

  if (data.questions.length > 0)
    data.questions.forEach((question: any) => {
      question.topics = question.topics.map((topic: any) => topic.name)

      if (question?.options.length > 0)
        question?.options.forEach((option: any) => {
          option.responses = option._count.responses

          delete option._count
        })
    })

  return data
}
