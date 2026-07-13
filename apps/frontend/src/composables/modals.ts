import type { T_Posting } from '@house-hunter/types'
// App
import { useModalsStore } from '@/stores/modals'
import type { ModalPostingProps } from '@/components/modals/_types'
// Components
import PostingModal from '@/components/modals/m-posting.vue'

export function useModals () {
  const modalsStore = useModalsStore()

  const showPostingsModal = (posting: T_Posting): void => {
    modalsStore.launch<ModalPostingProps, null>(PostingModal, { posting })
  }

  return {
    showPostingsModal
  }
}
