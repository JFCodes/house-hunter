<script setup lang="ts">
import type { T_TASK_CrawlNewPostings } from '@house-hunter/types'
// App
import { E_ROUTER_PAGES, E_ROUTER_PARAMS } from '@/router/enums'
// Components
import CompUiCard from '@/components/ui/ui-card.vue'
import CompEntityPostingTypesBadges from '@/components/entities/posting/types-badges.vue'
import CompEntityTaskStatusBadge from '@/components/entities/tasks/status-badge.vue'
import CompEntityOperationBadge from '@/components/entities/operation-badge.vue'

defineProps<{
  task: T_TASK_CrawlNewPostings
  highlight: boolean
}>()
</script>

<template>
  <RouterLink
    class="--no-focus-visible"
    :to="{
      params: { [E_ROUTER_PARAMS.TASK_ID]: task.id },
      name: E_ROUTER_PAGES.TASKS_CRAWL_NEW_POSTINGS_TASK
    }">
    <CompUiCard :highlight="highlight">
      <p class="--font-bold --text-white">{{ task.source.replaceAll('-', ' ') }}</p>
      <p class="--text-sm">{{ task.options.location }}</p>

      <div class="--group --mt-sm">
        <CompEntityOperationBadge :posting-operation="task.options.postingOperation" />
        <CompEntityPostingTypesBadges :posting-types="task.options.postingTypes" />
        <CompEntityTaskStatusBadge :status="task.status" />
      </div>
    </CompUiCard>
  </RouterLink>
</template>
