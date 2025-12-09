<script setup lang="ts">
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import Feature from '../components/header/Feature.vue';

const { open } = useSidebar();
</script>

<template>
  <header
    class="bg-white sticky top-0 flex h-20 shrink-0 items-center gap-2 border-b px-4 z-50"
  >
    <SidebarTrigger
      :class="{
        'lg:-ml-8': open,
      }"
      class="text-secondary-foreground bg-background p-2 rounded-full"
    />
    <Feature />
  </header>
</template>
