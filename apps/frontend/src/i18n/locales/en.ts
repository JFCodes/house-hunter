import type { T_PostingType, T_PostingOperation } from '@house-hunter/types'
import { E_POSTING_USER_STATUS } from '@house-hunter/types'

const postingType: Record<T_PostingType, string> = {
  'apartment': 'Apartment',
  'single-home': 'Single home'
}

const postingOperation: Record<T_PostingOperation, string> = {
  'rent': 'rent',
  'buy': 'buy'
}

const postingStatus: Record<E_POSTING_USER_STATUS, string> = {
  [E_POSTING_USER_STATUS.NEW]: 'New',
  [E_POSTING_USER_STATUS.DISMISS]: 'Dismissed',
  [E_POSTING_USER_STATUS.INTERESTING]: 'Interesting',
  [E_POSTING_USER_STATUS.CONTACT_MADE]: 'Contacted',
  [E_POSTING_USER_STATUS.PROPOSAL_MADE]: 'Proposal submitted',
  [E_POSTING_USER_STATUS.PROPOSAL_ACCEPTED]: 'Proposal accepted',
  [E_POSTING_USER_STATUS.PROPOSAL_REJECTED]: 'Proposal rejected',
  [E_POSTING_USER_STATUS.BOUGHT]: 'Bought',
}

export default {
  global: {
    actions: 'Actions',
    active: 'Active',
    area: 'Area',
    askingPrice: 'Asking price',
    constructionYear: 'Construction year',
    description: 'Description',
    location: 'Location',
    history: 'History',
    save: 'Save',
    status: 'Status',
    stopped: 'Stopped',
    tasks: 'Tasks',
    typology: 'Rooms',
    year: 'Year',
  },
  pages: {
    postings: {
      tabs: {
        all: 'All',
      }
    },
    task: {
      crawling: {
        triggerCrawl: 'Find new posts',
        types: 'Posting types'
      }
    }
  },
  notFound: {
    task: 'Task not found',
  },
  tooltips: {
    crawlNewPostingLocation1: 'Location option is based on the source website.',
    crawlNewPostingLocation2: 'Please check the source information about this field.',
  },
  enums: {
    postingOperation,
    postingStatus,
    postingType
  }
} as const
