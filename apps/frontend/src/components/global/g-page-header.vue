<script setup lang="ts">
import { type RouteLocationRaw, useRoute } from 'vue-router'
import { type Component, computed } from 'vue'
// App
import { useTasksStore } from '@/stores/tasks'
import { E_ROUTER_PAGES } from '@/router/enums'
// Components
import { MonitorCog, BellDot, IdCard, Cctv, Home } from '@lucide/vue'
import CompEntityTaskActiveTaskExecution from '@/components/entities/tasks/active-task-execution.vue'
import CompEntityTaskLastTaskExecution from '@/components/entities/tasks/last-task-execution.vue'
import CompUiIconButton from '@/components/ui/ui-icon-button.vue'

type Link = {
  to: RouteLocationRaw,
  name: E_ROUTER_PAGES,
  isActive: boolean,
  icon: Component
}

const tasksStore = useTasksStore()
const route = useRoute()

const links = computed<Array<Link>>(() => {
  const notificationsLink = getLinkItem(E_ROUTER_PAGES.NOTIFICATIONS, BellDot)
  const tasksLink = getLinkItem(E_ROUTER_PAGES.DISCOVERY_TASKS_LIST, Cctv)
  const settingsLink = getLinkItem(E_ROUTER_PAGES.SETTINGS, MonitorCog)
  const homeLink = getLinkItem(E_ROUTER_PAGES.HOME, Home)
  const adsLink = getLinkItem(E_ROUTER_PAGES.ADS, IdCard)


  return [homeLink, adsLink, tasksLink, notificationsLink, settingsLink]
})

const getLinkItem = (name: E_ROUTER_PAGES, icon: Component): Link => ({
  isActive: checkLinkIsActive(name),
  to: { name },
  name,
  icon
})

const checkLinkIsActive = (name: E_ROUTER_PAGES): boolean => {
  if (route.name === name) return true
  return route.matched.some(m => m.name === name)
}

</script>

<template>
  <header class="header">
    <div class="header__content --container-page">

      <p class="--text-md --font-bold --text-white">HOUSE HUNTER</p>

      <div class="header__content-middle --group">
        <CompEntityTaskActiveTaskExecution
          v-if="tasksStore.activeTaskExecution"
          :execution="tasksStore.activeTaskExecution" />

        <CompEntityTaskLastTaskExecution
          v-else-if="tasksStore.lastTaskExecution"
          :execution="tasksStore.lastTaskExecution.execution"
          :result="tasksStore.lastTaskExecution.result" />
      </div>

      <div class="--group">
        <CompUiIconButton
          v-for="link in links"
          :type="link.isActive ? 'light' : 'link'"
          :link-to="link.to"
          :icon="link.icon"
          :key="link.name" />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  background-color: var(--c-background-surface);
  border-bottom: solid 1px var(--c-border);

  &__content {
    align-items: center;
    gap: var(--s-sm);
    display: flex;

    &-middle {
      border-left: solid 1px var(--c-border);
      padding: var(--s-sm);
      height: 52px;

      flex: 1;
    }
  }
}
</style>
