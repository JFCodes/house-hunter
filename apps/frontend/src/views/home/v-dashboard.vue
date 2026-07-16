<script setup lang="ts">
// App
import { useApi } from '@/composables/api'
// Components
import CompLayoutCenterContainer from '@/components/layouts/center-container.vue'
import CompUiButton from '@/components/ui/ui-button.vue'

defineProps<{ label: string }>()

const { testStuff } = useApi()

</script>

<template>
  <CompLayoutCenterContainer>
    <p class="--font-bold --mb-xs">Default button:</p>
    <div class="--group --mb-lg">
      <CompUiButton label="test stuff" @click="testStuff" />
    </div>
  </CompLayoutCenterContainer>
</template>
