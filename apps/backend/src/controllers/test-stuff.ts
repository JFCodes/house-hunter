import type { Request, Response } from 'express'
// App
import { EventQueue } from '../engine/event-queue'
import { SourcesData } from '../data'

export function controller(_: Request, res: Response) {
  const source = SourcesData.data[0]
  if (source) {
    EventQueue.registerEvent({
      source: source.source,
      args: source.options,
      task: source.task,
      retries: 0,
    })
  }

  res.status(200).end()
}
