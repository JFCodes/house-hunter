import { IMOVIRTUAL_PORTUGAL_INFO } from '@house-hunter/sources-info'

export const BASE_URL = IMOVIRTUAL_PORTUGAL_INFO.baseUrl
export const BASE_API_URL = 'https://www.imovirtual.com'
// export const API_SEARCH_PATH = 'api/Listing/PaginatedMultiMatchSearch'
// export const API_SEARCH = `${BASE_API_URL}/${API_SEARCH_PATH}`

export const SELECTORS = {
  scripts: {
    offersData: 'head script[data-ot-ignore][data-next-head]',
    build: 'script#__NEXT_DATA__',
  },

  cookieBanner: {
    allowButton: '#onetrust-accept-btn-handler',
    banner: '#onetrust-banner-sdk',
  }
}
