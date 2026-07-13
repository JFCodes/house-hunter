// Client side messages
export type T_API_WEBSOCKET_ClientMessage_Ping = { type: 'ping' }
export type T_API_WEBSOCKET_ClientMessages =
  | T_API_WEBSOCKET_ClientMessage_Ping

// Server side messages
export type T_API_WEBSOCKET_ServerMessage_Pong = { type: 'pong' }
export type T_API_WEBSOCKET_ServerMessage_Connected = { type: 'connected', payload: { clientId: string } }
export type T_API_WEBSOCKET_ServerMessages =
  | T_API_WEBSOCKET_ServerMessage_Pong
  | T_API_WEBSOCKET_ServerMessage_Connected
