export type T_EngineEventExecutionOutcome =
  | 'error-execution'
  | 'error-arguments'
  | 'success'

export type T_EngineEventExecution = {
  outcome: T_EngineEventExecutionOutcome
}
