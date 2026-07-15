<script setup lang="ts">
import type { T_PostingTypology } from '@house-hunter/types'
// Components
import CompUiTypeBadge from '@/components/ui/ui-type-badge.vue'
import {
  SquareParking,
  BedDouble,
  HousePlus,
  Bath,
  Car,
} from '@lucide/vue'

const ICON_SIZE = 18

defineProps<{ postingTypology: T_PostingTypology }>()
</script>

<template>
  <CompUiTypeBadge type="light">
    <div class="typology">
      <div class="typology__section">
        <BedDouble :size="ICON_SIZE" />
        <span class="">{{ postingTypology.bedrooms }}</span>
      </div>

      <div class="typology__section">
        <Bath :size="ICON_SIZE" />
        <span class="">{{ postingTypology.bathrooms }}</span>
      </div>

      <div class="typology__section">
        <HousePlus :size="ICON_SIZE" />
        <span class="">{{ postingTypology.otherRooms }}</span>
      </div>

      <div class="typology__section" v-if="postingTypology.hasGarage">
        <Car :size="ICON_SIZE" />
        <span class="">{{ postingTypology.parkingSpots }}</span>
      </div>
      <div class="typology__section" v-else-if="postingTypology.hasParking">
        <SquareParking :size="ICON_SIZE" />
        <span class="">{{ postingTypology.parkingSpots }}</span>
      </div>
      <div class="typology__section" v-else>
        <SquareParking :size="ICON_SIZE" />
        <span class="">0</span>
      </div>
    </div>
  </CompUiTypeBadge>
</template>

<style lang="scss" scoped>
.typology {
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