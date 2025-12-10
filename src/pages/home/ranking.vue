<script setup lang="ts">
import Badge from '@/components/ui/badge/Badge.vue';
import ButtonGroup from '@/components/ui/button-group/ButtonGroup.vue';
import Button from '@/components/ui/button/Button.vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Slider from '@/components/ui/slider/Slider.vue';
import { Delete02Icon, Edit03Icon } from '@hugeicons-pro/core-stroke-rounded';
import { HugeiconsIcon } from '@hugeicons/vue';
</script>

<template>
  <section class="space-y-4 max-h-[636px] flex-1 overflow-y-auto">
    <Card v-for="n in Array.from({ length: 4 }, (_, i) => i + 1)" :key="n">
      <CardHeader class="flex items-center justify-between w-full">
        <CardTitle class="text-2xl font-semibold"
          >July Review Challenge
        </CardTitle>
        <div class="flex items-center gap-3">
          <Badge
            class="text-base border-[#8AB1F5] px-4 text-primary font-medium bg-[#E6EEFD] rounded-full py-1"
            variant="outline"
          >
            In progress
          </Badge>
          <ButtonGroup>
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
          <h1 class="text-2xl font-semibold">🎁 €50 Gift Card</h1>
          <Button variant="outline" class="bg-white"> 3 more reward </Button>
        </div>
        <div class="flex items-center gap-4">
          <p class="text-sm font-medium">Top Performer</p>
          <button class="text-sm font-semibold btn-gradient-card">
            🥇 Paul Bertel
          </button>
        </div>
        <Slider :default-value="[33]" :max="100" :step="1" />
        <div class="flex items-center justify-between w-full gap-2">
          <article class="flex items-center gap-2">
            <p class="text-base">Start Date:</p>
            <p class="text-base font-medium">10 Days Left</p>
          </article>
          <p class="text-base">⏰ 5 Days left</p>
        </div>
      </CardContent>
    </Card>
  </section>
</template>
