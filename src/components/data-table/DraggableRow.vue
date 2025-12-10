<script setup lang="ts">
import { TableCell, TableRow } from '@/components/ui/table';
import type { Row } from '@tanstack/vue-table';
import { FlexRender } from '@tanstack/vue-table';
import { useSortable } from 'dnd-kit-vue';

const props = defineProps<{
  row: Row<any>;
  index: number;
}>();

const rowId = String(props.row.original.id);
const { elementRef, isDragging } = useSortable({
  id: rowId,
  index: props.index,
});
</script>

<template>
  <TableRow
    :ref="elementRef"
    :data-state="row.getIsSelected() && 'selected'"
    :data-dragging="isDragging"
    class="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
  >
    <TableCell
      v-for="cell in row.getVisibleCells()"
      :key="cell.id"
      class="text-center"
    >
      <FlexRender
        :render="cell.column.columnDef.cell"
        :props="cell.getContext()"
      />
    </TableCell>
  </TableRow>
</template>
