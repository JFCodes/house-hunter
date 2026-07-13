import { type T_TaskCrawlNewPostings, type T_TaskExecutionResult, Err_TaskExecution } from '@house-hunter/types'
// App
import { InterceptNetworkOnAction } from '../../engine/scripts/intercept-network-on-action'
import type { MultiSearchPaginated, MultiSearchPaginatedPayload } from './_types'
import { requestPageListing } from './scripts/request-page-listing-page'
import { initializeBrowsing } from './scripts/initialize-browsing'
import { getSearchUrl } from './crawl-new-postings/get-search-url'
import { parseResult } from './scripts/parse-result'
import { API_SEARCH_PATH } from './_constants'

export async function crawl(task: T_TaskCrawlNewPostings): Promise<T_TaskExecutionResult> {
  const { browser, page } = await initializeBrowsing()

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
