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
import CompUiIconButton from '@/components/ui/ui-icon-button.vue'
import CompUiEmpty from '@/components/ui/ui-empty.vue'
import CompUiCard from '@/components/ui/ui-card.vue'
import { ExternalLink, Image, Euro } from '@lucide/vue'

defineProps<{ posting: T_Posting }>()

const { showPostingsModal } = useModals()
</script>

<template>
  <CompUiCard no-padding class="--pointer" @click="showPostingsModal(posting)">
    <div class="posting">
      <img v-if="posting.images.main" class="posting__image" :src="posting.images.main" />
      <CompUiEmpty v-else :icon="Image" />

      <div class="posting__content">
        <!-- Source and operation type -->
        <div class="--group --group--spread --mb-2xs">
          <div class="--group">
            <CompEntityPostingSourceBadge :source="posting.source" />
            <CompEntityOperationBadge :posting-operation="posting.operation" />
          </div>
          <div class="--group">
            <CompEntityPostingStatusBadge :posting-status="posting._houseHunterFields.userStatus" />
            <CompUiIconButton
              :icon="ExternalLink"
              :href="posting.url"
              :is-active="false"
              @click.stop />
          </div>
        </div>

        <!-- Description -->
        <p class="--text-sm --font-bold --truncate --text-white --mb-2xs">{{ posting.description }}</p>

        <!-- Pricing -->
        <div class="--group --mb-2xs">
          <p class="posting__title --uppercase --text-xs --font-bold">{{ $t('global.askingPrice') }}</p>
          <p class="--font-bold --text-md">{{ posting.price.toLocaleString() }}</p>
          <Euro :size="16" />
        </div>

        <!-- Construction -->
        <div v-if="posting.constructionYear" class="--group --mb-2xs">
          <p class="posting__title --uppercase --text-xs --font-bold">{{ $t('global.year') }}</p>
          <p class="--font-bold --text-md">{{ posting.constructionYear }}</p>
        </div>

        <div class="--divider --mt-2xs"></div>

        <!-- Typology -->
        <div class="--group --mb-sm">
          <p class="posting__title --uppercase --text-xs --font-bold">{{ $t('global.typology') }}</p>
          <CompEntityPostingTypologyBadge :posting-typology="posting.typology" />
        </div>

        <!-- Typology -->
        <div class="--group">
          <p class="posting__title --uppercase --text-xs --font-bold">{{ $t('global.area') }}</p>
          <CompEntityPostingAreaBadge :posting-areas="posting.areas" />
        </div>

      </div>
    </div>
  </CompUiCard>
</template>

<style lang="scss" scoped>
.posting {
  grid-template-columns: 180px 1fr;
  padding: var(--s-xs);
  gap: var(--s-xs);
  overflow: hidden;
  display: grid;
  width: 100%;

  &__image {
    border-radius: var(--radius-sm);
    object-position: center center;
    object-fit: cover;
    overflow: hidden;
    height: 180px;
    width: 180px;
  }

  &__content {
    overflow: hidden;
  }

  &__title {
    width: 100px;
  }
}
</style>
