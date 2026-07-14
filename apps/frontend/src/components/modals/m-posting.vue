<script setup lang="ts">
import { E_POSTING_USER_STATUS } from '@house-hunter/types'
import { computed, onMounted, ref } from 'vue'
// App
import type { ModalPostingReturnType, ModalPostingProps } from '@/components/modals/_types'
import type { InjectedProps } from '@/stores/modals'
import { usePostingsStore } from '@/stores/postings'
// Components
import CompEntityPostingStatusPicker from '@/components/entities/posting/status-picker.vue'
import CompEntityPostingImageGallery from '@/components/entities/posting/image-gallery.vue'
import CompEntityPostingSourceBadge from '@/components/entities/posting/source-badge.vue'
import CompUiButton from '@/components/ui/ui-button.vue'
import ModalsBase from '@/components/modals/m-base.vue'

const props = defineProps<ModalPostingProps & InjectedProps<ModalPostingReturnType>>()

const postingsStore = usePostingsStore()

const editableStatus = ref<E_POSTING_USER_STATUS>(E_POSTING_USER_STATUS.NEW)
const isLoading = ref(false)

const canSave = computed(() => {
  if (editableStatus.value !== props.posting._houseHunterFields.userStatus) return true
})

const save = async () => {
  isLoading.value = true
  postingsStore
    .updateHunterFields(props.posting.id, { userStatus: editableStatus.value })
    .then(() => props.closeModal(null))
    .finally(() => isLoading.value = false)
}

onMounted(() => {
  editableStatus.value = props.posting._houseHunterFields.userStatus
})
</script>

<template>
  <ModalsBase
    close-on-escape-press
    :is-loading="isLoading"
    :width="1220"
    @overlay-click="closeModal(null)"
    @close="closeModal(null)">

    <template #header>
      <div class="header">
        <div class="hh-group">
          <CompEntityPostingSourceBadge :source="posting.source" />
          <p>{{ posting.sourceId }}</p>
          <p>{{ posting.description }}</p>
        </div>

        <CompEntityPostingStatusPicker
          :active-status="editableStatus"
          @status-change="status => editableStatus = status" />
      </div>
    </template>

    <template #content>
      <div class="content">
        <CompEntityPostingImageGallery :images="posting.images" />
        <div>
          right side content
        </div>
      </div>
    </template>

    <template #footer>
      <div class="hh-group hh-group--end">
        <CompUiButton :label="$t('global.save')" :disabled="!canSave" @click="save" />
      </div>
    </template>
  </ModalsBase>
</template>

<style lang="scss" scoped>
.header {
  padding-right: var(--spacing-2xl);
  justify-content: space-between;
  align-items: center;
  display: flex;
}

.content {
  grid-template-columns: auto 1fr;
  padding: var(--spacing-sm);
  gap: var(--spacing-md);
  display: grid;
}
</style>
