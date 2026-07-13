import { websocket } from './client'
// Message handlers
import { onMessage as TaskStarted } from '@/websocket/on-messages/task-started'
import { onMessage as TaskEnded } from '@/websocket/on-messages/task-ended'
import { onMessage as OnConnected} from '@/websocket/on-messages/connected'
import { onMessage as OnPong } from '@/websocket/on-messages/on-pong'

export const unsubscribeSocket = websocket.onMessage(message => {
  console.log({ message })

  switch (message.type) {
    case 'task-started': return TaskStarted(message)
    case 'task-ended': return TaskEnded(message)
    case 'connected': return OnConnected()
    case 'pong': return OnPong()
  }
})
