 import { T_DiscoveryTaskPatch, T_AdPatch } from '../entities' 

export type T_API_Pagination = {
  page: number
  size: number
}

export type T_API_PAYLOAD_PatchAd = T_AdPatch
export type T_API_PAYLOAD_PatchDiscoveryTask = T_DiscoveryTaskPatch
