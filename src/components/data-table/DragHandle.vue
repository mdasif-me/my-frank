<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { IconGripVertical } from '@tabler/icons-vue';
import { useSortableContext } from 'dnd-kit-vue';

const { handleRef } = useSortableContext();
</script>

<template>
  <Button
    :ref="handleRef"
    variant="ghost"
    size="icon"
    class="text-muted-foreground size-7 hover:bg-transparent"
  >
    <IconGripVertical class="text-muted-foreground size-3" />
    <span class="sr-only">Drag to reorder</span>
  </Button>
</template>
