import { type T_TaskCrawlNewPostings, type T_TaskExecutionResult, Err_TaskExecution } from '@house-hunter/types'
// App
import { InterceptNetworkOnAction } from '../../engine/scripts/intercept-network-on-action'
import { initializeBrowsing } from './scripts/initialize-browsing'
import { getSearchUrl } from './crawl-new-postings/get-search-url'
import { parseResult } from './scripts/parse-result'
import type { MultiSearchPaginated } from './_types'

export async function crawl(task: T_TaskCrawlNewPostings): Promise<T_TaskExecutionResult> {
  const { browser, page } = await initializeBrowsing()

  const searchUrl = getSearchUrl(task)
  const response = await InterceptNetworkOnAction<MultiSearchPaginated>({
    action: async (page) => { await page.goto(searchUrl) },
    inUrl: 'api/Listing/PaginatedMultiMatchSearch',
    method: 'POST',
    status: 200,
    page,
  })

  if (!response || !response.data || response.data.results.length === 0) {
    const error = new Err_TaskExecution(task, 'error-execution', 'search error or search has no results')
    await browser.close()
    throw error
  }

  const postings = response.data.results.map(item => parseResult(task, item))

  await browser.close()
  return { outcome: 'success', postings }
}
