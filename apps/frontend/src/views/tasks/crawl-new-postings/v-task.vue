<script setup lang="ts">
import type { T_Task, T_TaskCrawlNewPostingsWithStatus } from '@house-hunter/types'
import { computed, watch, ref } from 'vue'
import { useI18n } from 'vue-i18n'
// App
import { useRouterUtils } from '@/composables/router-utils'
import { useTooltips } from '@/composables/tooltips'
import { E_ROUTER_PARAMS } from '@/router/enums'
import { useTasksStore } from '@/stores/tasks'
// Components
import CompEntityActiveBadge from '@/components/entities/is-active-badge.vue'
import CompFormSelect from '@/components/forms/f-select.vue'
import CompFormInput from '@/components/forms/f-input.vue'
import CompUiEmpty from '@/components/ui/ui-empty.vue'
import CompUiCard from '@/components/ui/ui-card.vue'
import { BadgeInfo } from '@lucide/vue'

const { computedStringParam } = useRouterUtils()
const { sourceLocationInfo } = useTooltips()
const { t } = useI18n()
const tasksStore = useTasksStore()

const taskId = computedStringParam(E_ROUTER_PARAMS.TASK_ID)
const editableTask = ref<null | T_TaskCrawlNewPostingsWithStatus>(null)

const singleSelectValue = ref<null | string>(null)
const multiSelectValue = ref<Array<string>>([])

const task = computed<null | T_TaskCrawlNewPostingsWithStatus>(() => {
  if (!taskId.value) return null
  return tasksStore.crawlNewPostingTasks.find(t => t.id === taskId.value) ?? null
})

const cloneTask = (task: T_Task | null): void => {
  editableTask.value = task !== null
    ? JSON.parse(JSON.stringify(task))
    : null
}

const showLoadingTooltip = (event: MouseEvent): void => {
  sourceLocationInfo(event, {
    messages: [
      t('tooltips.crawlNewPostingLocation1'),
      t('tooltips.crawlNewPostingLocation2'),
    ]
  })
}

watch(task, cloneTask, { immediate: true })
</script>

<template>
  <CompUiEmpty v-if="!editableTask">
    <p class="hh-text-muted hh-text-md">{{ $t('notFound.task') }}</p>
  </CompUiEmpty>

  <CompUiCard v-else>
    <template #header>
      <div class="hh-group">
        <CompEntityActiveBadge :entity="editableTask" />

        <p class="hh-font-bold hh-text-lg">
          {{ editableTask.source.replaceAll('-', ' ') }}
        </p>
      </div>
    </template>

    <div class="layout">
      <CompFormInput
        v-model="editableTask.options.location"
        :label="$t('global.location')">
        <template #after-label>
          <BadgeInfo class="hh-help" :size="16" @mouseenter="showLoadingTooltip" />
        </template>
      </CompFormInput>

      <CompFormSelect
        v-model="singleSelectValue"
        close-on-click-outside
        label="Single select"
        :options="[{ label: '1', value: '1' }, { label: '2', value: '2' }, { label: '3', value: '3' },]" />

      <CompFormSelect
        v-model="multiSelectValue"
        close-on-click-outside
        multi
        label="Multi select"
        :options="[{ label: '1', value: '1' }, { label: '2', value: '2' }, { label: '3', value: '3' },]" />
    </div>
  </CompUiCard>
</template>

<style lang="scss" scoped>
.layout {}
</style>