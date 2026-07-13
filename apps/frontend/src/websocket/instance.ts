import { websocket } from './client'
// Message handlers
import { onMessage as OnConnected} from '@/websocket/on-messages/connected'
import { onMessage as OnPong } from '@/websocket/on-messages/on-pong'

export const unsubscribeSocket = websocket.onMessage(message => {
  switch (message.type) {
    case 'connected': return OnConnected()
    case 'pong': return OnPong()
  }
})