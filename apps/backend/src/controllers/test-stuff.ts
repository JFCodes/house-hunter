import type { Request, Response } from 'express'
// App
import { EventQueue } from '../engine/event-queue'
import { SourcesData } from '../data'

export function controller(_: Request, res: Response) {
  const source0 = SourcesData.data[0]

  if (source0) {
    EventQueue.registerEvent({
      source: source0.source,
      args: source0.options,
      task: source0.task,
      retries: 0,
    })
  }

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
