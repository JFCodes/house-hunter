<script setup lang="ts">
import type { T_TaskCrawlNewPostingsWithStatus } from '@house-hunter/types'
// App
import { E_ROUTER_PAGES, E_ROUTER_PARAMS } from '@/router/enums'
// Components
import CompEntityPostingTypesBadges from '@/components/entities/posting/types-badges.vue'
import CompEntityOperationBadge from '@/components/entities/operation-badge.vue'
import CompEntityActiveBadge from '@/components/entities/is-active-badge.vue'

defineProps<{
  task: T_TaskCrawlNewPostingsWithStatus
  highlight: boolean
}>()
</script>

<template>
  <RouterLink
    class="task-item"
    :class="{ 'task-item--highlight': highlight }"
    :to="{
      params: { [E_ROUTER_PARAMS.TASK_ID]: task.id },
      name: E_ROUTER_PAGES.TASKS_CRAWL_NEW_POSTINGS_TASK
    }">
    <div>
      <p class="hh-font-bold">{{ task.source.replaceAll('-', ' ') }}</p>
      <p class="hh-text-2xs">{{ task.options.location }}</p>
    </div>

    <div class="task-item__types">
      <CompEntityOperationBadge :posting-operation="task.options.postingOperation" />
      <CompEntityPostingTypesBadges :posting-types="task.options.postingTypes" />
      <CompEntityActiveBadge :entity="task" />
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
.task-item {
  background-color: var(--color-background-light);
  padding: var(--spacing-sm) var(--spacing-xs);
  border: solid 1px transparent;
  border-bottom-color: var(--color-border);
  justify-content: space-between;
  align-items: center;
  display: flex;

  &__types {
    gap: var(--spacing-2xs);
    align-items: center;
    display: flex;
  }

  &:first-child {
    border-top-right-radius: var(--radius-md);
    border-top-left-radius: var(--radius-md);
  }

  &--highlight {
    border-color: var(--color-border-active);
  }
}
</style>