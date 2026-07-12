<script setup lang="ts">
import { watch, ref, type SelectHTMLAttributes, computed } from 'vue'
// App
import type { UiSelectOption } from '@/components/ui/types'
import { useClickoutSide } from '@/composables/click-outside'
import { TELEPORTS } from '@/components/constants'

// Components
import CompFormsSelectOption from '@/components/forms/f-select-option.vue'
import CompFormsSelectPill from '@/components/forms/f-select-pill.vue'
import CompFormsFormField from '@/components/forms/f-form-field.vue'
import { ChevronDown, ChevronUp } from '@lucide/vue'

type BaseProps = {
  attributes?: SelectHTMLAttributes
  options: Array<UiSelectOption>
  label: string
  closeOnClickOutside?: boolean
}

type SingleProps = BaseProps & {
  modelValue: null | string
  multi?: false
}

type MultiProps = BaseProps & {
  modelValue: Array<string>
  multi: true
}

const emits = defineEmits<{ 'update:model-value': [value: null | string | Array<string>] }>()
defineSlots<{
  'before-label'(): void
  'after-label'(): void
}>()

const props = defineProps<SingleProps | MultiProps>()

const optionsRef = ref<null | HTMLDivElement>(null)
const selectRef = ref<null | HTMLDivElement>(null)
const optionsStyle = ref('')
const isOpen = ref(false)

useClickoutSide([selectRef, optionsRef], () => {
  if (!props.closeOnClickOutside) return
  if (isOpen.value) isOpen.value = false
})

const valueDisplay = computed(() => {
  return props.multi
    ? props.modelValue.join(', ')
    : props.modelValue ?? ''
})

const toggle = () => {
  isOpen.value = !isOpen.value
}

const onOptionClick = (option: UiSelectOption): void => {
  props.multi
    ? toggleMultiValue(option.value)
    : emits('update:model-value', option.value)
}

const toggleMultiValue = (value: null | string): void => {
  if (!props.multi) return
  if (value === null) return

  const cloneValues = [...props.modelValue]
  const index = cloneValues.findIndex(v => v === value)
  index === -1
    ? cloneValues.push(value)
    : cloneValues.splice(index, 1)

  emits('update:model-value', cloneValues)
}

const optionIsActive = (options: UiSelectOption): boolean => {
  return true
}

function positionDropdown(options: null | HTMLDivElement): void {
  if (!selectRef.value) return
  if (!options) return

  const selectRect = selectRef.value.getBoundingClientRect()

  const styles: Array<string> = []
  styles.push(`width:${selectRect.width}px`)
  styles.push(`top:${selectRect.y + selectRect.height}px`)
  styles.push(`left:${selectRect.x}px`)
  console.log(optionsStyle)
  optionsStyle.value = styles.join(';')
}

watch(optionsRef, positionDropdown)
</script>

<template>
  <CompFormsFormField :label="label">
    <template #before-label>
      <slot name="before-label"></slot>
    </template>

    <template #after-label>
      <slot name="after-label"></slot>
    </template>

    <template #default="{ id }">
      <div
        class="select hh-pointer"
        ref="selectRef"
        tabindex="-1"
        :class="{
          'select--open': isOpen,
          'select--pills': multi
        }"
        :id="id"
        @click="toggle">


        <template v-if="multi">
          <CompFormsSelectPill
            v-for="value in modelValue"
            :key="value"
            :value="value"
            @remove-value="toggleMultiValue(value)" />
        </template>
        <p v-else class="select__display">{{ valueDisplay }}</p>

        <ChevronUp v-if="isOpen" class="select__toggle" />
        <ChevronDown v-else class="select__toggle" />
      </div>

      <template v-if="isOpen">
        <Teleport :to="`#${TELEPORTS.DROPDOWNS}`">
          <div ref="optionsRef" class="select__options" :style="optionsStyle">
            <CompFormsSelectOption
              v-for="(option, index) in options"
              :is-active="optionIsActive(option)"
              :key="`opt-${index}`"
              :option="option"
              @click="onOptionClick(option)" />
          </div>
        </Teleport>
      </template>
    </template>
  </CompFormsFormField>
</template>
<style lang="scss" scoped>
.select {
  background-color: var(--color-background-emphasis);
  border: solid 1px var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-base);
  padding: 0 var(--spacing-xs);
  position: relative;
  line-height: 28px;
  height: 36px;
  width: 100%;

  &__display {
    line-height: 36px;
  }

  &__toggle {
    transform: translateY(-50%);
    right: var(--spacing-xs);
    pointer-events: none;
    position: absolute;
    top: 50%;
  }

  &__options {
    background-color: var(--color-background-light);
    border-bottom-right-radius: var(--radius-sm);
    border-bottom-left-radius: var(--radius-sm);
    border: solid 1px var(--color-border);
    position: fixed;
    z-index: 9999;
  }

  &--pills {
    gap: var(--spacing-2xs);
    align-items: center;
    min-height: 36px;
    flex-wrap: wrap;
    display: flex;
  }

  &--open {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  &:focus-within {
    border-color: var(--color-border-active);
    outline: none;
  }
}
</style>