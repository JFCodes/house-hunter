<script setup lang="ts">
import type { T_Posting } from '@house-hunter/types'
// Components
import CompUiCard from '@/components/ui/ui-card.vue'

defineProps<{ posting: T_Posting }>()
</script>

<template>
  <CompUiCard no-padding>
    <div class="posting">
      <img class="posting__image" :src="posting.images.main" />
      <div class="posting__content">
        <p class="hh-text-2xs hh-font-bold hh-truncate">{{ posting.description }}</p>
      </div>
    </div>
  </CompUiCard>
</template>

<style lang="scss" scoped>
.posting {
  background-color: var(--color-background-emphasis);
  overflow: hidden;
  width: 500px;
  display: grid;
  grid-template-columns: 220px auto;
  gap: var(--spacing-xs);

  &__image {
    border-right: solid 2px var(--color-border);
    object-position: center center;
    object-fit: cover;
    overflow: hidden;
    height: 220px;
    width: 220px;
  }

  &__content {
    padding: var(--spacing-xs);
  }
}
</style>
