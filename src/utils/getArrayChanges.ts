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

function formatForUpdate(array: any[] = []) {
  if (array.length === 0) return []
  
  return {
    update: array.map((item) => {
      const itemId = item.id
      delete item.id
      delete item.formId
      
      if (item?.questionType || item?.typeId) {
        item.questionType = {
          connect: {id: item?.questionType?.id || item?.typeId}
        }
        delete item.typeId
      }
      if (item?.formId) delete item.formId
      if(item?.options?.length === 0) delete item.options

      return {
        where: { id: itemId },
        data: item,
      }
    }),
  }
}
export function formatForAdding(array: any[] = []) {
  if (array.length === 0) return {create: []}

  return {
    create: array.map((item) => {
      delete item.id
      delete item.formId

      if (item?.questionType || item?.typeId) {
        item.questionType = {
          connect: {id: item?.questionType?.id || item?.typeId}
        }
        delete item.typeId
      }
      return item
    }),
  }
}
function formatForDeleting(array: any[] = []) {
  if (array.length === 0) return []

  return {
    delete: array.map((item) => ({ id: item.id })),
  }
}

export function getArrayChanges(array1: any[], array2: any[]) {
  let newArray = array1;
  let oldArray = array2;

  let addedItems: any[] = [];
  let deletedItems: any[] = [];
  let alteredItems: any[] = [];

  if (JSON.stringify(newArray) === JSON.stringify(oldArray)) {
    return {
      create: []
    };
  }

  const ItJustChangedIndexes = justChangeIndexes(newArray, oldArray);
  if (ItJustChangedIndexes) {
    return formatForUpdate(newArray);
  }
  if (oldArray.length === 0) {
    addedItems = newArray
    deletedItems = []
    alteredItems = []
  } else {
    addedItems = newArray.filter((item) => item.id < 0);

    deletedItems = oldArray.filter(
      (oldItem) => !newArray.some((newItem) => newItem.id === oldItem.id)
    );

    alteredItems = newArray.filter((item) => {
      const oldItem = oldArray.find((oldItem) => oldItem.id === item.id)
      if (!oldItem) return false
  
      if (item?.options)
        item.options = getArrayChanges(item.options, oldItem.options)
  
      return item
    })
  }

  return {
    ...formatForUpdate(alteredItems),
    ...formatForDeleting(deletedItems),
    ...formatForAdding(addedItems)
  };
}