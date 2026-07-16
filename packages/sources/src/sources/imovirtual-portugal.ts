import type { T_DiscoveryTask, T_ExecutionResult } from '@house-hunter/data-model'
// App
import type { Source } from '../types/source-interface'
import { discoverScript } from './imovirtual-portugal/discover'

class SourceClass implements Source {
  async discover (task: T_DiscoveryTask): Promise<T_ExecutionResult>  {
    return discoverScript(task)
  }
}

export const ImovirtualPortugalSource = new SourceClass()
