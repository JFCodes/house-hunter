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

defineProps<{ posting: T_Posting }>()

</script>

<template>
  <CompUiCard class="item-info">
    <template #header>
      <div class="--group --group--spread --mb-2xs">
        <div class="--group">
          <CompEntityPostingSourceBadge :source="posting.source" />
          <CompEntityOperationBadge :posting-operation="posting.operation" />
        </div>
        <CompUiIconButton
          :icon="ExternalLink"
          :href="posting.url"
          :is-active="false"
          @click.stop />
      </div>
    </template>

    <div class="item-info__content">
      <div class="item-info__content-line">

      </div>
    </div>
    <!--  -->

    <!-- Description -->
    <!-- <p class="--text-2xs --font-bold --truncate --mb-2xs">{{ posting.description }}</p> -->

    <!-- Pricing -->
    <!-- <div class="--group --mb-2xs">
      <p class=" --uppercase --text-3xs --font-bold">{{ $t('global.askingPrice') }}</p>
      <p class="--font-bold --text-md">{{ posting.price.toLocaleString() }}</p>
      <Euro :size="16" />
    </div> -->

    <!-- Construction -->
    <!-- <div v-if="posting.constructionYear" class="--group --mb-2xs">
      <p class=" --uppercase --text-3xs --font-bold">{{ $t('global.constructionYear') }}</p>
      <p class="--font-bold --text-md">{{ posting.constructionYear }}</p>
    </div> -->

    <!-- Typology -->
    <!-- <div class="--group --mb-2xs">
      <p class="posting__title --font-bold --uppercase --text-3xs">{{ $t('global.typology') }}</p>
      <CompEntityPostingTypologyBadge :posting-typology="posting.typology" />
    </div> -->

    <!-- Typology -->
    <!-- <div class="--group --mb-md">
      <p class="posting__title --font-bold --uppercase --text-3xs">{{ $t('global.area') }}</p>
      <CompEntityPostingAreaBadge :posting-areas="posting.areas" />
    </div> -->
  </CompUiCard>
</template>

<style lang="scss" scoped>
.item-info {
  border: solid 1px var(--color-border);
  flex-direction: column;
  gap: var(--s-sm);
  display: flex;

  &__content {
    margin: 0 auto;
    max-width: 400px;

    &__line {
      border-bottom: var(--c-gray-600);
      justify-content: space-between;
      align-items: center;
      display: flex;
    }
  }
}
</style>