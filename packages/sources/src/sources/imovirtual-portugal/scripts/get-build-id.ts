import { Page } from 'playwright'
// App
import { SELECTORS } from '../_constants'
import type { BuildScriptData } from '../_types'

export async function getBuildId (page: Page): Promise<string> {
  const locator = page.locator(SELECTORS.scripts.build)
  const content = await locator.innerText()

  try {
    const data = JSON.parse(content) as BuildScriptData
    return data.buildId
  } catch (error) {
    throw error
  }
}
