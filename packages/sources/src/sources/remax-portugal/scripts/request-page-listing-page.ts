import type { Page } from 'playwright'
// App
import { PageEvaluateFetch } from '../../../engine/scripts/page-evaluate-fetch'
import { API_SEARCH } from '../_constants'
import type {
  MultiSearchPaginatedPayload,
  MultiSearchPaginated,
  PostingSearchItem,
} from '../_types'

export async function requestPageListing (
  page: Page,
  currentPayload: MultiSearchPaginatedPayload,
  pageNumber: number
): Promise<null | Array<PostingSearchItem>> {

  const response = await PageEvaluateFetch<MultiSearchPaginated>(page, {
    body: { ...currentPayload, pageNumber },
    url: API_SEARCH,
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'content-type': 'application/json',
    }
  }).catch(() => null)

  if (!response || typeof response === 'string') return null

  return response.results
}
