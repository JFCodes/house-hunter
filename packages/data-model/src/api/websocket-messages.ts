import type {
  T_ExecutionResult,
  T_DiscoveryTask,
  T_Execution,
} from '../entities'

// Client side messages
export type T_API_WEBSOCKET_ClientMessage_Ping = { type: 'ping' }
export type T_API_WEBSOCKET_ClientMessages =
  | T_API_WEBSOCKET_ClientMessage_Ping


// Server side messages
export type T_API_WEBSOCKET_ServerMessage_DiscoveryTask_Execution_Ended = {
  type: 'discovery-task-execution-ended',
  payload: {
    result: Omit<T_ExecutionResult, 'data'>
    execution: T_Execution<T_DiscoveryTask>,
  }
}

export type T_API_WEBSOCKET_ServerMessage_DiscoveryTask_Execution_Started = {
  type: 'discovery-task-execution-started',
  payload: {
    execution: T_Execution<T_DiscoveryTask>
  }
}

export type T_API_WEBSOCKET_ServerMessage_Connected = { type: 'connected', payload: { clientId: string } }
export type T_API_WEBSOCKET_ServerMessage_Pong = { type: 'pong' }
export type T_API_WEBSOCKET_ServerMessages =
  | T_API_WEBSOCKET_ServerMessage_DiscoveryTask_Execution_Started
  | T_API_WEBSOCKET_ServerMessage_DiscoveryTask_Execution_Ended
  | T_API_WEBSOCKET_ServerMessage_Connected
  | T_API_WEBSOCKET_ServerMessage_Pong
