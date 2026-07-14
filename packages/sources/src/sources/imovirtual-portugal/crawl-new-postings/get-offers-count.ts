import { Page } from 'playwright'
// App
import type { DataScriptContent } from '../_types'
import { SELECTORS } from '../_constants'

export async function getOffersCount (page: Page): Promise<number> {
  const locator = page.locator(SELECTORS.scripts.offersData)
  const content = await locator.innerText()

  try {
    const data = JSON.parse(content) as DataScriptContent
    const offerCount = data['@graph'][1].offers?.offerCount

    if (!offerCount) throw new Error('failed to count number of offers')

    const count = Number(offerCount)
    if (isNaN(count) || !isFinite(count)) throw new Error('failed to parse number of offers')

    return count
  } catch (error) {
    throw error
  }
}
