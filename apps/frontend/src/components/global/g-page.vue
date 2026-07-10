<script setup lang="ts">
// Components
import CompGlobalPageHeader from '@/components/global/g-page-header.vue'
</script>

<template>
  <div class="page  hh-px-3xl">
    <div class="page__grid">
      <CompGlobalPageHeader />

      <div class="page__grid-content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  overflow: hidden;
  height: 100%;
  width: 100%;

  &__grid {
    grid-template-rows: auto 1fr;
    gap: var(--spacing-xs);
    max-width: 1480px;
    overflow: hidden;
    margin: 0 auto;
    display: grid;
    height: 100%;
    width: 100%;

    &-content {
      position: relative;
    }
  }
}
</style>