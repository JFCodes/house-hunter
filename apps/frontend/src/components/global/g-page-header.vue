<script setup lang="ts">
// Components
import UiIconButton from '@/components/ui/ui-icon-button.vue'
import { E_ROUTER_PAGES } from '@/router/enums';
import { MonitorCog, Home } from '@lucide/vue'
</script>

<template>
  <header class="header hh-py-xs">
    <p class="hh-font-bold">House Hunter</p>
    <div class="header__actions">
      <UiIconButton :link-to="{ name: E_ROUTER_PAGES.HOME }" :icon="Home" />
      <UiIconButton :link-to="{ name: E_ROUTER_PAGES.SETTINGS }" :icon="MonitorCog" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  justify-content: space-between;
  gap: var(--spacing-sm);
  align-items: center;
  display: flex;
  border-bottom: solid 1px var(--color-border);

  &__actions {
    gap: var(--spacing-xs);
    align-items: center;
    display: flex;
  }
}
</style>
