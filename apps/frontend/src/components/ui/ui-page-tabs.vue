<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'

// App
import type { UiPageTab, UiPageTabRoute } from '@/components/ui/types'

defineProps<{
  tabs: Array<UiPageTab | UiPageTabRoute>
}>()

const route = useRoute()

const tabIsActive = (tab: UiPageTab | UiPageTabRoute): boolean => {
  if ('to' in tab) {
    if (typeof tab.to !== 'string') {
      let hasSameName = false
      let hasSameParams = true

      if ('name' in tab.to) hasSameName = tab.to.name === route.name
      if ('params' in tab.to) {
        hasSameParams = JSON.stringify(tab.to.params) === JSON.stringify(route.params)
      }

      return hasSameName && hasSameParams
    }
  }

  return false
  // TODO: check active tab key prop
}

</script>

<template>
  <div class="tabs">
    <component
      v-for="tab in tabs"
      class="tabs__tab"
      :class="{ 'tabs__tab--active': tabIsActive(tab) }"
      :to="'to' in tab ? tab.to : undefined"
      :is="'to' in tab ? RouterLink : 'div'"
      :key="tab.key">

      <component v-if="tab.icon" :is="tab.icon" size="16" />

      <p class="hh-font-bold">{{ tab.label }}</p>

      <div v-if="tab.badge" class="tabs__tab-badge hh-text-2xs">
        {{ tab.badge }}
      </div>

    </component>
  </div>
</template>

<style lang="scss" scoped>
.tabs {
  border-bottom: solid 1px var(--color-border);
  padding-top: var(--spacing-2xs);
  display: flex;

  &__tab {
    align-items: center;
    padding: var(--spacing-3xs) var(--spacing-sm);
    border-bottom: solid 2px transparent;
    gap: var(--spacing-xs);
    margin-bottom: -1px;
    display: flex;
    height: 40px;

    &-badge {
      line-height: 20px;
      height: 20px;
      background-color: var(--color-border-active);
      border-radius: 11px;
      padding: 0 var(--spacing-2xs);
    }

    &--active {
      border-bottom-color: var(--color-border-active);
    }
  }
}
</style>
