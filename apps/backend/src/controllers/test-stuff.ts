import type { Request, Response } from 'express'
// App
// import { EventQueue } from '../engine/event-queue'
import { TaskExecutionQueue } from '../tasks/execution-queue'
import { ActiveTasksData } from '../data'

export function controller(_: Request, res: Response) {
  const task0 = ActiveTasksData.data[0]!
  const task1 = ActiveTasksData.data[1]!

  TaskExecutionQueue.addTaskExecution({
    maxRetries: 0,
    startedAt: 0,
    task: task0,
    endedAt: 0
  })

  // TaskExecutionQueue.addTaskExecution({
  //   maxRetries: 0,
  //   startedAt: 0,
  //   task: task1,
  //   endedAt: 0
  // })


  // if (source0) {
  //   EventQueue.registerEvent({
  //     source: source0.source,
  //     args: source0.options,
  //     task: source0.task,
  //     retries: 0,
  //   })
  // }

  // const source1 = SourcesData.data[1]
  // if (source1) {
  //   EventQueue.registerEvent({
  //     source: source1.source,
  //     args: source1.options,
  //     task: source1.task,
  //     retries: 0,
  //   })
  // }

  res.status(200).end()
}
