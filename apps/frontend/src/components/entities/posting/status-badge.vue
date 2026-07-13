<script setup lang="ts">
import { E_POSTING_USER_STATUS } from '@house-hunter/types'
// Components
import { POSTING_USER_STATUS_ICONS } from '@/components/constants'
import CompUiBadge from '@/components/ui/ui-badge.vue'

defineProps<{
  postingStatus: E_POSTING_USER_STATUS
  width?: string | number
}>()

const statusColors: Record<E_POSTING_USER_STATUS, string> = {
  [E_POSTING_USER_STATUS.NEW]: 'var(--color-status-new)',
  [E_POSTING_USER_STATUS.DISMISS]: 'var(--color-status-dismiss)',
  [E_POSTING_USER_STATUS.INTERESTING]: 'var(--color-status-interesting)',
  [E_POSTING_USER_STATUS.CONTACT_MADE]: 'var(--color-status-contact-made)',
  [E_POSTING_USER_STATUS.PROPOSAL_MADE]: 'var(--color-status-proposal-made)',
  [E_POSTING_USER_STATUS.PROPOSAL_ACCEPTED]: 'var(--color-status-proposal-accepted)',
  [E_POSTING_USER_STATUS.PROPOSAL_REJECTED]: 'var(--color-status-proposal-rejected)',
  [E_POSTING_USER_STATUS.BOUGHT]: 'var(--color-status-bought)',
}

</script>

<template>
  <CompUiBadge
    :border-color="statusColors[postingStatus]"
    :text-color="statusColors[postingStatus]"
    :width="width"
    :height="38">

    <div class="status-badge">
      <component :is="POSTING_USER_STATUS_ICONS[postingStatus]" :size="20" />
      <p class="status-badge__label">
        {{ $t(`enums.postingStatus.${postingStatus}`) }}
      </p>
      <slot name="after-icon"></slot>
    </div>

  </CompUiBadge>
</template>

<style lang="scss" scoped>
.status-badge {
  justify-content: center;
  gap: var(--spacing-xs);
  align-items: center;
  display: flex;
  width: 100%;

  &__label {
    flex: 1;
  }
}
</style>