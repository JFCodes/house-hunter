import { Page } from 'playwright'
// App
import { SELECTORS } from '../_config'

export async function ClickAllowCookiesBanner (page: Page): Promise<void> {
  const banner = page.locator(SELECTORS.cookieBanner.banner)
  if (!banner || !banner.isVisible()) return

  await page.waitForSelector(SELECTORS.cookieBanner.allowButton)
  const button = banner.locator(SELECTORS.cookieBanner.allowButton)

  await button.waitFor({ state: 'visible' })
  await button.click()
  await button.waitFor({ state: 'detached' })
}
