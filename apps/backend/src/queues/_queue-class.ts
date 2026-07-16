import type { T_Execution, T_ExecutionResult } from '@house-hunter/data-model'
import { upsertAds } from '../database/entities/ad'

type ExecuteFunction<Task extends { id: string }>
  = (execution: T_Execution<Task>) => Promise<T_ExecutionResult>

export type QueueOptions<Task extends { id: string }> = {
  executeFunction: ExecuteFunction<Task>
  name: string
}

type QueuedExecution<Task extends { id: string }> = {
  execution: T_Execution<Task>
  addToQueueAt: number
  attempt: number
}

export class QueueClass<Task extends { id: string }> {
  readonly executeFunction: ExecuteFunction<Task>
  readonly name: string

  public activeExecution: null | QueuedExecution<Task> = null
  public queue: Array<QueuedExecution<Task>> = []
  public isExecuting = false

  constructor(options: QueueOptions<Task>) {
    this.executeFunction = options.executeFunction
    this.name = options.name
  }

  public queueTask (task: Task, maxRetries: number): void {
    if (maxRetries < 1) return

    this.registerExecution({
      registeredAt: new Date().getTime(),
      startedAt: null,
      duration: null,
      endedAt: null,
      result: null,
      maxRetries,
      task,
    })
  }

  public registerExecution (execution: T_Execution<Task>): void {
    // Don't duplicate tasks
    if (this.executionExists(execution)) return
    
    this.queue.push(this.seedQueueItem(execution))
    this.triggerTick()
  }

  private triggerTick (): void {
    if (this.isExecuting) return

    this.isExecuting = true
    this.tick().finally(() => { this.isExecuting = false })
  }

  private async tick (): Promise<void> {
    if (this.queue.length === 0) return

    let nextExecution = this.queue.shift()

    while (nextExecution) {
      this.activeExecution = nextExecution
      nextExecution.execution.startedAt = new Date().getTime()

      // Schedule to the end of event loop
      // This makes no op execution still wait for this.queue mutation in the meantime
      await new Promise(r => setTimeout(r, 0))

      //   broadcast({ type: 'task-started', payload: { task: nextExecution.taskExecution } })
      const result = await this.executeFunction(nextExecution.execution)
      console.log({ result })

      this.processExecutionResult(result)
      //   broadcast({ type: 'task-ended', payload: {
      //     task: nextExecution.taskExecution,
      //     result: {
      //       outcome: result.outcome,
      //       error: result.error
      //     }
      //   } })

    
      if (result.outcome !== 'success') {
        // No source or no task type errors do not re-schedule
        const isTaskSourceError = result.outcome === 'error-invalid-task-target'
        const isTaskTypeError = result.outcome === 'error-invalid-task'

        if (!isTaskSourceError && !isTaskTypeError) {
          nextExecution.attempt++
          const canRetry = nextExecution.attempt <= nextExecution.execution.maxRetries
          if (canRetry) this.queue.push(nextExecution)
        }
      } else {
        nextExecution.execution.endedAt = new Date().getTime()
      }

      this.activeExecution = null
      nextExecution = this.queue.shift()
    }
  }

  private executionExists (execution: T_Execution<Task>): boolean {
    const { id: taskId } = execution.task 

    if (this.activeExecution) {
      const activeId = this.activeExecution.execution.task.id
      if (activeId === taskId) return true
    }

    return this.queue.some(queueItem => queueItem.execution.task.id === taskId)
  }

  private seedQueueItem (execution: T_Execution<Task>): QueuedExecution<Task> {
    return {
      addToQueueAt: new Date().getTime(),
      execution,
      attempt: 0
    }
  }

  private processExecutionResult (result: T_ExecutionResult): void {
    if (result.outcome !== 'success') return

    // TODO
    if (result.data.upsert.length > 0) {
      try {
        upsertAds(result.data.upsert)
      } catch (error) {
        console.log({ error })
      }
      // console.log(result.data.upsert.length)
      // console.log('insert results!!!')
    }
  }
}
