<script setup lang="ts">
// App
import { useApi } from '@/composables/api'

defineProps<{ label: string }>()

const { testStuff } = useApi()

function onButtonClick(): void {
  testStuff()
}
</script>

<template>
  <button class="hh-base-button hh-text-2xs hh-px-sm" @click="onButtonClick">
    {{ label }}
  </button>
</template>

<style lang="scss" scoped>
.button {}
</style>