<script setup lang="ts">
import { E_AD_STATUS } from '@house-hunter/data-model'
// App
import type { UiButtonType } from '@/components/ui/types'
// Components
import { AD_STATUS_ICONS } from '@/components/constants'
import CompUiTypeBadge from '@/components/ui/ui-type-badge.vue'

const STATUS_TYPES: Record<E_AD_STATUS, UiButtonType> = {
  [E_AD_STATUS.NEW]: 'info',
  [E_AD_STATUS.DELETED]: 'danger',
  [E_AD_STATUS.INTERESTING]: 'warning',
  [E_AD_STATUS.CONTACT_MADE]: 'primary',
  [E_AD_STATUS.PROPOSAL_MADE]: 'primary',
  [E_AD_STATUS.PROPOSAL_ACCEPTED]: 'success',
  [E_AD_STATUS.PROPOSAL_REJECTED]: 'danger',
  [E_AD_STATUS.COMPLETED]: 'success',
}

defineProps<{
  status: E_AD_STATUS
  width?: string | number
}>()
</script>

<template>
  <CompUiTypeBadge :type="STATUS_TYPES[status]" :width="width" :height="38">

    <component :is="AD_STATUS_ICONS[status]" :size="20" />
    <p class="status-badge__label">
      {{ $t(`enums.adStatus.${status}`) }}
    </p>
    <slot name="after-icon"></slot>

  </CompUiTypeBadge>
</template>

<style lang="scss" scoped>
.status-badge {
  justify-content: center;
  gap: var(--s-xs);
  align-items: center;
  display: flex;
  width: 100%;

  &__label {
    flex: 1;
  }
}
</style>