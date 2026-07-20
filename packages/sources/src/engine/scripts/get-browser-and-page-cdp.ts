import type { ChildProcess } from 'child_process'
import { type Browser, type Page, chromium } from 'playwright'
// App
import { startChrome, CDP_ENDPOINT } from './get-browser-and-page-cdp/start-chrome'
import { waitForCDP } from './get-browser-and-page-cdp/wait-for-cdp'

type ReturnValue = {
  chromeProcess: ChildProcess
  browser: Browser,
  page: Page
}

export async function GetBrowserAndPageOverCdp (): Promise<ReturnValue> {
  const chromeProcess = startChrome()
  await waitForCDP(CDP_ENDPOINT)

  const browser = await chromium.connectOverCDP(CDP_ENDPOINT, {
    // Available in recent Playwright versions when Chrome and
    // Playwright run on the same machine.
    isLocal: true,
    timeout: 15_000,
  })

  const context = browser.contexts()[0]
  if (!context) throw new Error('No Chrome browser context was exposed over CDP')

  const page = context.pages()[0] ?? await context.newPage()

  return { chromeProcess, browser, page }
}
