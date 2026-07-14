<script setup lang="ts">
import { E_POSTING_USER_STATUS, type T_Posting } from '@house-hunter/types'
import { computed, ref } from 'vue'
// App
import { usePostingsStore } from '@/stores/postings'
// Component
import CompEntityPostingStatusPicker from '@/components/entities/posting/status-picker.vue'
import CompPageSwipeItem from '@/components/pages/swipe/s-item.vue'
import CompUiLoading from '@/components/ui/ui-loading.vue'
import CompUiEmpty from '@/components/ui/ui-empty.vue'

const postingsStore = usePostingsStore()

const postingsStatusToSwipe = ref<E_POSTING_USER_STATUS>(E_POSTING_USER_STATUS.NEW)
const isUpdating = ref(false)
const activeIndex = ref(0)

const postsToClassify = computed<Array<T_Posting>>(() => {
  return postingsStore
    .postings
    .filter(p => p._houseHunterFields.userStatus === postingsStatusToSwipe.value)
})

const activePost = computed<null | T_Posting>(() => {
  return postsToClassify.value[activeIndex.value] ?? null
})

const updateStatus = (userStatus: E_POSTING_USER_STATUS): void => {
  if (!activePost.value) return

  isUpdating.value = true
  postingsStore
    .updateHunterFields(activePost.value.id, { userStatus })
    .finally(() => isUpdating.value = false)
}

</script>

<template>
  <CompUiLoading v-if="isUpdating" />

  <div class="swipe">
    <div class="hh-py-lg hh-group">
      <p class="hh-font-bold">{{ $t('pages.swipe.statusPicker') }}:</p>
      <CompEntityPostingStatusPicker
        class=""
        :active-status="postingsStatusToSwipe" />
    </div>

    <div v-if="postsToClassify.length === 0" class="hh-pt-3xl">
      <CompUiEmpty>
        <p class="hh-text-lg">{{ $t('pages.swipe.emptyMessage1') }}</p>
        <p class="hh-text-md hh-font-bold">
          {{ $t('pages.swipe.emptyMessage2', { status: $t(`enums.postingStatus.${postingsStatusToSwipe}`) }) }}
        </p>
      </CompUiEmpty>
    </div>

    <template v-else>
      <div class="">
        <p class="hh-text-lg hh-font-bold hh-text-center hh-mb-xs">
          {{ $t('pages.swipe.postsLeft', { count: postsToClassify.length }) }}
        </p>

      </div>
      <CompPageSwipeItem
        v-if="activePost"
        :posting="activePost"
        @pick-status="updateStatus" />

    </template>
  </div>
</template>

<style lang="scss" scoped>
.swipe {
  overflow-y: auto;
  height: 100%;
  width: 100%;
}
</style>