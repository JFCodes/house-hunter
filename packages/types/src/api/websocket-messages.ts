import { T_TaskExecution, T_TaskExecutionResult } from "../server"

// Client side messages
export type T_API_WEBSOCKET_ClientMessage_Ping = { type: 'ping' }
export type T_API_WEBSOCKET_ClientMessages =
  | T_API_WEBSOCKET_ClientMessage_Ping

// Server side messages
export type T_API_WEBSOCKET_ServerMessage_TaskEnded   = { type: 'task-ended',     payload: { task: T_TaskExecution, result: Omit<T_TaskExecutionResult, 'postings'> } }
export type T_API_WEBSOCKET_ServerMessage_Connected   = { type: 'connected',      payload: { clientId: string } }
export type T_API_WEBSOCKET_ServerMessage_TaskStarted = { type: 'task-started',   payload: { task: T_TaskExecution } }
export type T_API_WEBSOCKET_ServerMessage_Pong        = { type: 'pong' }
export type T_API_WEBSOCKET_ServerMessages =
  | T_API_WEBSOCKET_ServerMessage_TaskStarted
  | T_API_WEBSOCKET_ServerMessage_TaskEnded
  | T_API_WEBSOCKET_ServerMessage_Connected
  | T_API_WEBSOCKET_ServerMessage_Pong
