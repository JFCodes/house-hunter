export enum E_ROUTER_PAGES {
  SETTINGS = 'settings',
  HOME = 'home',
}

export enum E_ROUTER_PARAMS {}

export enum E_ROUTER_QUERIES {}

export const CONST_ROUTER_PATHS: Record<E_ROUTER_PAGES, string> = {
  [E_ROUTER_PAGES.SETTINGS]: '/settings',
  [E_ROUTER_PAGES.HOME]: '/'
}
