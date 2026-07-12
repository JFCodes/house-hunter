<script setup lang="ts">
import type { T_PostingType } from '@house-hunter/types'
import { useI18n } from 'vue-i18n'
// App
import type { UiSelectOption } from '@/components/ui/types'
// Components
import CompFormSelect from '@/components/forms/f-select.vue'

const { t } = useI18n()

const postingLocation = defineModel<Array<T_PostingType>>({ default: () => [] })

const postingTypeOptions: Array<UiSelectOption<T_PostingType>> = [
  { label: t(`enums.postingType.${'single-home'}`), value: 'single-home' },
  { label: t(`enums.postingType.${'apartment'}`), value: 'apartment' },
]

</script>

<template>
  <CompFormSelect
    v-model="postingLocation"
    close-on-click-outside
    multi
    :label="$t('pages.task.crawling.types')"
    :options="postingTypeOptions" />
</template>

<style lang="scss" scoped>
.layout {}
</style>