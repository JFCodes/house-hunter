import type { Browser, Page } from 'playwright'
// App
import { GetBrowserAndPage } from '../../../engine'
import { SELECTORS, BASE_URL } from '../_constants'

export async function initializeBrowsing (): Promise<{ browser: Browser, page: Page }> {
  const { browser, page } = await GetBrowserAndPage()

  await page.goto(BASE_URL, { waitUntil: 'networkidle' })

  // Handle cookies banner
  const banner = page.locator(SELECTORS.cookieBanner.banner)
  if (await banner.isVisible()) {
    const button = banner.locator(SELECTORS.cookieBanner.allowButton)

    await button.waitFor({ state: 'visible' })
    await button.click()
    await banner.waitFor({ state: 'hidden' })
  }

  return { browser, page }
}