import type { T_DiscoveryTask, T_ExecutionResult } from '@house-hunter/data-model'

export interface Source {
  discover: (task: T_DiscoveryTask) => Promise<T_ExecutionResult>
}
