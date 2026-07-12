<script setup lang="ts">
// App
import { useApi } from '@/composables/api'
// Components
import CompUiButton from '@/components/ui/ui-button.vue'

defineProps<{ label: string }>()

const { testStuff } = useApi()

function onButtonClick(): void {
  testStuff()
}
</script>

<template>
  <CompUiButton label="test stuff" @click="onButtonClick" />
</template>
