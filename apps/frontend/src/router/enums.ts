export enum E_ROUTER_PAGES {
  NOTIFICATIONS = 'notifications',
  SETTINGS = 'settings',

  TASKS = 'tasks',
    TASKS_CRAWL_NEW_POSTINGS = 'tasks-crawl-new-postings',
      TASKS_CRAWL_NEW_POSTINGS_TASK = 'tasks-crawl-new-postings-task',
    TASKS_LOGS = 'tasks-logs',
  
  HOME = 'home',
}

export enum E_ROUTER_PARAMS {
  TASK_ID = 'task_id'
}

export enum E_ROUTER_QUERIES {}

export const CONST_ROUTER_PATHS: Record<E_ROUTER_PAGES, string> = {
  [E_ROUTER_PAGES.NOTIFICATIONS]: '/notifications',
  [E_ROUTER_PAGES.SETTINGS]: '/settings',

  [E_ROUTER_PAGES.TASKS]: '/tasks',
    [E_ROUTER_PAGES.TASKS_CRAWL_NEW_POSTINGS]: '/crawl-new-postings',
      [E_ROUTER_PAGES.TASKS_CRAWL_NEW_POSTINGS_TASK]: `:${E_ROUTER_PARAMS.TASK_ID}`,
    [E_ROUTER_PAGES.TASKS_LOGS]: 'logs',
    
  [E_ROUTER_PAGES.HOME]: '/'
}
