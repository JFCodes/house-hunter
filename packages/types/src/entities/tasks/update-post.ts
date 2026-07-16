import { E_TASK_TYPE, type T_BaseTask } from './_base'

export type T_TASK_UpdatePost =
  T_BaseTask<E_TASK_TYPE.UPDATED_POSTING>
  & {
    options: {}
  }