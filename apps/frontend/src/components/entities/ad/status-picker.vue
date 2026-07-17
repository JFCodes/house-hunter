<script setup lang="ts">
import { E_AD_STATUS } from '@house-hunter/data-model'
// Components
import ComponentEntityAdStatusBadge from '@/components/entities/ad/status-badge.vue'
import CompUiDropdown from '@/components/ui/ui-dropdown.vue'
import { ChevronDown, ChevronUp } from '@lucide/vue'

const emits = defineEmits<{ 'status-change': [status: E_AD_STATUS] }>()
defineProps<{ activeStatus: E_AD_STATUS }>()

const orderedStatus: Array<E_AD_STATUS> = [
  E_AD_STATUS.NEW,
  E_AD_STATUS.INTERESTING,
  E_AD_STATUS.CONTACT_MADE,
  E_AD_STATUS.PROPOSAL_MADE,
  E_AD_STATUS.PROPOSAL_ACCEPTED,
  E_AD_STATUS.COMPLETED,
  E_AD_STATUS.PROPOSAL_REJECTED,
  E_AD_STATUS.DELETED,
]

const changeAndClose = (status: E_AD_STATUS, close: () => void): void => {
  emits('status-change', status)
  close()
}
</script>

<template>
  <CompUiDropdown close-on-click-outside>
    <template #trigger="{ toggle, isOpen }">
      <ComponentEntityAdStatusBadge
        :status="activeStatus"
        :width="200"
        @click="toggle">

        <template #after-icon>
          <ChevronUp v-if="isOpen" :size="22" />
          <ChevronDown v-else :size="22" />
        </template>

      </ComponentEntityAdStatusBadge>
    </template>

    <template #options="{ toggle }">
      <div class="options">
        <ComponentEntityAdStatusBadge
          v-for="status in orderedStatus"
          class="--pointer"
          width="100%"
          :status="status"
          :key="status"
          @click="changeAndClose(status, toggle)" />
      </div>
    </template>
  </CompUiDropdown>
</template>

<style lang="scss" scoped>
.options {
  padding: var(--s-xs);
  flex-direction: column;
  gap: var(--s-xs);
  display: flex;
}
</style>