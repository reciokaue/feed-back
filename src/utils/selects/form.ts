import { questionSelect } from './question'

export const formSelect = {
  id: true,
  name: true,
  about: true,
  active: true,
  logoUrl: true,
  isPublic: true,
  createdAt: true,
  formTopics: {
    select: {
      topic: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
  _count: {
    select: {
      questions: true,
      sessions: true,
    },
  },
}
export const formDetailSelect = {
  id: true,
  name: true,
  about: true,
  active: true,
  logoUrl: true,
  isPublic: true,
  createdAt: true,
  _count: {
    select: {
      questions: true,
      sessions: true,
    },
  },
  questions: {
    select: questionSelect,
    orderBy: {
      index: 'asc' as const,
    },
  },
  formTopics: {
    select: {
      topic: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
}
