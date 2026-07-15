<script setup lang="ts">
import type { T_PostingAreas } from '@house-hunter/types'
// Components
import CompUiTypeBadge from '@/components/ui/ui-type-badge.vue'
import { BrickWall, House, Scan } from '@lucide/vue'

const ICON_SIZE = 18

defineProps<{ postingAreas: T_PostingAreas }>()
</script>

<template>
  <CompUiTypeBadge type="light">
    <div class="area">
      <div class="area__section">
        <Scan :size="ICON_SIZE" />
        <span class="">{{ postingAreas.livingArea }}</span>
      </div>
      <div class="area__section">
        <House :size="ICON_SIZE" />
        <span class="">{{ postingAreas.totalArea }}</span>
      </div>
      <div class="area__section">
        <BrickWall :size="ICON_SIZE" />
        <span class="">{{ postingAreas.builtArea || postingAreas.totalArea }}</span>
      </div>
    </div>
  </CompUiTypeBadge>
</template>

<style lang="scss" scoped>
.area {
  align-items: center;
  gap: var(--s-md);
  display: flex;

  &__section {
    align-items: center;
    gap: var(--s-2xs);
    display: flex;
  }
}
</style>