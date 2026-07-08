// App
import type { CrawlerGetBrowserOptions } from '../../crawler/types'

export const BASE_URL = 'https://remax.pt/pt'
export const BASE_IMAGE_URL = 'https://i.maxwork.pt/l-feat'

export const GET_BROWSER_CONFIG: CrawlerGetBrowserOptions = {
  url: BASE_URL,
}

export const SELECTORS = {
  cookieBanner: {
    banner: '#CybotCookiebotDialog',
    allowButton: '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelection',
  }
}
