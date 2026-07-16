import { T_Ad, T_DiscoveryTask } from '../entities'

export type T_API_Paginated<T> = {
  data: Array<T>
  total: number
  page: number
  size: number
}

export type T_API_RESPONSE_DiscoveryTasks = Array<T_DiscoveryTask>
export type T_API_RESPONSE_AdSearch = T_API_Paginated<T_Ad>
export type T_API_RESPONSE_Ping = { status: 'ok' }
export type T_API_RESPONSE_Ad = T_Ad
