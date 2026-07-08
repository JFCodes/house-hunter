import type { RemaxPostingSearchResult } from './search-result'

// Tracking what matters
export type MultiSearchPaginated = {
  results: Array<RemaxPostingSearchResult>
  hasNextPage: number
  totalPages: number
  pageSize: number
  total: number
}
