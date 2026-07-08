import { chromium, type Browser, type Page } from 'playwright'
// App
import type { CrawlerGetBrowserOptions } from './types'

type ReturnType = { browser: Browser, page: Page }

export async function GetBrowser (options: CrawlerGetBrowserOptions): Promise<ReturnType> {
  const { url } = options

  const browser = await chromium.launch({ headless: false })
  const page = await browser.newPage({ viewport: { height: 1200, width: 1900 } })

  await page.goto(url, { waitUntil: 'networkidle' })

  return { browser, page }
}
