<script setup lang="ts">
import { useI18n } from 'vue-i18n'
// App
import { useTooltips } from '@/composables/tooltips'
// Components
import CompFormInput from '@/components/forms/f-input.vue'
import { BadgeInfo } from '@lucide/vue'

const { sourceLocationInfo } = useTooltips()
const { t } = useI18n()

const location = defineModel<string>({ default: '' })

const showLocationTooltip = (event: MouseEvent): void => {
  sourceLocationInfo(event, {
    messages: [
      t('tooltips.crawlNewPostingLocation1'),
      t('tooltips.crawlNewPostingLocation2'),
    ]
  })
}
</script>

<template>
  <CompFormInput
    v-model="location"
    :label="$t('global.location')">
    <template #after-label>
      <BadgeInfo class="--help" :size="16" @mouseenter="showLocationTooltip" />
    </template>
  </CompFormInput>
</template>
