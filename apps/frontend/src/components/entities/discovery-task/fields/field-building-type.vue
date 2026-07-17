<script setup lang="ts">
import type { T_AdBuildingType } from '@house-hunter/data-model'
import { useI18n } from 'vue-i18n'
// App
import type { UiSelectOption } from '@/components/ui/types'
// Components
import CompFormSelect from '@/components/forms/f-select.vue'

const { t } = useI18n()

const adLocation = defineModel<Array<T_AdBuildingType>>({ default: () => [] })

const adTypeOptions: Array<UiSelectOption<T_AdBuildingType>> = [
  { label: t(`enums.adBuildingType.${'single-house'}`), value: 'single-house' },
  { label: t(`enums.adBuildingType.${'apartment'}`), value: 'apartment' },
]
</script>

<template>
  <CompFormSelect
    v-model="adLocation"
    close-on-click-outside
    multi
    :label="$t('pages.task.crawling.types')"
    :options="adTypeOptions" />
</template>
