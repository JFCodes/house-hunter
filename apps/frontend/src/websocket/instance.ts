import { websocket } from './client'
// Message handlers
import { onMessage as TaskStarted } from '@/websocket/on-messages/discovery-task-execution-started'
import { onMessage as TaskEnded } from '@/websocket/on-messages/discovery-task-execution-ended'
import { onMessage as OnConnected} from '@/websocket/on-messages/connected'
import { onMessage as OnPong } from '@/websocket/on-messages/on-pong'

export const unsubscribeSocket = websocket.onMessage(message => {
  switch (message.type) {
    case 'discovery-task-execution-started': return TaskStarted(message)
    case 'discovery-task-execution-ended': return TaskEnded(message)
    case 'connected': return OnConnected()
    case 'pong': return OnPong()
  }
})
