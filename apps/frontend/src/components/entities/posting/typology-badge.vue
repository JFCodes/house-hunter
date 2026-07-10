<script setup lang="ts">
import type { T_PostingTypology } from '@house-hunter/types'
// Components
import CompUiBadge from '@/components/ui/ui-badge.vue'
import {
  SquareParking,
  BedDouble,
  HousePlus,
  Bath,
  Car,
} from '@lucide/vue'

defineProps<{ postingTypology: T_PostingTypology }>()
</script>

<template>
  <CompUiBadge>
    <div class="typology">
      <div class="typology__section">
        <BedDouble :size="14" />
        <span class="">{{ postingTypology.bedrooms }}</span>
      </div>

      <div class="typology__section">
        <Bath :size="14" />
        <span class="">{{ postingTypology.bathrooms }}</span>
      </div>

      <div class="typology__section">
        <HousePlus :size="14" />
        <span class="">{{ postingTypology.otherRooms }}</span>
      </div>

      <div class="typology__section" v-if="postingTypology.hasGarage">
        <Car :size="14" />
        <span class="">{{ postingTypology.parkingSpots }}</span>
      </div>
      <div class="typology__section" v-else-if="postingTypology.hasParking">
        <SquareParking :size="14" />
        <span class="">{{ postingTypology.parkingSpots }}</span>
      </div>
      <div class="typology__section" v-else>
        <SquareParking :size="14" />
        <span class="">0</span>
      </div>
    </div>

  </CompUiBadge>
</template>

<style lang="scss" scoped>
.typology {
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