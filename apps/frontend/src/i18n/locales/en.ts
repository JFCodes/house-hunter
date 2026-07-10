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
    area: 'Area',
    askingPrice: 'Asking price',
    constructionYear: 'Construction year',
    stopped: 'Stopped',
    typology: 'Rooms',
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
