import { E_ENGINE_SOURCES } from '../server/engine-sources'
import { E_ENGINE_TASKS } from '../server/engine-tasks'

export type T_Source = {
  source: E_ENGINE_SOURCES
  task: E_ENGINE_TASKS
  id: string
  options: {
    location: string
  }
}
