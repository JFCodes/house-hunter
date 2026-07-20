import {
  type T_AdBuildingType,
  type T_AdType,
  E_AD_STATUS
} from '@house-hunter/data-model'
// App
import type { MessageSchema } from '@/i18n/locales/_schema'

const adBuildingType: Record<T_AdBuildingType, string> = {
  'single-house': 'Single house',
  'apartment': 'Apartment',
}
const adType: Record<T_AdType, string> = {
  'rent': 'rent',
  'buy': 'buy'
}

const adStatus: Record<E_AD_STATUS, string> = {
  [E_AD_STATUS.NEW]: 'New',
  [E_AD_STATUS.DELETED]: 'Deleted',
  [E_AD_STATUS.INTERESTING]: 'Interesting',
  [E_AD_STATUS.CONTACT_MADE]: 'Contacted',
  [E_AD_STATUS.PROPOSAL_MADE]: 'Proposal submitted',
  [E_AD_STATUS.PROPOSAL_ACCEPTED]: 'Proposal accepted',
  [E_AD_STATUS.PROPOSAL_REJECTED]: 'Proposal rejected',
  [E_AD_STATUS.COMPLETED]: 'Completed',
}

export default {
  global: {
    actions: 'Acções',
    active: 'Ativo',
    activeTask: 'Workflow a correr',
    area: 'Área',
    askingPrice: 'Preço',
    constructionYear: 'Ano de construção',
    dashboard: 'Dashboard',
    description: 'Descrição',
    discoveryAds: 'Procurar anúncios',
    location: 'Localização',
    history: 'Histórico',
    save: 'Guardar',
    status: 'Estado',
    stopped: 'Parado',
    swipe: 'Categorizar anúncios',
    tasks: 'Workflows',
    typology: 'Quartos',
    year: 'Ano',
  },
  pages: {
    ads: {
      tabs: {
        all: 'Todos',
      }
    },
    task: {
      discoveryTask: {
        trigger: 'Procurar anúncios',
        types: 'Tipos de anúncios'
      }
    },
    swipe: {
      emptyMessage1: 'Não há mais anúncios para classificar',
      emptyMessage2: `Não há mais anúncios no estado '{status}'`,
      postsLeft: 'Tem {count} anúncios para classificar',
      statusPicker: 'Seleciona o estado',
    }
  },
  empty: {
    noAdImages: 'Este anúncios não tem imagens',
  },
  notFound: {
    task: 'Workflow não encontrado',
  },
  tooltips: {
    targetLocation1: 'A opção localização depende das opçøes do site de pesquisa',
    targetLocation2: 'Consulta as informações relativas a este campo na documentação.',
  },
  toasts: {
    discoveryAdsTaskStarted: {
      message: `Workflow do tipo '{type}' no site {source} começou`,
      title: 'Workflow de pesquisa começou',
    },
    discoveryAdsTaskSuccess: {
      message: `Workflow do tipo '{type}' no site {source} terminou com sucess`,
      title: 'Workflow terminou com sucess',
    },
    discoveryAdsTaskError: {
      message: `Workflow do tipo '{type}' no site {source} terminou com um erro:`,
      title: 'Error no workflow',
    },
    adUpdateFailed: {
      message: `Nã0 foi possivel gravar as alterações`,
      title: 'Erro ao gravar',
    }
  },
  enums: {
    adBuildingType,
    adStatus,
    adType,
  }
} satisfies MessageSchema
