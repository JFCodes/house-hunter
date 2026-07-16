import type { T_DiscoveryTask } from '@house-hunter/data-model'
// App
import { QueueClass, type QueueOptions } from './_queue-class'
import { ExecuteTask } from './discovery-task/execute-task'

export class DiscoveryTasksQueueClass extends QueueClass<T_DiscoveryTask> {
  constructor(options: QueueOptions<T_DiscoveryTask>) {
    super(options)
    this.initialize()
  }

  // TODO: on startup: launch initial tasks
  public initialize () {
    console.log('DiscoveryTasksQueue initialize')
  }
}

export const DiscoveryTasksQueue = new DiscoveryTasksQueueClass({
  name: 'Discovery tasks queue',
  executeFunction: ExecuteTask
})
