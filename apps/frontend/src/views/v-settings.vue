<script setup lang="ts">
// App
import { useApi } from '@/composables/api'
// Components
import CompLayoutCenterContainer from '@/components/layouts/center-container.vue'
import CompUiButton from '@/components/ui/ui-button.vue'
import CompUiTypeBadge from '@/components/ui/ui-type-badge.vue'
import type { UiButtonType } from '@/components/ui/types'

defineProps<{ label: string }>()

const { testStuff } = useApi()

const types: Array<UiButtonType> = [
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
  'info',
  'dark',
  'light',
  'link',
]

</script>

<template>
  <CompLayoutCenterContainer>
    <p class="--font-bold --mb-xs">Default button:</p>
    <div class="--group --mb-lg">
      <CompUiButton label="test stuff" @click="testStuff" />
    </div>

    <p class="--font-bold">Button not filled:</p>
    <div class="--group --mb-lg">
      <CompUiButton v-for="type in types" :type="type" :label="type" :key="type" />
    </div>

    <p class="--font-bold --mb-xs">Button filled:</p>
    <div class="--group --mb-lg">
      <CompUiButton v-for="type in types" filled :type="type" :label="type" :key="type" />
    </div>

    <p class="--font-bold --mb-xs">Button not filled disabled:</p>
    <div class="--group --mb-lg">
      <CompUiButton v-for="type in types" disabled :type="type" :label="type" :key="type" />
    </div>

    <p class="--font-bold --mb-xs">Button filled disabled:</p>
    <div class="--group --mb-lg">
      <CompUiButton v-for="type in types" disabled filled :type="type" :label="type" :key="type" />
    </div>

    <p class="--font-bold --mb-xs">Type badge:</p>
    <div class="--group --mb-lg">
      <CompUiTypeBadge v-for="type in types" :type="type" :label="type" :key="type">
        <p>{{ type }}</p>
      </CompUiTypeBadge>
    </div>

    <p class="--font-bold --mb-xs">Type badge filled:</p>
    <div class="--group --mb-lg">
      <CompUiTypeBadge v-for="type in types" filled :type="type" :label="type" :key="type">
        <p>{{ type }}</p>
      </CompUiTypeBadge>
    </div>

    <p class="--font-bold --mb-xs">Type badge clearable:</p>
    <div class="--group --mb-lg">
      <CompUiTypeBadge v-for="type in types" clearable :type="type" :label="type" :key="type">
        <p>{{ type }}</p>
      </CompUiTypeBadge>
    </div>

    <p class="--font-bold --mb-xs">Type badge filled clearable:</p>
    <div class="--group --mb-lg">
      <CompUiTypeBadge v-for="type in types" clearable filled :type="type" :label="type" :key="type">
        <p>{{ type }}</p>
      </CompUiTypeBadge>
    </div>
  </CompLayoutCenterContainer>
</template>
