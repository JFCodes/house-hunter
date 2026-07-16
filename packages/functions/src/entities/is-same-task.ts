import {
  E_TASK_TYPE,
  type T_TASK_CrawlNewPostings,
  type T_TASK_UpdatePost,
  type T_TaskExecution,
  type T_AnyTask,
  E_ERROR_TYPES,
} from '@house-hunter/types'


export function F_IsSameTask (leftTask: T_AnyTask, rightTask: T_AnyTask): boolean {
  if (leftTask.source !== rightTask.source) return false
  if (leftTask.type !== rightTask.type) return false

  switch (leftTask.type) {
    case E_TASK_TYPE.CRAWL_NEW_POSTINGS: return isSameCrawlNewPostTask(leftTask, rightTask as T_TASK_CrawlNewPostings)
    case E_TASK_TYPE.UPDATED_POSTING: return isSameUpdatePostTask(leftTask, rightTask as T_TASK_UpdatePost)
  }
}

export function F_IsSameTaskExecution (leftExecution: T_TaskExecution, rightExecution: T_TaskExecution): boolean {
  return F_IsSameTask(leftExecution.task, rightExecution.task)
}

function isSameCrawlNewPostTask (leftTask: T_TASK_CrawlNewPostings, rightTask: T_TASK_CrawlNewPostings): boolean {
  const { options: leftOptions } = leftTask
  const { options: rightOptions } = rightTask
  if (leftOptions.postingOperation !== rightOptions.postingOperation) return false
  if (leftOptions.location !== rightOptions.location) return false

  const rightPostingTypes = rightOptions.postingTypes.sort().join(',')
  const leftPostingTypes = leftOptions.postingTypes.sort().join(',')
  if (leftPostingTypes !== rightPostingTypes) return false

  return true
}

function isSameUpdatePostTask (leftTask: T_TASK_UpdatePost, rightTask: T_TASK_UpdatePost): boolean {
  return true
}