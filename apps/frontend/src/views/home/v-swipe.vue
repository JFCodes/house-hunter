<script setup lang="ts">
import { E_AD_STATUS, type T_Ad } from '@house-hunter/data-model'
import { computed, ref } from 'vue'
// App
import { useAdsStore } from '@/stores/ads'
// Component
import CompEntityAdStatusPicker from '@/components/entities/ad/status-picker.vue'
import CompPageSwipeItem from '@/components/pages/swipe/s-item.vue'
import CompUiLoading from '@/components/ui/ui-loading.vue'
import CompUiEmpty from '@/components/ui/ui-empty.vue'

const adsStore = useAdsStore()

const adStatusToSwipe = ref<E_AD_STATUS>(E_AD_STATUS.NEW)
const isUpdating = ref(false)
const activeIndex = ref(0)

const adsToClassify = computed<Array<T_Ad>>(() => {
  return adsStore.ads.filter(p => p.status === adStatusToSwipe.value)
})

const activeAd = computed<null | T_Ad>(() => {
  return adsToClassify.value[activeIndex.value] ?? null
})

const updateStatus = (status: E_AD_STATUS): void => {
  if (!activeAd.value) return

  isUpdating.value = true
  adsStore
    .patch(activeAd.value.id, { status })
    .finally(() => isUpdating.value = false)
}
</script>

<template>
  <CompUiLoading v-if="adsStore.isLoading || isUpdating" />

  <div class="swipe">
    <div class="--group">
      <p class="--font-bold">{{ $t('pages.swipe.statusPicker') }}:</p>
      <CompEntityAdStatusPicker
        :active-status="adStatusToSwipe"
        @status-change="status => adStatusToSwipe = status" />
    </div>

    <div v-if="adsToClassify.length === 0" class="--pt-3xl">
      <CompUiEmpty>
        <p class="--text-lg">{{ $t('pages.swipe.emptyMessage1') }}</p>
        <p class="--text-md --font-bold">
          {{ $t('pages.swipe.emptyMessage2', { status: $t(`enums.adStatus.${adStatusToSwipe}`) }) }}
        </p>
      </CompUiEmpty>
    </div>

    <template v-else>
      <div class="">
        <p class="--text-lg --font-bold --text-center --mb-2xs">
          {{ $t('pages.swipe.postsLeft', { count: adsToClassify.length }) }}
        </p>
      </div>
      <CompPageSwipeItem v-if="activeAd" :ad="activeAd" @pick-status="updateStatus" />
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