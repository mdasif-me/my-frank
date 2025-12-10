<script setup lang="ts">
import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>

<template>
  <td
    data-slot="table-cell"
    :class="
      cn(
        'text-[#0F172A] h-[72px] px-6 py-3 font-medium align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5',
        props.class
      )
    "
  >
    <slot />
  </td>
</template>
