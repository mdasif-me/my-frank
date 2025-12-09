<script setup lang="ts">
import { Add01Icon } from '@hugeicons-pro/core-stroke-rounded';

import Button from '../../components/ui/button/Button.vue';
import Card from './card.vue';
</script>

<template>
  <section class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold leading-8">
        Good morning, Forhad Sheikh 👋
      </h1>
      <Button class="">
        <HugeiconsIcon class="size-3.5" :icon="Add01Icon" />
        Add Member
      </Button>
    </div>
    <Card />
  </section>
</template>
