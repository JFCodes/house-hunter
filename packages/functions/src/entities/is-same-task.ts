import { E_TASK_TYPE, T_Task, T_TaskExecution } from '@house-hunter/types'

export function F_IsSameTask (leftTask: T_Task, rightTask: T_Task): boolean {
  if (leftTask.source !== rightTask.source) return false

  if (leftTask.type === E_TASK_TYPE.CRAWL_NEW_POSTINGS && rightTask.type === E_TASK_TYPE.CRAWL_NEW_POSTINGS) {
    const { options: leftOptions } = leftTask
    const { options: rightOptions } = rightTask
    if (leftOptions.postingOperation !== rightOptions.postingOperation) return false
    if (leftOptions.location !== rightOptions.location) return false

    const rightPostingTypes = rightOptions.postingTypes.sort().join(',')
    const leftPostingTypes = leftOptions.postingTypes.sort().join(',')
    if (leftPostingTypes !== rightPostingTypes) return false
  }

  if (leftTask.type === E_TASK_TYPE.UPDATED_POSTING && rightTask.type === E_TASK_TYPE.UPDATED_POSTING) {
    // TODO: check updated posting options
  }


  return true
}

export function F_IsSameTaskExecution (leftExecution: T_TaskExecution, rightExecution: T_TaskExecution): boolean {
  return F_IsSameTask(leftExecution.task, rightExecution.task)
}
