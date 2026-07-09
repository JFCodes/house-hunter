import type { E_TASK_SOURCE, T_Posting, T_Task } from '@house-hunter/types'

type ReturnType = Pick<T_Posting, 'id' | 'sourceId' | 'source' | 'idWithSource'>

export function F_GetPostingIds (source: E_TASK_SOURCE, sourceId: number | string): ReturnType {
  return {
    idWithSource: `${source.toUpperCase()}-${sourceId}`,
    sourceId: String(sourceId),
    id: crypto.randomUUID(),
    source,
  }
}