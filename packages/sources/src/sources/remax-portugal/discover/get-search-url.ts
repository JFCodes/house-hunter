import { T_DiscoveryTask, T_AdType, T_AdBuildingType } from '@house-hunter/data-model'
// App
import { BASE_URL } from '../_constants'

export function getSearchUrl (task: T_DiscoveryTask): string {

  let url = BASE_URL
  url += `/${getPostingOperationSegment(task.options.addType)}`
  url += '/imoveis'
  url += `/${getPostingTypesSegment(task.options.buildingTypes)}`
  if (task.options.location) url += `/${task.options.location}`

  return url
}

function getPostingOperationSegment (operation: T_AdType): string {
  switch (operation) {
    case 'rent': return 'arrendar'
    case 'buy': return 'comprar'
  }
}

function getPostingTypesSegment (types: Array<T_AdBuildingType>): string {
  if (types.length === 0) return `habitacao`

  const mapTypology = (typology: T_AdBuildingType): string => {
    switch (typology) {
      case 'single-house': return 'moradia'
      case 'apartment': return 'apartamento'
    }
  }

  return types.map(mapTypology).join(',')
}