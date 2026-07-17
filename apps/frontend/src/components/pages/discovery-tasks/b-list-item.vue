<script setup lang="ts">
import type { T_DiscoveryTask } from '@house-hunter/data-model'
// App
import { E_ROUTER_PAGES, E_ROUTER_PARAMS } from '@/router/enums'
// Components
import CompUiCard from '@/components/ui/ui-card.vue'
import CompEntityAdBuildingTypeBadge from '@/components/entities/ad/building-type-badge.vue'
import CompEntityAdTypeBadge from '@/components/entities/ad/type-badge.vue'
import CompEntityDiscoveryStatusBadge from '@/components/entities/discovery-task/status-badge.vue'

defineProps<{
  task: T_DiscoveryTask
  highlight: boolean
}>()
</script>

<template>
  <RouterLink
    class="--no-focus-visible"
    :to="{
      params: { [E_ROUTER_PARAMS.TASK_ID]: task.id },
      name: E_ROUTER_PAGES.DISCOVERY_TASKS_LIST_TASK
    }">
    <CompUiCard :highlight="highlight">
      <p class="--font-bold --text-white">{{ task.target.replaceAll('-', ' ') }}</p>
      <p class="--text-sm">{{ task.options.location }}</p>

      <div class="--group --mt-sm">
        <CompEntityAdTypeBadge :ad-type="task.options.addType" />
        <CompEntityAdBuildingTypeBadge :building-types="task.options.buildingTypes" />
        <CompEntityDiscoveryStatusBadge :status="task.status" />
      </div>
    </CompUiCard>
  </RouterLink>
</template>
