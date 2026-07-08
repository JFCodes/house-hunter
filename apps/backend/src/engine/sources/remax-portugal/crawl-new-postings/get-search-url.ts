import { T_PostingTypology, T_Source } from '@house-hunter/types'
import { BASE_URL } from '../_config'

export function getSearchUrl (options: T_Source['options']): string {
  console.log(options)
  
  const getPostingTypeSegment = (): string => {
    switch(options.postingType) {
      case 'buy': return 'comprar'
      case 'rent': return 'arrendar'
    }
  }

  const getTypologySegment = (): string => {
    if (options.typologies.length === 0) return `habitacao`
    const mapTypology = (typology: T_PostingTypology): string => {
      switch (typology) {
        case 'single-home': return 'moradia'
        case 'apartment': return 'apartamento'
      }
    }

    return options.typologies.map(mapTypology).join(',')
  }

  let url = BASE_URL
  url += `/${getPostingTypeSegment()}/imoveis`
  url += `/${getTypologySegment()}`
  if (options.location) url += `/${options.location}`

  return url
}
