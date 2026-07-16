import type { T_DiscoveryTask } from '@house-hunter/data-model'
import type { Page } from 'playwright'
// App
import { PageEvaluateFetch } from '../../../engine/scripts/page-evaluate-fetch'
import { getApiSearchUrl } from './get-api-search-url'
import type { MultiSearchPaginated, PostingSearchItem } from '../_types'

type Result = {
  items: Array<PostingSearchItem>
  totalPages: number
}

export async function requestPageListing (
  page: Page,
  task: T_DiscoveryTask,
  buildId: string,
  pageNumber: number
): Promise<null | Result> {

  const response = await PageEvaluateFetch<MultiSearchPaginated>(page, {
    url: getApiSearchUrl(task, { pageNumber, buildId }),
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'content-type': 'application/json',
    }
  }).catch(() => null)

  if (response === null || typeof response === 'string') return null
  if (!response.pageProps) return null

  return {
    totalPages: response.pageProps.data.searchAds.pagination.totalPages,
    items: response.pageProps.data.searchAds.items,
  }
}
