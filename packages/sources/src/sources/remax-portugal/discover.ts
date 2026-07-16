import { type T_DiscoveryTask, type T_ExecutionResult, Err_TaskExecution } from '@house-hunter/data-model'
// App
import type { MultiSearchPaginated, MultiSearchPaginatedPayload, PostingSearchItem } from './_types'
import { requestPageListing } from './crawl-new-postings/request-page-listing-page'
import { API_SEARCH_PATH, SELECTORS, BASE_URL } from './_constants'
import { getSearchUrl } from './crawl-new-postings/get-search-url'
import { parseResult } from './scripts/parse-result'
import {
  InterceptNetworkOnAction,
  DismissCookieBanner,
  GetBrowserAndPage
} from '../../engine'

export async function discoverScript(task: T_DiscoveryTask): Promise<T_ExecutionResult> {
  const { browser, page } = await GetBrowserAndPage()
  const checkPostingLimits = async (rawPostings: Array<PostingSearchItem>): Promise<void> => {
    if (rawPostings.length > 1000 ){
      const error = new Err_TaskExecution('error-during-execution', task, 'found too many posts. Restrict task options')
      await browser.close()
      throw error
    }
  }

  await page.goto(BASE_URL, { waitUntil: 'networkidle' })
  await DismissCookieBanner(page, {
    bannerButtonSelection: SELECTORS.cookieBanner.allowButton,
    bannerSelector: SELECTORS.cookieBanner.banner
  })

  const searchUrl = getSearchUrl(task)

  const response = await InterceptNetworkOnAction<MultiSearchPaginated, MultiSearchPaginatedPayload>({
    action: async (page) => { await page.goto(searchUrl) },
    inUrl: API_SEARCH_PATH,
    method: 'POST',
    status: 200,
    page,
  })

  if (!response || !response.data || response.data.results.length === 0) {
    const error = new Err_TaskExecution('error-during-execution', task, 'search error or search has no results')
    await browser.close()
    throw error
  }

  const rawPostings = response.data.results
  const totalPages = response.data.totalPages
  const currentPayload = response.request.payload!

  if (totalPages > 1) {
    for (let nextPage = 2; nextPage <= totalPages; nextPage++) {
      const result = await requestPageListing(page, currentPayload, nextPage)
      if (result === null) break

      rawPostings.push(...result)
      await checkPostingLimits(rawPostings)
    }
  }

  await browser.close()
  const postings = rawPostings.map(item => parseResult(task, item))
  return { outcome: 'success', data: { upsert: postings } }
}
