import { F_IsSameTaskExecution } from '@house-hunter/functions'
import { T_TaskExecution } from '@house-hunter/types'
// App
import type { QueueTaskExecution } from './types'
import { ExecuteTask } from './execute'

class TaskExecutionQueueClass {
  private queue: Array<QueueTaskExecution> = []
  activeTaskExecution: null | QueueTaskExecution = null
  isProcessingTaskExecution = false

  // On startup: launch initial tasks
  public initialize () {
    console.log('EventQueueClass initialize')
  }

  public addTaskExecution (taskExecution: T_TaskExecution): void {
    // Don't duplicate events
    if (this.checkTaskExecutionExists(taskExecution)) return

    this.queue.push(this.getQueuedTaskExecution(taskExecution))
    this.triggerTick()
  }

  // Private
  private triggerTick (): void {
    if (this.isProcessingTaskExecution) return

    this.isProcessingTaskExecution = true
    this.tick().finally(() => { this.isProcessingTaskExecution = false })
  }

  private async tick (): Promise<void> {
    if (this.queue.length === 0) return

    let nextExecution = this.queue.shift()
    while (nextExecution) {
      this.activeTaskExecution = nextExecution

      // Schedule to the end of event loop
      // This makes no op execution still wait for this.queue mutation in the meantime
      await new Promise(r => setTimeout(r, 0))

      const result = await ExecuteTask(nextExecution.taskExecution)
      console.log(result.postings)
      
      if (result.outcome !== 'success') {
        // No source or no task type errors do not re-schedule
        const isTaskSourceError = result.outcome === 'error-invalid-task-source'
        const isTaskTypeError = result.outcome === 'error-invalid-task-type'
        if (!isTaskSourceError && !isTaskTypeError) {
          nextExecution.attempt++
          const canRetry = nextExecution.attempt <= nextExecution.taskExecution.maxRetries
          if (canRetry) this.queue.push(nextExecution)
        }
      }

      this.activeTaskExecution = null
      nextExecution = this.queue.shift()
    }
  }

  private checkTaskExecutionExists (execution: T_TaskExecution): boolean {
    if (this.activeTaskExecution) {
      if (F_IsSameTaskExecution(this.activeTaskExecution.taskExecution, execution)) return true
    }

    return this.queue.some(queued => F_IsSameTaskExecution(queued.taskExecution, execution))
  }

  private getQueuedTaskExecution (taskExecution: T_TaskExecution): QueueTaskExecution {
    return {
      id: crypto.randomUUID(),
      taskExecution,
      attempt: 0,
    }
  }
}

export const TaskExecutionQueue = new TaskExecutionQueueClass()
