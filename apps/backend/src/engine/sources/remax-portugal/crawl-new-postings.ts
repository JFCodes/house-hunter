import { T_EngineEvent, T_EngineEventExecution } from '@house-hunter/types'
// App
import { ClickAllowCookiesBanner } from './_scripts/click-allow-cookies-banner'
import { GetBrowser } from '../../crawler/get-browser'
import { GET_BROWSER_CONFIG } from './_config'

export async function crawl(event: T_EngineEvent): Promise<T_EngineEventExecution> {
  const { browser, page } = await GetBrowser(GET_BROWSER_CONFIG)

  // Scrip
  await ClickAllowCookiesBanner(page)

  // Wait 30 seconds
  await new Promise(r => setTimeout(r, 30000))
  browser.close()
  return { outcome: 'success' }
}