export const questionSelect = {
  id: true,
  text: true,
  index: true,
  questionType: true,
  required: true,
  formId: true,
  options: {
    select: {
      id: true,
      index: true,
      text: true,
    },
  },
  // _count: {
  //   select: {
  //     // responses: true,
  //   },
  // },
}
export const questionCompareSelect = {
  id: true,
  text: true,
  index: true,
  typeId: true,
  required: true,
  formId: true,
  options: {
    select: {
      id: true,
      index: true,
      text: true,
    },
  },
}
