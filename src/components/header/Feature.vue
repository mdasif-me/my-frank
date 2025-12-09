<script setup lang="ts">
import { ArrowRight02Icon } from '@hugeicons-pro/core-solid-rounded';
import { Store01Icon } from '@hugeicons-pro/core-stroke-rounded';
import Button from '../ui/button/Button.vue';
import Combobox from '../ui/combobox/Index.vue';

let selectedFramework = '';

const frameworks = [
  {
    value: 'frank',
    label: 'Frank',
    icon: Store01Icon,
  },
];
</script>

<template>
  <section class="flex items-center justify-between w-full">
    <div
      class="bg-foreground rounded-lg p-3 border border-border h-13 flex items-center"
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

    <div>
      <Combobox
        class="h-12 bg-white font-medium"
        model-value="frank"
        :options="frameworks"
        placeholder="Choose a framework..."
        search-placeholder="Search frameworks..."
        @update:model-value="(val: string) => (selectedFramework = val)"
      />
      <p v-if="selectedFramework" class="text-base text-muted-foreground">
        Selected: <strong>{{ selectedFramework }}</strong>
      </p>
    </div>
  </section>
</template>
