<script setup lang="ts">
import { E_POSTING_USER_STATUS } from '@house-hunter/types'
import type { T_Posting } from '@house-hunter/types'
import { computed } from 'vue'
// App
// Component
import CompSwipeItemInfo from '@/components/pages/swipe/s-item-info.vue'
import CompEntityPostingTypologyBadge from '@/components/entities/posting/typology-badge.vue'
import CompEntityPostingImageGallery from '@/components/entities/posting/image-gallery.vue'
import CompEntityPostingStatusBadge from '@/components/entities/posting/status-badge.vue'
import CompEntityPostingSourceBadge from '@/components/entities/posting/source-badge.vue'
import CompEntityPostingAreaBadge from '@/components/entities/posting/area-badge.vue'
import CompEntityOperationBadge from '@/components/entities/operation-badge.vue'
import CompUiIconButton from '@/components/ui/ui-icon-button.vue'
import CompUiCard from '@/components/ui/ui-card.vue'
import { ExternalLink } from '@lucide/vue'

const orderedStatus: Array<E_POSTING_USER_STATUS> = [
  E_POSTING_USER_STATUS.NEW,
  E_POSTING_USER_STATUS.INTERESTING,
  E_POSTING_USER_STATUS.CONTACT_MADE,
  E_POSTING_USER_STATUS.PROPOSAL_MADE,
  E_POSTING_USER_STATUS.PROPOSAL_ACCEPTED,
  E_POSTING_USER_STATUS.PROPOSAL_REJECTED,
  E_POSTING_USER_STATUS.BOUGHT,
  E_POSTING_USER_STATUS.DISMISS,
]

const emits = defineEmits<{ 'pick-status': [status: E_POSTING_USER_STATUS] }>()
const props = defineProps<{ posting: T_Posting }>()

const statusOptions = computed(() => {
  return orderedStatus.filter(s => s !== props.posting._houseHunterFields.userStatus)
})
</script>

<template>
  <div class="--group --mb-sm swipe-header">
    <p class="--text-md --font-bold">{{ posting.description }}</p>
    <CompUiIconButton :href="posting.url" :icon="ExternalLink" :is-active="false" />
  </div>

  <div class="swipe-item">
    <CompSwipeItemInfo :posting="posting" />

    <div class="swipe-item__gallery">
      <CompEntityPostingImageGallery :images="posting.images" />
    </div>

    <div class="swipe-item__options">
      <CompEntityPostingStatusBadge
        v-for="status in statusOptions"
        class="swipe-item__options-item --pointer"
        :key="status"
        :posting-status="status"
        @click="emits('pick-status', status)" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.swipe-header {
  justify-content: center;
  align-items: center;
  gap: var(--s-sm);
  display: flex;
}

.swipe-item {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: var(--s-lg);

  &__info {
    border: solid 1px var(--color-border);
    flex-direction: column;
    gap: var(--s-sm);
    display: flex;
  }

  &__gallery {}

  &__options {
    align-items: flex-start;
    flex-direction: column;
    gap: var(--s-sm);
    display: flex;

    &-item {
      width: 200px;
    }
  }
}
</style>