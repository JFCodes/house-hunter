import { IDEALISTA_PORTUGAL_INFO } from '@house-hunter/sources-info'

export const BASE_URL = IDEALISTA_PORTUGAL_INFO.baseUrl

// export const BASE_IMAGE_URL = 'https://i.maxwork.pt/l-feat'
// export const BASE_API_URL = 'https://remax.pt'
// export const API_SEARCH_PATH = 'api/Listing/PaginatedMultiMatchSearch'
// export const API_SEARCH = `${BASE_API_URL}/${API_SEARCH_PATH}`

export const SELECTORS = {
  cookieBanner: {
    allowButton: '#didomi-notice-agree-button',
    banner: '#didomi-host',
  }
}
