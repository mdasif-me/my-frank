<script setup lang="ts">
import { useStatsStore } from '@/stores/statsStore';
import {
  Calendar01Icon,
  StarIcon,
  StarOffIcon,
  UserCheck02Icon,
} from '@hugeicons-pro/core-stroke-standard';
import { HugeiconsIcon } from '@hugeicons/vue';
import { computed, onMounted } from 'vue';

const statsStore = useStatsStore();

onMounted(() => {
  statsStore.fetchStats();
});

const iconMap: Record<string, any> = {
  star: StarIcon,
  'star-off': StarOffIcon,
  'user-check': UserCheck02Icon,
  calendar: Calendar01Icon,
};

const items = computed(() =>
  statsStore.stats.map((stat) => ({
    title: stat.title,
    value: stat.value,
    icon: iconMap[stat.icon] || StarIcon,
  }))
);
</script>
<template>
  <div class="flex items-center md:gap-6 gap-4 justify-between w-full">
    <div
      v-for="(item, index) in items"
      :key="item.title"
      :class="{ 'hidden md:flex': index >= 2 }"
      class="border w-full min-h-32 bg-white border-border rounded-2xl md:py-5 py-4 md:px-6 px-5 flex items-center gap-2"
    >
      <article class="flex items-start gap-2">
        <div
          class="md:size-10 size-6 md:p-2 p-1 flex items-center justify-center aspect-square bg-background rounded-full"
        >
          <HugeiconsIcon class="size-5" :icon="item.icon" />
        </div>

        <div class="md:mt-2 mt-1">
          <h2
            class="md:text-base text-sm md:font-medium font-normal whitespace-nowrap text-[#334155]"
          >
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
