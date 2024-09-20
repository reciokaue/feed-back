import { Option } from '@prisma/client'

export function getOptionsPutStatus(
  oldOptions: Option[],
  newOptions: Option[],
) {
  const alteredOptions = newOptions
    .filter((newOpt) => {
      const oldOpt = oldOptions.find((oldOpt) => oldOpt.id === newOpt.id)
      return oldOpt && oldOpt.text !== newOpt.text
    })
    .map((opt) => ({
      where: { id: opt.id },
      data: { text: opt.text },
    }))

  const addedOptions = newOptions
    .filter((newOpt) => !oldOptions.find((oldOpt) => oldOpt.id === newOpt.id))
    .map((opt) => ({
      text: opt.text,
      index: opt.index,
    }))

  const removedOptions = oldOptions
    .filter((oldOpt) => !newOptions.find((newOpt) => newOpt.id === oldOpt.id))
    .map((opt) => ({ id: opt.id }))

  return {
    update: alteredOptions,
    create: addedOptions,
    delete: removedOptions,
  }
}
