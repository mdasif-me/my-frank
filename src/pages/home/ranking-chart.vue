<script setup lang="ts">
import type { ChartConfig } from '@/components/ui/chart';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from '@/components/ui/chart';
import { Donut } from '@unovis/ts';
import { VisDonut, VisSingleContainer } from '@unovis/vue';
import { computed } from 'vue';

const chartData = [
  { browser: 'visitors', visitors: 90, fill: 'var(--color-primary)' },
  { browser: 'other', visitors: 10, fill: 'var(--color-muted)' },
];
type Data = (typeof chartData)[number];

const chartConfig = {
  visitors: {
    label: 'Visitors',
    color: 'var(--primary)',
  },
  other: {
    label: 'Other',
    color: 'var(--border)',
  },
} satisfies ChartConfig;

const visitorPercentage = computed(() => {
  const visitorCount =
    chartData.find((d) => d.browser === 'visitors')?.visitors || 0;
  return visitorCount;
});
</script>

<template>
  <ChartContainer
    :config="chartConfig"
    class="mx-auto aspect-square max-h-[108px]"
    :style="{
      '--vis-donut-central-label-font-size': 'var(--text-3xl)',
      '--vis-donut-central-label-font-weight': 'var(--font-weight-bold)',
      '--vis-donut-central-label-text-color': 'var(--foreground)',
      '--vis-donut-central-sub-label-text-color': 'var(--muted-foreground)',
    }"
  >
    <VisSingleContainer :data="chartData">
      <VisDonut
        :value="(d: Data) => d.visitors"
        :color="(d: Data) => chartConfig[d.browser as keyof typeof chartConfig].color"
        :arc-width="12"
        :central-label-offset-y="10"
        :central-label="visitorPercentage + '%'"
        :cornerRadius="5"
        central-sub-label="Visitors"
      />
      <ChartTooltip
        :triggers="{
              [Donut.selectors.segment]: componentToString(chartConfig, ChartTooltipContent, { hideLabel: true })!,
            }"
      />
    </VisSingleContainer>
  </ChartContainer>
</template>
