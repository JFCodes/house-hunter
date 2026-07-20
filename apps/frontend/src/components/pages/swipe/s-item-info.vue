<script setup lang="ts">
import type { T_Ad } from '@house-hunter/data-model'
// App
// Component
import CompEntityAdTypologyBadge from '@/components/entities/ad/typology-badge.vue'
import CompEntityAdTargetBadge from '@/components/entities/ad/target-badge.vue'
import CompEntityAdTypeBadge from '@/components/entities/ad/type-badge.vue'
import CompEntityAdAreBadge from '@/components/entities/ad/area-badge.vue'
import CompUiIconButton from '@/components/ui/ui-icon-button.vue'
import CompUiCard from '@/components/ui/ui-card.vue'
import { ExternalLink, Euro } from '@lucide/vue'

defineProps<{ ad: T_Ad }>()

</script>

<template>
  <CompUiCard class="item-info">
    <template #header>
      <div class="--group --group--spread --mb-2xs">
        <div class="--group">
          <CompEntityAdTargetBadge :target="ad.target" />
          <CompEntityAdTypeBadge :ad-type="ad.adType" />
        </div>
        <CompUiIconButton
          :icon="ExternalLink"
          :href="ad.url"
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
    <p class="--text-2xs --font-bold --truncate --mb-2xs">{{ ad.descriptionShort }}</p>

    <!-- Pricing -->
    <div class="--group --mb-2xs">
      <p class=" --uppercase --text-3xs --font-bold">{{ $t('global.askingPrice') }}</p>
      <p class="--font-bold --text-md">{{ ad.price.toLocaleString() }}</p>
      <Euro :size="16" />
    </div>

    <!-- Construction -->
    <div v-if="ad.constructionYear" class="--group --mb-2xs">
      <p class=" --uppercase --text-3xs --font-bold">{{ $t('global.constructionYear') }}</p>
      <p class="--font-bold --text-md">{{ ad.constructionYear }}</p>
    </div>

    <!-- Typology -->
    <div class="--group --mb-2xs">
      <p class="--font-bold --uppercase --text-3xs">{{ $t('global.typology') }}</p>
      <CompEntityAdTypologyBadge :ad="ad" />
    </div>

    <!-- Typology -->
    <div class="--group --mb-md">
      <p class="--font-bold --uppercase --text-3xs">{{ $t('global.area') }}</p>
      <CompEntityAdAreBadge :ad="ad" />
    </div>
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