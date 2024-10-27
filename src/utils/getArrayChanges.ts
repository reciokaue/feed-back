function outIndexAndSortById(array: any[]) {
  return array
    .map(({ index, ...rest }) => ({
      ...rest,
      ...(rest.options && { options: outIndexAndSortById(rest.options) }),
    }))
    .sort((a, b) => {
      return a.id > b.id && a
    })
}

function justChangeIndexes(arrayA: any[], arrayB: any[]) {
  arrayA = outIndexAndSortById(arrayA)
  arrayB = outIndexAndSortById(arrayB)

  return JSON.stringify(arrayA) === JSON.stringify(arrayB)
}

function getAlteredItems(newArray: any[], oldArray: any[]) {
  if (oldArray.length === 0) return []

  return newArray.filter((item) => {
    const oldItem = oldArray.find((oldItem) => oldItem.id === item.id)
    if (!oldItem) return false

    if (item?.options)
      item.options = getArrayChanges(item.options, oldItem.options)

    return item
  })
}
function getAddedItems(newArray: any[], oldArray: any[]) {
  if (oldArray.length === 0) return newArray
  const addedItems = newArray.filter(
    (newItem) => !oldArray.find((oldItem) => oldItem.id === newItem.id),
  )
  return addedItems.map((item) => {
    if (!item.options) return item

    return {
      ...item,
      options: formatForAdding(item.options),
    }
  })
}
function getDeletedItems(newArray: any[], oldArray: any[]) {
  if (newArray.length === 0 || oldArray.length === 0) return []

  return oldArray.filter(
    (oldOpt) => !newArray.find((newOpt) => newOpt.id === oldOpt.id),
  )
}

function formatForUpdate(array: any[]) {
  if (array.length === 0) return []

  return {
    update: array.map((item) => {
      if (item?.questionType) {
        item.typeId = item.questionType.id
        delete item.questionType
      }
      if (item?.formId) delete item.formId

      return {
        where: { id: item.id },
        data: item,
      }
    }),
  }
}
export function formatForAdding(array: any[]) {
  if (array.length === 0) return {create: []}

  return {
    create: array.map((item) => {
      delete item.id
      delete item.formId

      if(item?.options){
        item.options = formatForAdding(item.options || [])
      }
      if (item?.questionType) {
        item.typeId = item.questionType.id
        delete item.questionType
      }
      return item
    }),
  }
}
function formatForDeleting(array: any[]) {
  if (array.length === 0) return []

  return {
    delete: array.map((item) => ({ id: item.id })),
  }
}

export function getArrayChanges(newArray: any[], oldArray: any[]) {
  if (JSON.stringify(newArray) === JSON.stringify(oldArray)) return []

  const ItJustChangedIndexes = justChangeIndexes(newArray, oldArray)
  if (ItJustChangedIndexes) return formatForUpdate(newArray)


  const AlteredItems = formatForUpdate(getAlteredItems(newArray, oldArray))
  const DeletedItems = formatForDeleting(getDeletedItems(newArray, oldArray))
  const AddedItems = formatForAdding(getAddedItems(newArray, oldArray))

  return {
    ...AlteredItems,
    ...DeletedItems,
    ...AddedItems,
  }
}
