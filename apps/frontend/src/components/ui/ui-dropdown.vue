<script setup lang="ts">
import { watch, ref } from 'vue'
// App
import { useClickoutSide } from '@/composables/click-outside'
import { TELEPORTS } from '@/components/constants'
// Components

defineSlots<{
  'trigger'(props: { isOpen: boolean, toggle: () => void }): void
  'options'(props: { isOpen: boolean, toggle: () => void }): void
}>()

const props = defineProps<{ closeOnClickOutside?: boolean }>()

const optionsRef = ref<null | HTMLDivElement>(null)
const triggerRef = ref<null | HTMLDivElement>(null)
const optionsStyle = ref('')
const isOpen = ref(false)

useClickoutSide([triggerRef, optionsRef], () => {
  if (!props.closeOnClickOutside) return
  if (isOpen.value) isOpen.value = false
})

const toggle = () => {
  isOpen.value = !isOpen.value
}

function positionDropdown(options: null | HTMLDivElement): void {
  if (!triggerRef.value) return
  if (!options) return

  const triggerRect = triggerRef.value.getBoundingClientRect()

  const styles: Array<string> = []
  styles.push(`width:${triggerRect.width}px`)
  styles.push(`top:${triggerRect.y + triggerRect.height}px`)
  styles.push(`left:${triggerRect.x}px`)
  optionsStyle.value = styles.join(';')
}

watch(optionsRef, positionDropdown)
</script>

<template>
  <div class="dropdown">
    <div ref="triggerRef" class="hh-pointer">
      <slot name="trigger" :isOpen="isOpen" :toggle="toggle"></slot>
    </div>

    <Teleport v-if="isOpen" :to="`#${TELEPORTS.DROPDOWNS}`">
      <div ref="optionsRef" class="dropdown__options" :style="optionsStyle">
        <slot name="options" :isOpen="isOpen" :toggle="toggle"></slot>
      </div>
    </Teleport>
  </div>
</template>
<style lang="scss" scoped>
.dropdown {
  &__options {
    background-color: var(--color-background-light);
    border-bottom-right-radius: var(--radius-sm);
    border-bottom-left-radius: var(--radius-sm);
    border: solid 1px var(--color-border);
    position: fixed;
    z-index: 9999;
  }
}
</style>