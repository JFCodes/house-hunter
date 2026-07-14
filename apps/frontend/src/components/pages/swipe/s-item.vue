<script setup lang="ts">
import { E_POSTING_USER_STATUS } from '@house-hunter/types'
import type { T_Posting } from '@house-hunter/types'
import { computed } from 'vue'
// App
// Component
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
  <div class="hh-group hh-mb-sm swipe-header">
    <p class="hh-text-md hh-font-bold">{{ posting.description }}</p>
    <CompUiIconButton :href="posting.url" :icon="ExternalLink" :is-active="false" />
  </div>

  <div class="swipe-item">
    <CompUiCard class="swipe-item__info">
      <div class="hh-group hh-group--spread hh-mb-2xs">
        <div class="hh-group">
          <CompEntityPostingSourceBadge :source="posting.source" />
          <CompEntityOperationBadge :posting-operation="posting.operation" />
        </div>
        <CompUiIconButton
          :icon="ExternalLink"
          :href="posting.url"
          :is-active="false"
          @click.stop />
      </div>

      <!-- Description -->
      <p class="hh-text-2xs hh-font-bold hh-truncate hh-mb-2xs">{{ posting.description }}</p>


      <!-- Pricing -->
      <div class="hh-group hh-mb-2xs">
        <p class=" hh-uppercase hh-text-3xs hh-font-bold">{{ $t('global.askingPrice') }}</p>
        <p class="hh-font-bold hh-text-md">{{ posting.price.toLocaleString() }}</p>
        <Euro :size="16" />
      </div>

      <!-- Construction -->
      <div v-if="posting.constructionYear" class="hh-group hh-mb-2xs">
        <p class=" hh-uppercase hh-text-3xs hh-font-bold">{{ $t('global.constructionYear') }}</p>
        <p class="hh-font-bold hh-text-md">{{ posting.constructionYear }}</p>
      </div>

      <!-- Typology -->
      <div class="hh-group hh-mb-2xs">
        <p class="posting__title hh-font-bold hh-uppercase hh-text-3xs">{{ $t('global.typology') }}</p>
        <CompEntityPostingTypologyBadge :posting-typology="posting.typology" />
      </div>

      <!-- Typology -->
      <div class="hh-group hh-mb-md">
        <p class="posting__title hh-font-bold hh-uppercase hh-text-3xs">{{ $t('global.area') }}</p>
        <CompEntityPostingAreaBadge :posting-areas="posting.areas" />
      </div>
    </CompUiCard>

    <div class="swipe-item__gallery">
      <CompEntityPostingImageGallery :images="posting.images" />
    </div>

    <div class="swipe-item__options">
      <CompEntityPostingStatusBadge
        v-for="status in statusOptions"
        class="swipe-item__options-item hh-pointer"
        :key="status"
        :posting-status="status"
        @click="emits('pick-status', status)" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.swipe-header {
  gap: var(--spacing-sm);
  justify-content: center;
  align-items: center;
  display: flex;
}

.swipe-item {
  display: grid;
  grid-template-columns: 2fr auto 1fr;
  gap: var(--spacing-xl);

  &__info {
    border: solid 1px var(--color-border);
    flex-direction: column;
    gap: var(--spacing-sm);
    display: flex;
  }

  &__gallery {}

  &__options {
    align-items: flex-start;
    flex-direction: column;
    gap: var(--spacing-sm);
    display: flex;

    &-item {
      width: 200px;
    }
  }
}
</style>