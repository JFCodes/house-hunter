<script setup lang="ts">
// Components
import CompUiBadge from '@/components/ui/ui-badge.vue'
import type { T_PostingOperation } from '@house-hunter/types';

defineProps<{ postingOperation: T_PostingOperation }>()
</script>

<template>
  <CompUiBadge>
    {{ $t(`enums.postingOperation.${postingOperation}`) }}
  </CompUiBadge>
</template>
