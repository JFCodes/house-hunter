import { T_TaskCrawlNewPostings, T_TaskExecutionResult, T_TaskUpdatePosting, E_TASK_SOURCE } from '@house-hunter/types';

interface Source {
    crawlNewPostings: (task: T_TaskCrawlNewPostings) => Promise<T_TaskExecutionResult>;
    updatePosting: (task: T_TaskUpdatePosting) => Promise<T_TaskExecutionResult>;
}

declare const SOURCES_MAP: Record<E_TASK_SOURCE, Source>;

export { SOURCES_MAP };
