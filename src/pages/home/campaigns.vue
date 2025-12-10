<script setup lang="ts">
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Add01Icon } from '@hugeicons-pro/core-stroke-rounded';
import { HugeiconsIcon } from '@hugeicons/vue';
import Button from '../../components/ui/button/Button.vue';
</script>

<template>
  <Card>
    <CardHeader class="flex items-center justify-between w-full">
      <CardTitle>My Campaigns</CardTitle>
      <Button
        ><HugeiconsIcon class="size-4 shrink-0" :icon="Add01Icon" />Create New
        Campaign</Button
      >
    </CardHeader>
    <CardContent>
      <p>Card Content</p>
    </CardContent>
    <CardFooter>
      <p>Card Footer</p>
    </CardFooter>
  </Card>
</template>
