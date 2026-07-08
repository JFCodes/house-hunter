import { E_ENGINE_SOURCES } from '../server/engine-sources'
import { E_ENGINE_TASKS } from '../server/engine-tasks'
import type { T_PostingTypology, T_PostingType } from './posting'

export type T_Source = {
  source: E_ENGINE_SOURCES
  task: E_ENGINE_TASKS
  id: string
  options: {
    typologies: Array<T_PostingTypology>
    postingType: T_PostingType
    location: string
  }
}
