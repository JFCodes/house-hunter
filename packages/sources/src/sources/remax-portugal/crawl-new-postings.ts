import { type T_TaskCrawlNewPostings, type T_TaskExecutionResult, Err_TaskExecution } from '@house-hunter/types'
// App
import type { MultiSearchPaginated, MultiSearchPaginatedPayload } from './_types'
import { requestPageListing } from './crawl-new-postings/request-page-listing-page'
import { API_SEARCH_PATH, SELECTORS, BASE_URL } from './_constants'
import { getSearchUrl } from './crawl-new-postings/get-search-url'
import { parseResult } from './scripts/parse-result'
import {
  InterceptNetworkOnAction,
  DismissCookieBanner,
  GetBrowserAndPage
} from '../../engine'

export async function crawl(task: T_TaskCrawlNewPostings): Promise<T_TaskExecutionResult> {
  const { browser, page } = await GetBrowserAndPage()

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
    const error = new Err_TaskExecution(task, 'error-execution', 'search error or search has no results')
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
    }
  }

  await browser.close()

  const postings = rawPostings.map(item => parseResult(task, item))
  return { outcome: 'success', postings }
}
