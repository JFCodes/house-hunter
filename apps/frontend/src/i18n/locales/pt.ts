import {
  type T_PostingOperation,
  type T_PostingType,
  E_POSTING_USER_STATUS,
  E_TASK_TYPE,
} from '@house-hunter/types'
// App
import type { MessageSchema } from '@/i18n/locales/_schema'

// cSpell:disable
const postingType: Record<T_PostingType, string> = {
  'apartment': 'Apartamento',
  'single-home': 'Moradia'
}

const taskType: Record<E_TASK_TYPE, string> = {
  [E_TASK_TYPE.CRAWL_NEW_POSTINGS]: 'procurar anúncios novos',
  [E_TASK_TYPE.UPDATED_POSTING]: 'atualizar anúncio'
}

const postingOperation: Record<T_PostingOperation, string> = {
  'rent': 'alugar',
  'buy': 'comprar'
}

const postingStatus: Record<E_POSTING_USER_STATUS, string> = {
  [E_POSTING_USER_STATUS.NEW]: 'Novo',
  [E_POSTING_USER_STATUS.DISMISS]: 'Ignorado',
  [E_POSTING_USER_STATUS.INTERESTING]: 'Interessante',
  [E_POSTING_USER_STATUS.CONTACT_MADE]: 'Contactado',
  [E_POSTING_USER_STATUS.PROPOSAL_MADE]: 'Proposta submetida',
  [E_POSTING_USER_STATUS.PROPOSAL_ACCEPTED]: 'Poposta aceite',
  [E_POSTING_USER_STATUS.PROPOSAL_REJECTED]: 'Poposta rejeitada',
  [E_POSTING_USER_STATUS.BOUGHT]: 'Comprada',
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
    postings: {
      tabs: {
        all: 'Todos',
      }
    },
    task: {
      crawling: {
        triggerCrawl: 'Procurar anúncios',
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
    noPostingImages: 'Este anúncios não tem imagens',
  },
  notFound: {
    task: 'Workflow não encontrado',
  },
  tooltips: {
    crawlNewPostingLocation1: 'A opção localização depende das opçøes do site de pesquisa',
    crawlNewPostingLocation2: 'Consulta as informações relativas a este campo na documentação.',
  },
  toasts: {
    taskStarted: {
      message: `Workflow do tipo '{type}' no site {source} começou`,
      title: 'Workflow de pesquisa começou',
    },
    taskEndedSuccess: {
      message: `Workflow do tipo '{type}' no site {source} terminou com sucess`,
      title: 'Workflow terminou com sucess',
    },
    taskEndedError: {
      message: `Workflow do tipo '{type}' no site {source} terminou com um erro:`,
      title: 'Error no workflow',
    },
    postingUpdateFailed: {
      message: `Nã0 foi possivel gravar as alterações`,
      title: 'Erro ao gravar',
    }
  },
  enums: {
    postingOperation,
    postingStatus,
    postingType,
    taskType
  }
} satisfies MessageSchema
