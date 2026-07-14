export enum E_ROUTER_PAGES {
  NOTIFICATIONS = 'notifications',
  SETTINGS = 'settings',

  POSTINGS = 'postings',
    POSTINGS_ALL = 'postings-all',
    POSTINGS_BY_STATUS = 'postings-by-status',


  TASKS = 'tasks',
    TASKS_CRAWL_NEW_POSTINGS = 'tasks-crawl-new-postings',
      TASKS_CRAWL_NEW_POSTINGS_TASK = 'tasks-crawl-new-postings-task',
    TASKS_LOGS = 'tasks-logs',
  
  HOME = 'home',
    HOME_DASHBOARD = 'home-dashboard',
    HOME_SWIPE = 'home-swipe',
}

export enum E_ROUTER_PARAMS {
  POSTING_STATUS = 'posting_status_id',
  TASK_ID = 'task_id'
}

export enum E_ROUTER_QUERIES {
  viewTable = 'view-table'
}

export const CONST_ROUTER_PATHS: Record<E_ROUTER_PAGES, string> = {
  [E_ROUTER_PAGES.NOTIFICATIONS]: '/notifications',
  [E_ROUTER_PAGES.SETTINGS]: '/settings',

  [E_ROUTER_PAGES.POSTINGS]: '/postings',
    [E_ROUTER_PAGES.POSTINGS_ALL]: '',
    [E_ROUTER_PAGES.POSTINGS_BY_STATUS]: `:${E_ROUTER_PARAMS.POSTING_STATUS}`,

  [E_ROUTER_PAGES.TASKS]: '/tasks',
    [E_ROUTER_PAGES.TASKS_CRAWL_NEW_POSTINGS]: '/crawl-new-postings',
      [E_ROUTER_PAGES.TASKS_CRAWL_NEW_POSTINGS_TASK]: `:${E_ROUTER_PARAMS.TASK_ID}`,
    [E_ROUTER_PAGES.TASKS_LOGS]: 'logs',
    
  [E_ROUTER_PAGES.HOME]: '/',
    [E_ROUTER_PAGES.HOME_DASHBOARD]: 'dashboard',
    [E_ROUTER_PAGES.HOME_SWIPE]: 'swipe',
}
