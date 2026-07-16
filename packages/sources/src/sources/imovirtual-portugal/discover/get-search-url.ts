import type { T_DiscoveryTask, T_AdBuildingType, T_AdType } from '@house-hunter/data-model'
// App
import { BASE_URL } from '../_constants'

// https://www.imovirtual.com/pt/resultados/comprar/moradia/leiria/leiria
// https://www.imovirtual.com/pt/resultados/arrendar/moradia/leiria/leiria

export function getSearchUrl (task: T_DiscoveryTask): string {

  let url = `${BASE_URL}/resultados`
  url += `/${getAddType(task.options.postingOperation)}`
  url += `/${getAddBuildingType(task.options.postingTypes)}`
  if (task.options.location) url += `/${task.options.location}`
  url += `?limit=72` // Max supported

  return url
}

function getAddType (adType: T_AdType): string {
  switch (adType) {
    case 'rent': return 'arrendar'
    case 'buy': return 'comprar'
  }
}

function getAddBuildingType (types: Array<T_AdBuildingType>): string {
  if (types.length === 0) throw new Error('Imovirtual requires one posting type segment')

  const mapTypology = (typology: T_AdBuildingType): string => {
    switch (typology) {
      case 'single-house': return 'moradia'
      case 'apartment': return 'apartamento'
    }
  }

  return types.map(mapTypology).join(',')
}