<script setup lang="ts">
import type { T_PostingAreas } from '@house-hunter/types'
// Components
import CompUiBadge from '@/components/ui/ui-badge.vue'
import { BrickWall, House, Scan } from '@lucide/vue'

defineProps<{ postingAreas: T_PostingAreas }>()
</script>

<template>
  <CompUiBadge>
    <div class="area">
      <div class="area__section">
        <Scan :size="14" />
        <span class="">{{ postingAreas.livingArea }}</span>
      </div>
      <div class="area__section">
        <House :size="14" />
        <span class="">{{ postingAreas.totalArea }}</span>
      </div>
      <div class="area__section">
        <BrickWall :size="14" />
        <span class="">{{ postingAreas.builtArea || postingAreas.totalArea }}</span>
      </div>
    </div>
  </CompUiBadge>
</template>

<style lang="scss" scoped>
.area {
  gap: var(--spacing-md);
  align-items: center;
  display: flex;

  &__section {
    gap: var(--spacing-2xs);
    align-items: center;
    display: flex;
  }

}
</style>