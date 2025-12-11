<script setup lang="ts">
import Badge from '@/components/ui/badge/Badge.vue';
import ButtonGroup from '@/components/ui/button-group/ButtonGroup.vue';
import Button from '@/components/ui/button/Button.vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Slider from '@/components/ui/slider/Slider.vue';
import { useRankingStore } from '@/stores/rankingStore';
import { Delete02Icon, Edit03Icon } from '@hugeicons-pro/core-stroke-rounded';
import { HugeiconsIcon } from '@hugeicons/vue';
import { computed, onMounted } from 'vue';

const rankingStore = useRankingStore();

onMounted(() => {
  rankingStore.fetchRankings();
});

const rankings = computed(() => rankingStore.rankings);

const getStatusColor = (status: string) => {
  if (status === 'in-progress') {
    return 'text-primary bg-[#E6EEFD] border-[#8AB1F5]';
  }
  return 'text-green-600 bg-green-50 border-green-200';
};

const getStatusText = (status: string) => {
  if (status === 'in-progress') return 'In progress';
  return 'Completed';
};
</script>

<template>
  <section
    class="space-y-4 md:max-h-[636px] md:min-h-[636px] flex-1 overflow-y-auto"
  >
    <div v-if="rankingStore.loading" class="text-center py-8">
      <p class="text-muted-foreground">Loading campaigns...</p>
    </div>
    <div v-else-if="rankingStore.error" class="text-center py-8">
      <p class="text-red-500">{{ rankingStore.error }}</p>
    </div>
    <Card
      v-for="(ranking, index) in rankings"
      :class="{ 'hidden md:flex': index >= 3 }"
      :key="ranking.id"
    >
      <CardHeader class="flex items-center justify-between w-full">
        <CardTitle class="md:text-2xl text-base font-medium md:font-semibold">
          {{ ranking.title }}
        </CardTitle>
        <div class="flex items-center gap-3">
          <Badge
            :class="`md:text-base text-sm border-[#8AB1F5] md:px-4 px-2 md:font-medium rounded-full py-1 ${getStatusColor(
              ranking.status
            )}`"
            variant="outline"
          >
            {{ getStatusText(ranking.status) }}
          </Badge>
          <ButtonGroup class="md:block hidden">
            <Button variant="outline" class="bg-white rounded-full">
              <HugeiconsIcon
                class="size-4 text-[#475569] shrink-0"
                :icon="Delete02Icon"
                :stroke-width="2.5"
              />
            </Button>
            <Button variant="outline" class="bg-white rounded-full">
              <HugeiconsIcon
                class="size-4 text-[#475569] shrink-0"
                :icon="Edit03Icon"
                :stroke-width="2.5"
              />
            </Button>
          </ButtonGroup>
        </div>
      </CardHeader>
      <CardContent class="space-y-5">
        <div class="flex items-center gap-2">
          <h1 class="md:text-2xl text-base font-semibold">
            🎁 {{ ranking.reward }}
          </h1>
          <Button
            variant="outline"
            class="bg-white md:px-4 px-2 md:py-2 py-1 md:text-base text-sm"
          >
            3 more reward
          </Button>
        </div>
        <div class="flex items-center gap-4">
          <p class="text-sm font-medium">Top Performer</p>
          <button class="text-sm font-semibold btn-gradient-card">
            🥇 {{ ranking.topPerformer }}
          </button>
        </div>
        <Slider :default-value="[ranking.progress]" :max="100" :step="1" />
        <div class="flex items-center justify-between w-full gap-2">
          <article class="flex items-center gap-2">
            <p class="text-base">Start Date:</p>
            <p class="text-base font-medium">
              {{ ranking.daysLeft }} Days Left
            </p>
          </article>
          <p class="text-base">⏰ {{ ranking.timeLeft }}</p>
        </div>
      </CardContent>
    </Card>
  </section>
</template>
