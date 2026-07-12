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
    location: 'Location',
    history: 'History',
    stopped: 'Stopped',
    tasks: 'Tasks',
    typology: 'Rooms',
  },
  pages: {},
  notFound: {
    task: 'Task not found',
  },
  tooltips: {
    crawlNewPostingLocation1: 'Location option is based on the source website.',
    crawlNewPostingLocation2: 'Please check the source information about this field.',
  },
  enums: {
    postingOperation,
    postingType
  }
} as const
