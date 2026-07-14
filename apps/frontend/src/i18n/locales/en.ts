import { type T_PostingType, type T_PostingOperation, E_TASK_TYPE } from '@house-hunter/types'
import { E_POSTING_USER_STATUS } from '@house-hunter/types'

const postingType: Record<T_PostingType, string> = {
  'apartment': 'Apartment',
  'single-home': 'Single home'
}

const taskType: Record<E_TASK_TYPE, string> = {
  [E_TASK_TYPE.CRAWL_NEW_POSTINGS]: 'discover new posts',
  [E_TASK_TYPE.UPDATED_POSTING]: 'update item'
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
    activeTask: 'Active task',
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
  empty: {
    noPostingImages: 'No images in this posting',
  },
  notFound: {
    task: 'Task not found',
  },
  tooltips: {
    crawlNewPostingLocation1: 'Location option is based on the source website.',
    crawlNewPostingLocation2: 'Please check the source information about this field.',
  },
  toasts: {
    taskStarted: {
      message: `Task type '{type}' on {source} has started`,
      title: 'Crawling started',
    },
    taskEndedSuccess: {
      message: `Task type '{type}' on {source} finished successfully`,
      title: 'Task finished successfully',
    },
    taskEndedError: {
      message: `Task type '{type}' on {source} finished with an error:`,
      title: 'Task error',
    }
  },
  enums: {
    postingOperation,
    postingStatus,
    postingType,
    taskType
  }
} as const
