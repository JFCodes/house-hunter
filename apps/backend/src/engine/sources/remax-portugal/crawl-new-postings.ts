import {
  E_ENGINE_SOURCES,
  E_ENGINE_TASKS,
  type T_EngineEventExecutionOutcome,
  type T_EngineEventExecution,
  type T_EngineEvent,
  type T_Source,
} from '@house-hunter/types'
// App
import { InterceptNetworkOnAction } from '../../crawler/intercept-network-on-action'
import { GetValidatedOptions } from './crawl-new-postings/get-validated-options'
import { ClickAllowCookiesBanner } from './_scripts/click-allow-cookies-banner'
import type { MultiSearchPaginated } from './_types/multi-search-paginated'
import { getSearchUrl } from './crawl-new-postings/get-search-url'
import type { ExecutionError } from '../../execute-event'
import { GetBrowser } from '../../crawler/get-browser'
import { GET_BROWSER_CONFIG } from './_config'

export async function crawl(event: T_EngineEvent<T_Source['options']>): Promise<T_EngineEventExecution> {
  const options = GetValidatedOptions(event.args)
  const searchUrl = getSearchUrl(options)
  const { browser, page } = await GetBrowser(GET_BROWSER_CONFIG)
  
  const onError = (
    outcome: T_EngineEventExecutionOutcome,
    message: string
  ): void => {
    browser.close()
    const details = `[${E_ENGINE_SOURCES.REMAX_PORTUGAL}] [${E_ENGINE_TASKS.CRAWL_NEW_POSTINGS}]: ${message}`
    throw { outcome, details } satisfies ExecutionError
  }
  
  await ClickAllowCookiesBanner(page)

  // Get first page results
  const response = await InterceptNetworkOnAction<MultiSearchPaginated>({
    action: async (page) => { await page.goto(searchUrl) },
    inUrl: 'api/Listing/PaginatedMultiMatchSearch',
    method: 'POST',
    status: 200,
    page,
  })

  if (!response) onError('error-execution', 'Failed to intercept search request')

  const results = response?.data?.results ?? []
  const firstResult = results[0]
  console.log(JSON.stringify(firstResult, null, 2))

  // Wait 30 seconds
  await new Promise(r => setTimeout(r, 5000))
  browser.close()
  return { outcome: 'success' }
}
