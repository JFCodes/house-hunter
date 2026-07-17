import { type T_ExecutionResult, type T_DiscoveryTask, Err_TaskExecution } from '@house-hunter/data-model'
// App
import { requestPageListing } from './discover/request-page-listing-page'
import { DismissCookieBanner, GetBrowserAndPage } from '../../engine'
import { parseResult } from './scripts/parse-result'
import { getBuildId } from './scripts/get-build-id'
import { SELECTORS, BASE_URL } from './_constants'
import type { PostingSearchItem } from './_types'

export async function discoverScript(task: T_DiscoveryTask): Promise<T_ExecutionResult> {
  const { browser, page } = await GetBrowserAndPage()

  await page.goto(BASE_URL, { waitUntil: 'networkidle' })
  await DismissCookieBanner(page, {
    bannerButtonSelection: SELECTORS.cookieBanner.allowButton,
    bannerSelector: SELECTORS.cookieBanner.banner
  })

  let buildId: string = ''
  try {
    buildId = await getBuildId(page)
  } catch (e) {
    const message = e instanceof Error ? e.message : 'failed to fetch build id for network listing'
    const error = new Err_TaskExecution('error-during-execution', task, message)
    await browser.close()
    throw error
  }

  // First page brings in total pages
  const result = await requestPageListing(page, task, buildId, 1)
  if (!result || result.items.length === 0) return { outcome: 'success', data: { upsert: [] } }

  const rawPostings: Array<PostingSearchItem> = [...result.items]
  
  if (result.totalPages > 1) {
    for (let nextPage = 2; nextPage <= result.totalPages; nextPage++) {
      const pageResult =  await requestPageListing(page, task, buildId, nextPage)
      if (!pageResult) break
      rawPostings.push(...pageResult.items)
    }
  }

  await browser.close()
  const postings = rawPostings.map(item => parseResult(task, item))
  return { outcome: 'success', data: { upsert: postings } }
}
