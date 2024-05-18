export function formatForm(data: any) {
  data.topics = data?.formTopics?.map((i: any) => ({
    id: i.topic.id,
    name: i.topic.name,
  }))
  delete data.formTopics

  return data
}
