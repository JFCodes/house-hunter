export enum E_ROUTER_PAGES {
  NOTIFICATIONS = 'notifications',
  SETTINGS = 'settings',

  DISCOVERY_TASKS = 'discovery-tasks',
    DISCOVERY_TASKS_LIST = 'discovery-tasks-list',
      DISCOVERY_TASKS_LIST_TASK = 'discovery-tasks-list-task',
  
  ADS = 'ads',
    ADS_ALL = 'ads-all',
    ADS_BY_STATUS = 'ads-by-status',

  HOME = 'home',
    HOME_DASHBOARD = 'home-dashboard',
    HOME_SWIPE = 'home-swipe',
}

export enum E_ROUTER_PARAMS {
  AD_STATUS = 'ad_status',
  TASK_ID = 'task_id'
}

export enum E_ROUTER_QUERIES {
  viewTable = 'view-table'
}

export const CONST_ROUTER_PATHS: Record<E_ROUTER_PAGES, string> = {
  [E_ROUTER_PAGES.NOTIFICATIONS]: '/notifications',
  [E_ROUTER_PAGES.SETTINGS]: '/settings',

  [E_ROUTER_PAGES.ADS]: '/ads',
    [E_ROUTER_PAGES.ADS_ALL]: '',
    [E_ROUTER_PAGES.ADS_BY_STATUS]: `:${E_ROUTER_PARAMS.AD_STATUS}`,

  [E_ROUTER_PAGES.DISCOVERY_TASKS]: '/discovery-tasks',
    [E_ROUTER_PAGES.DISCOVERY_TASKS_LIST]: '',
      [E_ROUTER_PAGES.DISCOVERY_TASKS_LIST_TASK]: `:${E_ROUTER_PARAMS.TASK_ID}`,

  [E_ROUTER_PAGES.HOME]: '/',
    [E_ROUTER_PAGES.HOME_DASHBOARD]: 'dashboard',
    [E_ROUTER_PAGES.HOME_SWIPE]: 'swipe',
}
