import type { T_DiscoveryTask, T_ExecutionResult } from '@house-hunter/data-model'
// App
import type { Source } from '../types/source-interface'

class SourceClass implements Source {

  async discover (task: T_DiscoveryTask): Promise<T_ExecutionResult>  {
    console.log('IdealistaPortugalSource:discover')
    return {
      data: { upsert: [] },
      outcome: 'success',
    }
  }
}

export const IdealistaPortugalSource = new SourceClass()
