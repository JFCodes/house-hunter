import type { T_Ad } from '@house-hunter/data-model'
// App
import { useModalsStore } from '@/stores/modals'
import type { ModalAdProps } from '@/components/modals/_types'
// Components
import AdModal from '@/components/modals/m-ad.vue'

export function useModals () {
  const modalsStore = useModalsStore()

  const showAdModal = (ad: T_Ad): void => {
    modalsStore.launch<ModalAdProps, null>(AdModal, { ad })
  }

  return {
    showAdModal
  }
}
