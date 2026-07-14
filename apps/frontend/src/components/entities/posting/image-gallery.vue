<script setup lang="ts">
import type { T_PostingImages } from '@house-hunter/types'
import { computed, ref, watch } from 'vue'
// Components
import CompUiEmpty from '@/components/ui/ui-empty.vue'

const props = defineProps<{ images: T_PostingImages }>()

const galleryRef = ref<null | HTMLDivElement>(null)
const activeIndex = ref(0)

const activeImage = computed<null | string>(() => {
  return props.images.images[activeIndex.value] ?? null
})

watch(galleryRef, value => value && value.focus(), { immediate: true })

const moveLeft = (): void => {
  activeIndex.value = activeIndex.value === 0
    ? activeIndex.value = props.images.images.length - 1
    : activeIndex.value - 1
}

const moveRight = (): void => {
  activeIndex.value = activeIndex.value < props.images.images.length - 1
    ? activeIndex.value + 1
    : 0
}
</script>

<template>
  <div
    ref="galleryRef"
    class="gallery"
    tabindex="-1"
    @keydown.right="moveRight"
    @keydown.left="moveLeft">

    <div class="gallery__image hh-mb-md">
      <CompUiEmpty v-if="images.images.length === 0 || !activeImage">
        <p>{{ $t('empty.noPostingImages') }}</p>
      </CompUiEmpty>
      <img v-if="activeImage" class="gallery__image-img" :src="activeImage" />

    </div>

    <div class="gallery__dots">
      <span
        v-for="index in images.images.length"
        :key="index"
        class="gallery__dots-dot hh-pointer"
        :class="{ 'gallery__dots-dot--active': activeIndex === index - 1 }"
        @click="activeIndex = index - 1">
      </span>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.gallery {
  background-color: var(--color-background-light);
  border: solid 1px var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-xs);
  height: 100%;
  width: 100%;

  &__image {
    height: 600px;
    width: 600px;

    &-img {
      object-position: center center;
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }

  &__dots {
    justify-content: center;
    gap: var(--spacing-2xs);
    align-items: center;
    display: flex;

    &-dot {
      background-color: var(--color-text-muted);
      display: inline-block;
      border-radius: 6px;
      height: 12px;
      width: 12px;

      &--active {
        background-color: var(--color-border-active);
      }
    }
  }
}
</style>
