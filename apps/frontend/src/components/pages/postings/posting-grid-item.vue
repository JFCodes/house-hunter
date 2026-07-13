<script setup lang="ts">
import type { T_Posting } from '@house-hunter/types'
// App
import { useModals } from '@/composables/modals'
// Components
import CompEntityPostingTypologyBadge from '@/components/entities/posting/typology-badge.vue'
import CompEntityPostingSourceBadge from '@/components/entities/posting/source-badge.vue'
import CompEntityPostingStatusBadge from '@/components/entities/posting/status-badge.vue'
import CompEntityPostingAreaBadge from '@/components/entities/posting/area-badge.vue'
import CompEntityOperationBadge from '@/components/entities/operation-badge.vue'
import CompUiCard from '@/components/ui/ui-card.vue'
import { Euro } from '@lucide/vue'

defineProps<{ posting: T_Posting }>()

const { showPostingsModal } = useModals()
</script>

<template>
  <CompUiCard no-padding class="hh-pointer" @click="showPostingsModal(posting)">
    <div class="posting">
      <img class="posting__image" :src="posting.images.main" />
      <div class="posting__content">
        <!-- Source and operation type -->
        <div class="hh-group hh-group--spread hh-mb-2xs">
          <div class="hh-group">
            <CompEntityPostingSourceBadge :source="posting.source" />
            <CompEntityOperationBadge :posting-operation="posting.operation" />
          </div>
          <CompEntityPostingStatusBadge :width="120" :posting-status="posting._houseHunterFields.userStatus" />
        </div>
        <!-- Description -->
        <p class="hh-text-2xs hh-font-bold hh-truncate hh-mb-2xs">{{ posting.description }}</p>
        <!-- Pricing -->
        <div class="hh-group hh-mb-2xs">
          <p class=" hh-uppercase hh-text-3xs hh-font-bold">{{ $t('global.askingPrice') }}</p>
          <p class="hh-font-bold hh-text-md">{{ posting.price.toLocaleString() }}</p>
          <Euro :size="16" />
        </div>
        <div class="hh-group hh-mb-2xs">
          <p class=" hh-uppercase hh-text-3xs hh-font-bold">{{ $t('global.constructionYear') }}</p>
          <p class="hh-font-bold hh-text-md">{{ posting.constructionYear }}</p>
        </div>
        <!-- Construction -->
        <div class="hh-divider hh-mt-2xs"></div>
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

      </div>
    </div>
  </CompUiCard>
</template>

<style lang="scss" scoped>
.posting {
  background-color: var(--color-background-emphasis);
  grid-template-columns: 200px 1fr;
  padding: var(--spacing-xs);
  gap: var(--spacing-xs);
  overflow: hidden;
  display: grid;
  width: 600px;

  &__image {
    border-right: solid 2px var(--color-border);
    border-radius: var(--radius-sm);
    object-position: center center;
    object-fit: cover;
    overflow: hidden;
    height: 200px;
    width: 200px;
  }

  &__content {
    overflow: hidden;
  }

  &__title {
    width: 45px;
  }
}
</style>
