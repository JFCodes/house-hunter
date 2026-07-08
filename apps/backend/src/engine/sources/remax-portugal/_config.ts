// App
import type { CrawlerGetBrowserOptions } from '../../crawler/types'

export const GET_BROWSER_CONFIG: CrawlerGetBrowserOptions = {
  url: 'https://remax.pt/pt'
}

export const SELECTORS = {
  cookieBanner: {
    banner: '#CybotCookiebotDialog',
    allowButton: '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelection',
  }
}
