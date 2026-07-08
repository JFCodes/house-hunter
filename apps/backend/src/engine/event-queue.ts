import { T_EngineEvent } from '@house-hunter/types'
// App
import { ExecuteEvent } from './execute-event'

type QueueEngineEventStatus = 'waiting' | 'executing'
type QueueEngineEvent = {
  event: T_EngineEvent<{}>
  // queue data
  status: QueueEngineEventStatus
  addedToQueueTime: number
  attempt: number
  id: string
}

class EventQueueClass {
  private queue: Array<QueueEngineEvent> = []
  activeEvent: null | QueueEngineEvent = null
  isProcessingEvent = false

  constructor () {}

  // On startup: launch initial tasks
  public initialize () {
    console.log('EventQueueClass initialize')
  }

  public registerEvent <Options extends object>(event: T_EngineEvent<Options>): void {
    // Doesn't duplicate events
    const existing = this.eventExists(event)
    if (existing) return

    const queueEvent = this.getQueuedEvent(event)
    this.queue.push(queueEvent)
    this.triggerTick()
  }

  // Private
  private triggerTick (): void {
    if (this.isProcessingEvent) return

    this.isProcessingEvent = true
    this
      .tick()
      .finally(() => { this.isProcessingEvent = false })
  }

  private async tick (): Promise<void> {
    if (this.queue.length === 0) return

    let nextEvent = this.queue.shift()
    while (nextEvent) {
      nextEvent.status = 'executing'
      
      this.activeEvent = nextEvent
      const success = await ExecuteEvent(nextEvent.event)
      
      // When an event fails, we re-add to the end of the queue
      // if the attempt is less or equal to the event retries
      if (!success) {
        nextEvent.attempt++
        const canRetry = nextEvent.attempt <= nextEvent.event.retries
        if (canRetry) this.queue.push(nextEvent)
      }

      this.activeEvent = null
      nextEvent = this.queue.shift()
    }
  }

  private eventExists <Options extends object> (toAdd: T_EngineEvent<Options>): undefined | QueueEngineEvent {
    const isSameEvent = (queueItem: QueueEngineEvent) => {
      const { event } = queueItem
      if (event.source !== toAdd.source) return false
      if (event.task !== toAdd.task) return false
      return true
    }

    if (this.activeEvent && isSameEvent(this.activeEvent)) return this.activeEvent
    return this.queue.find(isSameEvent)
  }

  private getQueuedEvent <Options extends object> (event: T_EngineEvent<Options>): QueueEngineEvent {
    return {
      addedToQueueTime: new Date().getTime(),
      id: crypto.randomUUID(),
      status: 'waiting',
      attempt: 0,
      event,
    }
  }
}

export const EventQueue = new EventQueueClass()
