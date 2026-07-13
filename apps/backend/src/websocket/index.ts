import { type Server, WebSocket } from 'ws'
import http from 'http'
import type {
  T_API_WEBSOCKET_ServerMessage_Connected,
  T_API_WEBSOCKET_ClientMessages,
  T_API_WEBSOCKET_ServerMessages,
} from '@house-hunter/types'

export function initializeWebSocket (
  websocketServer: Server<typeof WebSocket, typeof http.IncomingMessage>
): void {
  websocketServer.on('connection', (socket, request) => {
    const clientId = crypto.randomUUID()
    console.log(`WebSocket client connected: ${clientId}`)
    console.log(`Client address: ${request.socket.remoteAddress}`)

    const connectedMessage: T_API_WEBSOCKET_ServerMessage_Connected = {
      payload: { clientId },
      type: 'connected',
    }
    sendMessage(socket, connectedMessage)

    socket.on('message', rawData => {
      const parsed = parseClientMessage(rawData)
      if (!parsed) return

      switch (parsed.type) {
        case 'ping':
          sendMessage(socket, { type: 'pong' })
      }
    })
  })
}

function parseClientMessage(data: WebSocket.RawData): T_API_WEBSOCKET_ClientMessages | null {
  try {
    return JSON.parse(data.toString()) as T_API_WEBSOCKET_ClientMessages
  } catch {
    return null
  }
}

function sendMessage(socket: WebSocket, message: T_API_WEBSOCKET_ServerMessages): void {
  if (socket.readyState !== WebSocket.OPEN) return
  socket.send(JSON.stringify(message))
}

