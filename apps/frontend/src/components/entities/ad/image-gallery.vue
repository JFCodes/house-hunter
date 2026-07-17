<script setup lang="ts">
import type { T_Ad } from '@house-hunter/data-model'
import { computed, ref, watch } from 'vue'
// Components
import CompUiEmpty from '@/components/ui/ui-empty.vue'

const props = defineProps<{ ad: T_Ad }>()

const galleryRef = ref<null | HTMLDivElement>(null)
const activeIndex = ref(0)

const activeImage = computed<null | string>(() => {
  return props.ad.images[activeIndex.value] ?? null
})

watch(galleryRef, value => value && value.focus(), { immediate: true })

const moveLeft = (): void => {
  activeIndex.value = activeIndex.value === 0
    ? activeIndex.value = props.ad.images.length - 1
    : activeIndex.value - 1
}

const moveRight = (): void => {
  activeIndex.value = activeIndex.value < props.ad.images.length - 1
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

    <div class="gallery__image --mb-sm">
      <CompUiEmpty v-if="ad.images.length === 0 || !activeImage">
        <p>{{ $t('empty.noPostingImages') }}</p>
      </CompUiEmpty>
      <img v-if="activeImage" class="gallery__image-img" :src="activeImage" />

    </div>

    <div class="gallery__dots">
      <span
        v-for="index in ad.images.length"
        :key="index"
        class="gallery__dots-dot --pointer"
        :class="{ 'gallery__dots-dot--active': activeIndex === index - 1 }"
        @click="activeIndex = index - 1">
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.gallery {
  background-color: var(--c-gray-700);
  border-radius: var(--radius-md);
  padding: var(--s-xs);
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
    align-items: center;
    gap: var(--s-2xs);
    display: flex;

    &-dot {
      background-color: var(--c-gray-300);
      display: inline-block;
      border-radius: 5px;
      height: 10px;
      width: 10px;

      &--active {
        background-color: var(--c-orange-2);
        transform: scale(1.2);
      }
    }
  }
}
</style>
