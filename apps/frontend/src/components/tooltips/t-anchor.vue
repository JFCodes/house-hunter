<script setup lang="ts">
import { computed } from 'vue'
// App
import { GetTooltipStyle } from '@/stores/tooltip/get-tooltip-style'
import { useTooltipStore } from '@/stores/tooltip'

const tooltipStore = useTooltipStore()

const style = computed<string>(() => {
  if (!tooltipStore.activeTooltip) return ''

  const { element, tooltip } = tooltipStore.activeTooltip

  return GetTooltipStyle(element, tooltip.position)
})

</script>

<template>
  <div v-if="tooltipStore.activeTooltip" class="tooltip-anchor" :style="style">
    <component
      :is="tooltipStore.activeTooltip.tooltip.component"
      v-bind="(tooltipStore.activeTooltip.tooltip.props as object)" />
  </div>
</template>

<style lang="scss" scoped>
.tooltip-anchor {
  background-color: var(--color-text-base);
  border: solid 1px var(--color-white);
  border-radius: var(--radius-sm);
  color: var(--color-text-dark);
  overflow: hidden;
  position: fixed;
  z-index: 9999;
}
</style>