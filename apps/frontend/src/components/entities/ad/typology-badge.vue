<script setup lang="ts">
import type { T_Ad } from '@house-hunter/data-model'
// Components
import { SquareParking, BedDouble, HousePlus, Bath, Car } from '@lucide/vue'
import CompUiTypeBadge from '@/components/ui/ui-type-badge.vue'

const ICON_SIZE = 18

defineProps<{ ad: T_Ad }>()
</script>

<template>
  <CompUiTypeBadge type="light">
    <div class="typology">
      <div class="typology__section">
        <BedDouble :size="ICON_SIZE" />
        <span class="">{{ ad.typologyBedrooms }}</span>
      </div>

      <div class="typology__section">
        <Bath :size="ICON_SIZE" />
        <span class="">{{ ad.typologyBathrooms }}</span>
      </div>

      <div class="typology__section">
        <HousePlus :size="ICON_SIZE" />
        <span class="">{{ ad.typologyOtherRooms }}</span>
      </div>

      <div class="typology__section" v-if="ad.typologyHasGarage">
        <Car :size="ICON_SIZE" />
        <span class="">{{ ad.typologyParkingSpots }}</span>
      </div>
      <div class="typology__section" v-else-if="ad.typologyHasParking">
        <SquareParking :size="ICON_SIZE" />
        <span class="">{{ ad.typologyParkingSpots }}</span>
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