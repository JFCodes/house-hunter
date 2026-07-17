<script setup lang="ts">
import { E_AD_STATUS, type T_Ad } from '@house-hunter/data-model'
import { computed } from 'vue'
// App
// Component
import CompEntityAddImageGallery from '@/components/entities/ad/image-gallery.vue'
import CompEntityAddStatusBadge from '@/components/entities/ad/status-badge.vue'
import CompSwipeItemInfo from '@/components/pages/swipe/s-item-info.vue'
import CompUiIconButton from '@/components/ui/ui-icon-button.vue'
import { ExternalLink } from '@lucide/vue'

const orderedStatus: Array<E_AD_STATUS> = [
  E_AD_STATUS.NEW,
  E_AD_STATUS.INTERESTING,
  E_AD_STATUS.CONTACT_MADE,
  E_AD_STATUS.PROPOSAL_MADE,
  E_AD_STATUS.PROPOSAL_ACCEPTED,
  E_AD_STATUS.PROPOSAL_REJECTED,
  E_AD_STATUS.COMPLETED,
  E_AD_STATUS.DELETED,
]

const emits = defineEmits<{ 'pick-status': [status: E_AD_STATUS] }>()
const props = defineProps<{ ad: T_Ad }>()

const statusOptions = computed(() => {
  return orderedStatus.filter(s => s !== props.ad.status)
})
</script>

<template>
  <div class="--group --mb-sm swipe-header">
    <p class="--text-md --font-bold">{{ ad.descriptionShort }}</p>
    <CompUiIconButton :href="ad.url" :icon="ExternalLink" :is-active="false" />
  </div>

  <div class="swipe-item">
    <CompSwipeItemInfo :ad="ad" />

    <div class="swipe-item__gallery">
      <CompEntityAddImageGallery :ad="ad" />
    </div>

    <div class="swipe-item__options">
      <CompEntityAddStatusBadge
        v-for="status in statusOptions"
        class="swipe-item__options-item --pointer"
        :key="status"
        :status="status"
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