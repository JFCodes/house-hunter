import {} from '@house-hunter/types'
import type { Request, Response } from 'express'
// App
import { TaskExecutionQueue } from '../../../tasks/execution-queue'
import { ActiveTasksData } from '../../../data'

export function controller(req: Request, res: Response) {
  const taskId = req.params.taskId
  if (typeof taskId !=='string' || !taskId) return res.sendStatus(400)

  const task = ActiveTasksData.getRecord(taskId)
  if (!task) return res.sendStatus(404)

  TaskExecutionQueue.addTaskExecution({
    maxRetries: 0,
    startedAt: 0,
    endedAt: 0,
    task,
  })

  res.status(200).end()
}
