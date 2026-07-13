<script setup lang="ts">
import type { T_Posting } from '@house-hunter/types'
// App
import { useModals } from '@/composables/modals'
// Components
import CompEntityPostingTypologyBadge from '@/components/entities/posting/typology-badge.vue'
import CompEntityPostingStatusBadge from '@/components/entities/posting/status-badge.vue'
import CompEntityPostingAreaBadge from '@/components/entities/posting/area-badge.vue'
import CompUiIconButton from '@/components/ui/ui-icon-button.vue'
import { ExternalLink, Euro, Eye } from '@lucide/vue'

defineProps<{ posting: T_Posting }>()

const { showPostingsModal } = useModals()

</script>

<template>
  <tr>
    <!-- Thumbnail -->
    <td>
      <div class="thumbnail">
        <img class="thumbnail__img" :src="posting.images.main" />
      </div>
    </td>

    <!-- Description -->
    <td>{{ posting.description }}</td>

    <!-- Pricing -->
    <td>
      <div class="hh-group">
        <p class="hh-font-bold hh-text-md">{{ posting.price.toLocaleString() }}</p>
        <Euro :size="16" />
      </div>
    </td>

    <!-- Construction year -->
    <td>{{ posting.constructionYear }}</td>

    <!-- Typology -->
    <td>
      <CompEntityPostingTypologyBadge :posting-typology="posting.typology" />
    </td>

    <!-- Area -->
    <td>
      <CompEntityPostingAreaBadge :posting-areas="posting.areas" />
    </td>

    <!-- Status -->
    <td>
      <CompEntityPostingStatusBadge :width="120" :posting-status="posting._houseHunterFields.userStatus" />
    </td>

    <!-- Actions -->
    <td class="hh-text-center">
      <div class="hh-group">
        <CompUiIconButton :href="posting.url" :icon="ExternalLink" :is-active="false" />
        <CompUiIconButton :icon="Eye" :is-active="false" @click="showPostingsModal(posting)" />
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