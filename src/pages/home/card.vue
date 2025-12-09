<script setup lang="ts">
import {
  Calendar01Icon,
  StarIcon,
  StarOffIcon,
  UserCheck02Icon,
} from '@hugeicons-pro/core-stroke-standard';
import { HugeiconsIcon } from '@hugeicons/vue';

const items = [
  {
    title: 'Total Reviews',
    value: '57',
    icon: StarIcon,
  },
  {
    title: 'Average Rating',
    value: '4.5',
    icon: StarOffIcon,
  },
  {
    title: 'Active Members',
    value: '69',
    icon: UserCheck02Icon,
  },
  {
    title: 'Total Campaign',
    value: '01',
    icon: Calendar01Icon,
  },
];
</script>
<template>
  <div class="flex items-center gap-6 justify-between w-full">
    <div
      v-for="item in items"
      :key="item.title"
      class="border w-full min-h-32 bg-white border-border rounded-2xl py-5 px-6 flex items-center gap-2"
    >
      <article class="flex items-start gap-2">
        <div
          class="size-10 p-2 flex items-center justify-center aspect-square bg-background rounded-full"
        >
          <HugeiconsIcon class="size-5" :icon="item.icon" />
        </div>

        <div class="mt-2">
          <h2 class="text-base font-medium text-[#334155]">
            {{ item.title }}
          </h2>
          <h3 class="mt-2.5 text-[#0F172A] text-2xl font-semibold">
            {{ item.value }}
          </h3>
        </div>
      </article>
    </div>
  </div>
</template>
