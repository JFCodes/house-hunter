import { type T_TaskCrawlNewPostings, type T_TaskExecutionResult, Err_TaskExecution } from '@house-hunter/types'
// App
import { getOffersCount } from './crawl-new-postings/get-offers-count'
import { getBuildId } from './scripts/get-build-id'
import { requestPageListing } from './crawl-new-postings/request-page-listing-page'
import { DismissCookieBanner, GetBrowserAndPage } from '../../engine'
import { getSearchUrl } from './crawl-new-postings/get-search-url'
import { SELECTORS, BASE_URL } from './_constants'
import { parseResult } from './scripts/parse-result'
import type { PostingSearchItem } from './_types'

export async function crawl(task: T_TaskCrawlNewPostings): Promise<T_TaskExecutionResult> {
  const { browser, page } = await GetBrowserAndPage()

  await page.goto(BASE_URL, { waitUntil: 'networkidle' })
  await DismissCookieBanner(page, {
    bannerButtonSelection: SELECTORS.cookieBanner.allowButton,
    bannerSelector: SELECTORS.cookieBanner.banner
  })

  let searchUrl: string = ''
  try {
    searchUrl = getSearchUrl(task)
  } catch (e) {
    const message = e instanceof Error ? e.message : 'failed to generate search url'
    const error = new Err_TaskExecution(task, 'error-execution', message)
    await browser.close()
    throw error
  }

  await page.goto(searchUrl)

  let totalPostings: number = 0
  try {
    totalPostings = await getOffersCount(page)
  } catch (e) {
    const message = e instanceof Error ? e.message : 'failed to count number of offers'
    const error = new Err_TaskExecution(task, 'error-execution', message)
    await browser.close()
    throw error
  }

  let buildId: string = ''
  try {
    buildId = await getBuildId(page)
  } catch (e) {
    const message = e instanceof Error ? e.message : 'failed to fetch build id for network listing'
    const error = new Err_TaskExecution(task, 'error-execution', message)
    await browser.close()
    throw error
  }

  const rawPostings: Array<PostingSearchItem> = []
  const totalPages = Math.ceil(totalPostings / 72)
  if (totalPages > 1) {
    for (let nextPage = 1; nextPage <= totalPages; nextPage++) {
      const result = await requestPageListing(page, task, buildId, nextPage).catch(error => {
        console.log({ error })
        return null
      })
      if (result !== null) rawPostings.push(...result)
      break
    }
  }

  await browser.close()
  const postings = rawPostings.map(item => parseResult(task, item))
  return { outcome: 'success', postings }
}
