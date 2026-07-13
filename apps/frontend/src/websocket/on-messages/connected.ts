// App
import { websocket } from '@/websocket/client'
import { useToastsStore } from '@/stores/toasts'

export function onMessage (): void {
  websocket.send({ type: 'ping' })
  
  useToastsStore().launch({
    title: 'Websocket connected',
    type: 'success',
    messages: []
  })
}