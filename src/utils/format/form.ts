import { formatQuestion } from './question'

export function formatForm(data: any) {
  data.topics = data.topics.map((topic: any) => topic.name)

  if (data?.questions?.length > 0) data.questions.map((q) => formatQuestion(q))

  return data
}
