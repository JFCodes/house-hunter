import type { T_DiscoveryTask, T_ExecutionResult } from '@house-hunter/data-model'
// App
import type { Source } from '../types/source-interface'
import { discoverScript } from './idealista-portugal/discover'

class SourceClass implements Source {

  async discover (task: T_DiscoveryTask): Promise<T_ExecutionResult>  {
    return discoverScript(task)
  }
}

export const IdealistaPortugalSource = new SourceClass()
