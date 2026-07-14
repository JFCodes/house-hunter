import { E_TASK_SOURCE } from '@house-hunter/types'
// App
import type { Source } from './types/source-interface'
// Sources
import { ImovirtualPortugalSource } from './sources/imovirtual-portugal'
import { IdealistaPortugalSource } from './sources/idealista-portugal'
import { RemaxPortugalSource } from './sources/remax-portugal'

export const SOURCES_MAP: Record<E_TASK_SOURCE, Source> = {
  [E_TASK_SOURCE.IMOVIRTUAL_PORTUGAL]: ImovirtualPortugalSource,
  [E_TASK_SOURCE.IDEALISTA_PORTUGAL]: IdealistaPortugalSource,
  [E_TASK_SOURCE.REMAX_PORTUGAL]: RemaxPortugalSource
}
