import type { T_PostingType, T_PostingOperation } from '@house-hunter/types'

const postingType: Record<T_PostingType, string> = {
  'apartment': 'Apartment',
  'single-home': 'Single home'
}

const postingOperation: Record<T_PostingOperation, string> = {
  'rent': 'rent',
  'buy': 'buy'
}

export default {
  global: {
    active: 'Active',
    stopped: 'Stopped',
  },
  pages: {},
  notFound: {
    task: 'Task not found',
  },
  enums: {
    postingOperation,
    postingType
  }
} as const
