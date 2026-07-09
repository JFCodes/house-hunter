import { E_TASK_SOURCE, T_Posting, T_Task, T_TaskExecution } from '@house-hunter/types';

type ReturnType = Pick<T_Posting, 'id' | 'sourceId' | 'source' | 'idWithSource'>;
declare function F_GetPostingIds(source: E_TASK_SOURCE, sourceId: number | string): ReturnType;

declare function F_IsSameTask(leftTask: T_Task, rightTask: T_Task): boolean;
declare function F_IsSameTaskExecution(leftExecution: T_TaskExecution, rightExecution: T_TaskExecution): boolean;

export { F_GetPostingIds, F_IsSameTask, F_IsSameTaskExecution };
