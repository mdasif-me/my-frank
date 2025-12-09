<script setup lang="ts">
import { ArrowRight02Icon } from '@hugeicons-pro/core-solid-rounded';
import { HugeiconsIcon } from '@hugeicons/vue';
import Button from '../ui/button/Button.vue';
</script>

<template>
  <div
    class="bg-foreground rounded-xl p-3 border border-border h-13 flex items-center justify-between"
  >
    <div class="flex items-center gap-4">
      <Button
        class="btn-gradient text-foreground text-base font-medium"
        size="sm"
        >New Feature<HugeiconsIcon class="size-4" :icon="ArrowRight02Icon"
      /></Button>
      <p class="text-gradient font-semibold text-base">
        Control Center is now live !
      </p>
    </div>
  </div>
</template>
