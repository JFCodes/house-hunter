import { E_ENGINE_SOURCES, E_ENGINE_TASKS, T_Source } from '@house-hunter/types'
import { F_Validator_PostingType } from '@house-hunter/functions'
// App
import type { ExecutionError } from '../../../execute-event'

export function GetValidatedOptions (options: any): T_Source['options'] {
  const throwError = (message: string): void => {
    const details = `[${E_ENGINE_SOURCES.REMAX_PORTUGAL}] [${E_ENGINE_TASKS.CRAWL_NEW_POSTINGS}]: ${message}`
    const error: ExecutionError = { outcome: 'error-arguments', details }
    throw error
  }

  if (!options) throwError('invalid crawl options')
  if (typeof options !== 'object') throwError('invalid crawl options')
  if (Array.isArray(options)) throwError('invalid crawl options')

  const location = options.location
  if (typeof location !== 'string') throwError('missing or invalid location option')
  if (!location.trim()) throwError('missing or invalid location option')

  const postingType = options.postingType
  if (typeof postingType !== 'string') throwError('missing or invalid posting type option')
  if (!F_Validator_PostingType(postingType)) throwError('missing or invalid posting type option')

  const typologies = options.typologies
  if (!Array.isArray(typologies)) throwError('missing or invalid typology option')
  const nonStringOrEmpty = typologies.some((t: unknown) => typeof t !== 'string' || !t.trim())
  if (nonStringOrEmpty) throwError('missing or invalid typology option')

  return {
    postingType,
    typologies,
    location,
  }
}
