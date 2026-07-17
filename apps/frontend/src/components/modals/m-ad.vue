<script setup lang="ts">
import { E_AD_STATUS } from '@house-hunter/data-model'
import { computed, onMounted, ref } from 'vue'
// App
import type { ModalAdReturnType, ModalAdProps } from '@/components/modals/_types'
import type { InjectedProps } from '@/stores/modals'
// Components
import CompEntityAdStatusPicker from '@/components/entities/ad/status-picker.vue'
import CompEntityAdImageGallery from '@/components/entities/ad/image-gallery.vue'
import CompEntityAdTargetBadge from '@/components/entities/ad/target-badge.vue'
import CompUiButton from '@/components/ui/ui-button.vue'
import ModalsBase from '@/components/modals/m-base.vue'

const props = defineProps<ModalAdProps & InjectedProps<ModalAdReturnType>>()

const editableStatus = ref<E_AD_STATUS>(E_AD_STATUS.NEW)
const isLoading = ref(false)

const canSave = computed(() => editableStatus.value !== props.ad.status)

const save = async () => {
  isLoading.value = true
  // postingsStore
  //   .updateHunterFields(props.posting.id, { userStatus: editableStatus.value })
  //   .then(() => props.closeModal(null))
  //   .finally(() => isLoading.value = false)
}

onMounted(() => {
  editableStatus.value = props.ad.status
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
        <div class="--group">
          <CompEntityAdTargetBadge :target="ad.target" />
          <p class="--text-white --font-bold">{{ ad.targetId }}</p>
          <p class="--text-white">{{ ad.descriptionShort }}</p>
        </div>

        <CompEntityAdStatusPicker
          :active-status="editableStatus"
          @status-change="status => editableStatus = status" />
      </div>
    </template>

    <template #content>
      <div class="content">
        <CompEntityAdImageGallery :ad="ad" />
        <div>
          right side content
        </div>
      </div>
    </template>

    <template #footer>
      <div class="--group --group--end">
        <CompUiButton
          type="success"
          :label="$t('global.save')"
          :disabled="!canSave"
          @click="save" />
      </div>
    </template>
  </ModalsBase>
</template>

<style lang="scss" scoped>
.header {
  justify-content: space-between;
  padding-right: var(--s-2xl);
  align-items: center;
  display: flex;
}

.content {
  grid-template-columns: auto 1fr;
  padding: var(--s-sm);
  gap: var(--s-md);
  display: grid;
}
</style>
