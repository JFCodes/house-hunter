import type { T_AdBuildingType, T_AdType } from '../ad'

export type T_DiscoveryTypeOptions = {
  buildingTypes: Array<T_AdBuildingType>
  addType: T_AdType
  location: string 
}