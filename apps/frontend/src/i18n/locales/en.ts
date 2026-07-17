import {
  type T_AdBuildingType,
  type T_AdType,
  E_AD_STATUS
} from '@house-hunter/data-model'

const adBuildingType: Record<T_AdBuildingType, string> = {
  'single-house': 'Single house',
  'apartment': 'Apartment',
}
const adType: Record<T_AdType, string> = {
  'rent': 'rent',
  'buy': 'buy'
}

const adStatus: Record<E_AD_STATUS, string> = {
  [E_AD_STATUS.NEW]: 'New',
  [E_AD_STATUS.DELETED]: 'Deleted',
  [E_AD_STATUS.INTERESTING]: 'Interesting',
  [E_AD_STATUS.CONTACT_MADE]: 'Contacted',
  [E_AD_STATUS.PROPOSAL_MADE]: 'Proposal submitted',
  [E_AD_STATUS.PROPOSAL_ACCEPTED]: 'Proposal accepted',
  [E_AD_STATUS.PROPOSAL_REJECTED]: 'Proposal rejected',
  [E_AD_STATUS.COMPLETED]: 'Completed',
}

export default {
  global: {
    actions: 'Actions',
    active: 'Active',
    activeTask: 'Active task',
    area: 'Area',
    askingPrice: 'Asking price',
    constructionYear: 'Construction year',
    dashboard: 'Dashboard',
    description: 'Description',
    discoveryAds: 'Discover ads',
    location: 'Location',
    history: 'History',
    save: 'Save',
    status: 'Status',
    stopped: 'Stopped',
    swipe: 'Swipe ads',
    tasks: 'Tasks',
    typology: 'Rooms',
    year: 'Year',
  },
  pages: {
    ads: {
      tabs: {
        all: 'All',
      }
    },
    task: {
      crawling: {
        triggerCrawl: 'Find new ads',
        types: 'Add types'
      }
    },
    swipe: {
      emptyMessage1: 'No more ads to swipe',
      emptyMessage2: `No more ads with status '{status}'`,
      postsLeft: 'You have {count} ads to swipe',
      statusPicker: 'Select status to classify',
    }
  },
  empty: {
    noAdImages: 'No images in this posting',
  },
  notFound: {
    task: 'Task not found',
  },
  tooltips: {
    crawlNewPostingLocation1: 'Location option is based on the source website.',
    crawlNewPostingLocation2: 'Please check the source information about this field.',
  },
  toasts: {
    discoveryAdsTaskStarted: {
      message: `Discover ads task type on {target} has started`,
      title: 'Crawling started',
    },
    discoveryAdsTaskSuccess: {
      message: `Discover ads task on {target} finished successfully`,
      title: 'Task finished successfully',
    },
    discoveryAdsTaskError: {
      message: `Discover ads task on {target} finished with an error`,
      title: 'Task error',
    },
    postingUpdateFailed: {
      message: `Failed to save changes to post`,
      title: 'Update error',
    }
  },
  enums: {
    adBuildingType,
    adStatus,
    adType,
  }
} as const
