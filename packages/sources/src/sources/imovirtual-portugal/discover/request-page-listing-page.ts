import type { T_DiscoveryTask } from '@house-hunter/data-model'
import type { Page } from 'playwright'
// App
import { PageEvaluateFetch } from '../../../engine/scripts/page-evaluate-fetch'
import { getApiSearchUrl } from './get-api-search-url'
import type { MultiSearchPaginated, PostingSearchItem } from '../_types'

export async function requestPageListing (
  page: Page,
  task: T_DiscoveryTask,
  buildId: string,
  pageNumber: number
): Promise<null | Array<PostingSearchItem>> {

  const response = await PageEvaluateFetch<MultiSearchPaginated>(page, {
    url: getApiSearchUrl(task, { pageNumber, buildId }),
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'content-type': 'application/json',
    }
  }).catch(() => null)

  if (response === null || typeof response === 'string') return []
  if (!response.pageProps) return []

  return response.pageProps.data.searchAds.items
}
