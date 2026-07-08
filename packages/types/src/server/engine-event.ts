import { E_ENGINE_SOURCES } from './engine-sources'
import { E_ENGINE_TASKS } from './engine-tasks'

export type T_EngineEvent<Options extends object> = {
  source: E_ENGINE_SOURCES
  task: E_ENGINE_TASKS
  retries: number
  args: Options
}
