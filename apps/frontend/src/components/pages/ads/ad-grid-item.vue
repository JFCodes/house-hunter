<script setup lang="ts">
import type { T_Ad } from '@house-hunter/data-model'
// App
import { useModals } from '@/composables/modals'
// Components
import { ExternalLink, Image, Euro } from '@lucide/vue'
import CompEntityAdTypologyBadge from '@/components/entities/ad/typology-badge.vue'
import CompEntityAdTargetBadge from '@/components/entities/ad/target-badge.vue'
import CompEntityAdStatusBadge from '@/components/entities/ad/status-badge.vue'
import CompEntityAdAreaBadge from '@/components/entities/ad/area-badge.vue'
import CompEntityAdTypeBadge from '@/components/entities/ad/type-badge.vue'
import CompUiIconButton from '@/components/ui/ui-icon-button.vue'
import CompUiEmpty from '@/components/ui/ui-empty.vue'
import CompUiCard from '@/components/ui/ui-card.vue'

defineProps<{ ad: T_Ad }>()

const { showAdModal } = useModals()
</script>

<template>
  <CompUiCard no-padding class="--pointer" @click="showAdModal(ad)">
    <div class="posting">
      <img v-if="ad.imageMain" class="posting__image" :src="ad.imageMain" />
      <CompUiEmpty v-else :icon="Image" />

      <div class="posting__content">
        <!-- Source and operation type -->
        <div class="--group --group--spread --mb-2xs">
          <div class="--group">
            <CompEntityAdTargetBadge :target="ad.targetId" />
            <CompEntityAdTypeBadge :ad-type="ad.adType" />
          </div>
          <div class="--group">
            <CompEntityAdStatusBadge :status="ad.status" />
            <CompUiIconButton
              :icon="ExternalLink"
              :href="ad.url"
              :is-active="false"
              @click.stop />
          </div>
        </div>

        <!-- Description -->
        <p class="--text-sm --font-bold --truncate --text-white --mb-2xs">{{ ad.descriptionShort }}</p>

        <!-- Pricing -->
        <div class="--group --mb-2xs">
          <p class="posting__title --uppercase --text-xs --font-bold">{{ $t('global.askingPrice') }}</p>
          <p class="--font-bold --text-md">{{ ad.price.toLocaleString() }}</p>
          <Euro :size="16" />
        </div>

        <!-- Construction -->
        <div v-if="ad.constructionYear" class="--group --mb-2xs">
          <p class="posting__title --uppercase --text-xs --font-bold">{{ $t('global.year') }}</p>
          <p class="--font-bold --text-md">{{ ad.constructionYear }}</p>
        </div>

        <div class="--divider --mt-2xs"></div>

        <!-- Typology -->
        <div class="--group --mb-sm">
          <p class="posting__title --uppercase --text-xs --font-bold">{{ $t('global.typology') }}</p>
          <CompEntityAdTypologyBadge :ad="ad" />
        </div>

        <!-- Typology -->
        <div class="--group">
          <p class="posting__title --uppercase --text-xs --font-bold">{{ $t('global.area') }}</p>
          <CompEntityAdAreaBadge :ad="ad" />
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
