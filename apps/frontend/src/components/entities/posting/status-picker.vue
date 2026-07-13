<script setup lang="ts">
import { E_POSTING_USER_STATUS } from '@house-hunter/types'
// Components
import CompEntityPostingStatusBadge from '@/components/entities/posting/status-badge.vue'
import CompUiDropdown from '@/components/ui/ui-dropdown.vue'
import { ChevronDown, ChevronUp } from '@lucide/vue'

const emits = defineEmits<{ 'status-change': [status: E_POSTING_USER_STATUS] }>()
defineProps<{ activeStatus: E_POSTING_USER_STATUS }>()

const orderedStatus: Array<E_POSTING_USER_STATUS> = [
  E_POSTING_USER_STATUS.NEW,
  E_POSTING_USER_STATUS.DISMISS,
  E_POSTING_USER_STATUS.INTERESTING,
  E_POSTING_USER_STATUS.CONTACT_MADE,
  E_POSTING_USER_STATUS.PROPOSAL_MADE,
  E_POSTING_USER_STATUS.PROPOSAL_ACCEPTED,
  E_POSTING_USER_STATUS.PROPOSAL_REJECTED,
  E_POSTING_USER_STATUS.BOUGHT,
]

const changeAndClose = (status: E_POSTING_USER_STATUS, close: () => void): void => {
  emits('status-change', status)
  close()
}
</script>

<template>
  <CompUiDropdown close-on-click-outside>
    <template #trigger="{ toggle, isOpen }">
      <CompEntityPostingStatusBadge
        :posting-status="activeStatus"
        :width="200"
        @click="toggle">

        <template #after-icon>
          <ChevronUp v-if="isOpen" :size="22" />
          <ChevronDown v-else :size="22" />
        </template>

      </CompEntityPostingStatusBadge>
    </template>

    <template #options="{ toggle }">
      <div class="options">
        <CompEntityPostingStatusBadge
          v-for="status in orderedStatus"
          class="hh-pointer"
          width="100%"
          :posting-status="status"
          :key="status"
          @click="changeAndClose(status, toggle)" />
      </div>
    </template>
  </CompUiDropdown>
</template>

<style lang="scss" scoped>
.options {
  padding: var(--spacing-xs);
  flex-direction: column;
  gap: var(--spacing-xs);
  display: flex;
}
</style>