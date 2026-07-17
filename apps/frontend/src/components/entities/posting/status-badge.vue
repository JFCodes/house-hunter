<script setup lang="ts">
import { E_POSTING_USER_STATUS } from '@house-hunter/types'
// App
import type { UiButtonType } from '@/components/ui/types'
// Components
// import { POSTING_USER_STATUS_ICONS } from '@/components/constants'
import CompUiTypeBadge from '@/components/ui/ui-type-badge.vue'

const STATUS_TYPES: Record<E_POSTING_USER_STATUS, UiButtonType> = {
  [E_POSTING_USER_STATUS.NEW]: 'info',
  [E_POSTING_USER_STATUS.DISMISS]: 'danger',
  [E_POSTING_USER_STATUS.INTERESTING]: 'warning',
  [E_POSTING_USER_STATUS.CONTACT_MADE]: 'primary',
  [E_POSTING_USER_STATUS.PROPOSAL_MADE]: 'primary',
  [E_POSTING_USER_STATUS.PROPOSAL_ACCEPTED]: 'success',
  [E_POSTING_USER_STATUS.PROPOSAL_REJECTED]: 'danger',
  [E_POSTING_USER_STATUS.BOUGHT]: 'success',
}

defineProps<{
  postingStatus: E_POSTING_USER_STATUS
  width?: string | number
}>()
</script>

<template>
  <CompUiTypeBadge :type="STATUS_TYPES[postingStatus]" :width="width" :height="38">

    <!-- <component :is="POSTING_USER_STATUS_ICONS[postingStatus]" :size="20" />
    <p class="status-badge__label">
      {{ $t(`enums.postingStatus.${postingStatus}`) }}
    </p>
    <slot name="after-icon"></slot> -->

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