<script setup lang="ts">
import type { T_Ad } from '@house-hunter/data-model'
// Components
import CompUiTypeBadge from '@/components/ui/ui-type-badge.vue'
import { BrickWall, House, Scan } from '@lucide/vue'

const ICON_SIZE = 18

defineProps<{ ad: T_Ad }>()
</script>

<template>
  <CompUiTypeBadge type="light">
    <div class="area">
      <div class="area__section">
        <Scan :size="ICON_SIZE" />
        <span class="">{{ ad.areaLiving }}</span>
      </div>
      <div class="area__section">
        <House :size="ICON_SIZE" />
        <span class="">{{ ad.areaTotal }}</span>
      </div>
      <div class="area__section">
        <BrickWall :size="ICON_SIZE" />
        <span class="">{{ ad.areaBuilt || ad.areaTotal }}</span>
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