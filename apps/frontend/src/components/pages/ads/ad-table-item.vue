<script setup lang="ts">
import type { T_Ad } from '@house-hunter/data-model'
// App
import { useModals } from '@/composables/modals'
// Components
import CompEntityAdTypologyBadge from '@/components/entities/ad/typology-badge.vue'
import CompEntityAdStatusBadge from '@/components/entities/ad/status-badge.vue'
import CompEntityAdAreaBadge from '@/components/entities/ad/area-badge.vue'
import CompUiIconButton from '@/components/ui/ui-icon-button.vue'
import { ExternalLink, Euro, Eye } from '@lucide/vue'

defineProps<{ ad: T_Ad }>()

const { showAdModal } = useModals()
</script>

<template>
  <tr>
    <!-- Thumbnail -->
    <td>
      <div class="thumbnail">
        <img
          v-if="ad.imageMain"
          class="thumbnail__img"
          :src="ad.imageMain" />
      </div>
    </td>

    <!-- Description -->
    <td>{{ ad.descriptionShort }}</td>

    <!-- Pricing -->
    <td>
      <div class="--group">
        <p class="--font-bold --text-md">{{ ad.price.toLocaleString() }}</p>
        <Euro :size="16" />
      </div>
    </td>

    <!-- Construction year -->
    <td>{{ ad.constructionYear }}</td>

    <!-- Typology -->
    <td>
      <CompEntityAdTypologyBadge :ad="ad" />
    </td>

    <!-- Area -->
    <td>
      <CompEntityAdAreaBadge :ad="ad" />
    </td>

    <!-- Status -->
    <td>
      <CompEntityAdStatusBadge :width="120" :status="ad.status" />
    </td>

    <!-- Actions -->
    <td class="--text-center">
      <div class="--group">
        <CompUiIconButton :href="ad.url" :icon="ExternalLink" :is-active="false" />
        <CompUiIconButton :icon="Eye" :is-active="false" @click="showAdModal(ad)" />
      </div>
    </td>
  </tr>
</template>

<style lang="scss" scoped>
.thumbnail {
  height: 120px;
  width: 120px;

  &__img {
    object-position: center center;
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
}
</style>