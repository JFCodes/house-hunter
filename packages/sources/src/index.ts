import { E_TARGET } from '@house-hunter/data-model'
// App
import type { Source } from './types/source-interface'
// Sources
import { ImovirtualPortugalSource } from './sources/imovirtual-portugal'
import { IdealistaPortugalSource } from './sources/idealista-portugal'
import { RemaxPortugalSource } from './sources/remax-portugal'

export const SOURCES_MAP: Record<E_TARGET, Source> = {
  [E_TARGET.IMOVIRTUAL_PORTUGAL]: ImovirtualPortugalSource,
  [E_TARGET.IDEALISTA_PORTUGAL]: IdealistaPortugalSource,
  [E_TARGET.REMAX_PORTUGAL]: RemaxPortugalSource
}
