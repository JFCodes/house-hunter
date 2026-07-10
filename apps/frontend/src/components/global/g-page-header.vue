<script setup lang="ts">
import { type RouteLocationRaw, useRoute } from 'vue-router'
import { type Component, computed } from 'vue'
// App
import { E_ROUTER_PAGES } from '@/router/enums'
// Components
import UiIconButton from '@/components/ui/ui-icon-button.vue'
import { MonitorCog, Home, Cctv, BellDot } from '@lucide/vue'

type Link = {
  to: RouteLocationRaw,
  name: E_ROUTER_PAGES,
  isActive: boolean,
  icon: Component
}

const route = useRoute()

const links = computed<Array<Link>>(() => {
  const notificationsLink = getLinkItem(E_ROUTER_PAGES.NOTIFICATIONS, BellDot)
  const settingsLink = getLinkItem(E_ROUTER_PAGES.SETTINGS, MonitorCog)
  const tasksLink = getLinkItem(E_ROUTER_PAGES.TASKS, Cctv)
  const homeLink = getLinkItem(E_ROUTER_PAGES.HOME, Home)

  return [homeLink, tasksLink, notificationsLink, settingsLink]
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
  <header class="header hh-py-xs">
    <p class="hh-font-bold">HOUSE HUNTER</p>

    <div class="header__actions">
      <UiIconButton
        v-for="link in links"
        :is-active="link.isActive"
        :link-to="link.to"
        :icon="link.icon"
        :key="link.name" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  border-bottom: solid 1px var(--color-border);
  justify-content: space-between;
  gap: var(--spacing-sm);
  align-items: center;
  display: flex;

  &__actions {
    gap: var(--spacing-xs);
    align-items: center;
    display: flex;
  }
}
</style>
