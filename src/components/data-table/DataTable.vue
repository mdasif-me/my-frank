<script setup lang="ts">
import { RestrictToVerticalAxis } from '@dnd-kit/abstract/modifiers';
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconDotsVertical,
  IconLayoutColumns,
} from '@tabler/icons-vue';
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/vue-table';
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table';
import { DragDropProvider } from 'dnd-kit-vue';
import { h, ref } from 'vue';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import DraggableRow from './DraggableRow.vue';
import DragHandle from './DragHandle.vue';

interface TableData {
  [key: string]: any;
}

interface ButtonAction {
  name: string;
  callback: () => void | Promise<void>;
}

const props = withDefaults(
  defineProps<{
    data: TableData[];
    columns: ColumnDef<TableData>[];
    is_dragable?: boolean;
    is_checked?: boolean;
    is_actions?: boolean;
    is_customize_columns?: boolean;
    buttons?: ButtonAction[];
  }>(),
  {
    is_dragable: false,
    is_checked: false,
    is_actions: false,
    is_customize_columns: false,
    buttons: () => [],
  }
);

const emit = defineEmits<{
  'update:data': [data: TableData[]];
}>();

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});

// Build dynamic columns based on props
const buildColumns = (): ColumnDef<TableData>[] => {
  const dynamicColumns: ColumnDef<TableData>[] = [];

  // Add drag column if enabled
  if (props.is_dragable) {
    dynamicColumns.push({
      id: 'drag',
      header: () => null,
      cell: () => h(DragHandle),
      enableSorting: false,
      enableHiding: false,
    });
  }

  // Add checkbox column if enabled
  if (props.is_checked) {
    dynamicColumns.push({
      id: 'select',
      header: ({ table }) =>
        h(Checkbox, {
          modelValue:
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate'),
          'onUpdate:modelValue': (value) =>
            table.toggleAllPageRowsSelected(!!value),
          'aria-label': 'Select all',
        }),
      cell: ({ row }) =>
        h(Checkbox, {
          modelValue: row.getIsSelected(),
          'onUpdate:modelValue': (value) => row.toggleSelected(!!value),
          'aria-label': 'Select row',
        }),
      enableSorting: false,
      enableHiding: false,
    });
  }

  // Add user-defined columns
  dynamicColumns.push(...props.columns);

  // Add actions column if enabled
  if (props.is_actions) {
    dynamicColumns.push({
      id: 'actions',
      header: () => null,
      cell: () =>
        h(
          DropdownMenu,
          {},
          {
            default: () => [
              h(
                DropdownMenuTrigger,
                { asChild: true },
                {
                  default: () =>
                    h(
                      Button,
                      {
                        variant: 'ghost',
                        class: 'h-8 w-8 p-0',
                      },
                      {
                        default: () => [
                          h('span', { class: 'sr-only' }, 'Open menu'),
                          h(IconDotsVertical, { class: 'h-4 w-4' }),
                        ],
                      }
                    ),
                }
              ),
              h(
                DropdownMenuContent,
                { align: 'end' },
                {
                  default: () => [
                    h(DropdownMenuItem, {}, () => 'Edit'),
                    h(DropdownMenuItem, {}, () => 'Delete'),
                  ],
                }
              ),
            ],
          }
        ),
      enableSorting: false,
      enableHiding: false,
    });
  }

  return dynamicColumns;
};

const handleDragEnd = (event: any) => {
  const { active, over } = event;

  if (over && active.id !== over.id) {
    const activeIndex = props.data.findIndex(
      (item: any) => String(item.id) === String(active.id)
    );
    const overIndex = props.data.findIndex(
      (item: any) => String(item.id) === String(over.id)
    );

    if (activeIndex !== -1 && overIndex !== -1) {
      const newData = [...props.data];
      const [removed] = newData.splice(activeIndex, 1);
      if (removed) {
        newData.splice(overIndex, 0, removed);
        emit('update:data', newData);
      }
    }
  }
};

const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return buildColumns();
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  onSortingChange: (updaterOrValue) => {
    sorting.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(sorting.value)
        : updaterOrValue;
  },
  onColumnFiltersChange: (updaterOrValue) => {
    columnFilters.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(columnFilters.value)
        : updaterOrValue;
  },
  onColumnVisibilityChange: (updaterOrValue) => {
    columnVisibility.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(columnVisibility.value)
        : updaterOrValue;
  },
  onRowSelectionChange: (updaterOrValue) => {
    rowSelection.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(rowSelection.value)
        : updaterOrValue;
  },
  state: {
    get sorting() {
      return sorting.value;
    },
    get columnFilters() {
      return columnFilters.value;
    },
    get columnVisibility() {
      return columnVisibility.value;
    },
    get rowSelection() {
      return rowSelection.value;
    },
  },
});
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <!-- Top Action Bar -->
    <div
      class="flex items-center justify-end gap-2"
      v-if="is_customize_columns || buttons.length > 0"
    >
      <!-- Customize Columns Dropdown -->
      <DropdownMenu v-if="is_customize_columns">
        <DropdownMenuTrigger as-child>
          <Button variant="outline" size="sm">
            <IconLayoutColumns />
            <span class="hidden lg:inline">Columns</span>
            <span class="lg:hidden">Columns</span>
            <IconChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-56">
          <template
            v-for="column in table
              .getAllColumns()
              .filter(
                (column) =>
                  typeof column.accessorFn !== 'undefined' &&
                  column.getCanHide()
              )"
            :key="column.id"
          >
            <DropdownMenuCheckboxItem
              class="capitalize"
              :model-value="column.getIsVisible()"
              @update:model-value="
                (value) => {
                  column.toggleVisibility(!!value);
                }
              "
            >
              {{ column.id }}
            </DropdownMenuCheckboxItem>
          </template>
        </DropdownMenuContent>
      </DropdownMenu>

      <!-- Custom Action Buttons -->
      <Button
        v-for="(button, index) in buttons"
        :key="index"
        variant="outline"
        size="sm"
        @click="button.callback"
      >
        {{ button.name }}
      </Button>
    </div>

    <!-- Table Container -->
    <div class="overflow-hidden rounded-lg border">
      <!-- Draggable Table -->
      <DragDropProvider
        v-if="is_dragable"
        :modifiers="[RestrictToVerticalAxis]"
        @dragend="handleDragEnd"
      >
        <Table>
          <TableHeader class="bg-muted sticky top-0 z-10">
            <TableRow
              v-for="headerGroup in table.getHeaderGroups()"
              :key="headerGroup.id"
            >
              <TableHead
                v-for="header in headerGroup.headers"
                :key="header.id"
                :col-span="header.colSpan"
              >
                <FlexRender
                  v-if="!header.isPlaceholder"
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody class="**:data-[slot=table-cell]:first:w-8">
            <template v-if="table.getRowModel().rows.length">
              <DraggableRow
                v-for="row in table.getRowModel().rows"
                :key="row.id"
                :row="row"
                :index="row.index"
              />
            </template>
            <TableRow v-else>
              <TableCell
                :col-span="buildColumns().length"
                class="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DragDropProvider>

      <!-- Non-Draggable Table -->
      <Table v-else>
        <TableHeader class="bg-muted sticky top-0 z-10">
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <TableHead
              v-for="header in headerGroup.headers"
              :key="header.id"
              :col-span="header.colSpan"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() && 'selected'"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </TableCell>
            </TableRow>
          </template>
          <TableRow v-else>
            <TableCell
              :col-span="buildColumns().length"
              class="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Pagination Footer -->
    <div class="flex items-center justify-between w-full px-4">
      <div
        class="text-muted-foreground hidden flex-1 text-sm lg:flex"
        v-if="is_checked"
      >
        {{ table.getFilteredSelectedRowModel().rows.length }} of
        {{ table.getFilteredRowModel().rows.length }} row(s) selected.
      </div>
      <div class="flex items-center gap-8 ml-auto">
        <div class="hidden items-center gap-2 lg:flex">
          <Label for="rows-per-page" class="text-sm font-medium">
            Rows per page
          </Label>
          <Select
            :model-value="`${table.getState().pagination.pageSize}`"
            @update:model-value="
              (value) => {
                table.setPageSize(Number(value));
              }
            "
          >
            <SelectTrigger id="rows-per-page" size="sm" class="w-20">
              <SelectValue
                :placeholder="`${table.getState().pagination.pageSize}`"
              />
            </SelectTrigger>
            <SelectContent side="top">
              <SelectItem
                v-for="pageSize in [10, 20, 30, 40, 50]"
                :key="pageSize"
                :value="`${pageSize}`"
              >
                {{ pageSize }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="flex w-fit items-center justify-center text-sm font-medium">
          Page {{ table.getState().pagination.pageIndex + 1 }} of
          {{ table.getPageCount() }}
        </div>
        <div class="flex items-center gap-2">
          <Button
            variant="outline"
            class="hidden h-8 w-8 p-0 lg:flex"
            :disabled="!table.getCanPreviousPage()"
            @click="table.setPageIndex(0)"
          >
            <span class="sr-only">Go to first page</span>
            <IconChevronsLeft />
          </Button>
          <Button
            variant="outline"
            class="size-8"
            size="icon"
            :disabled="!table.getCanPreviousPage()"
            @click="table.previousPage()"
          >
            <span class="sr-only">Go to previous page</span>
            <IconChevronLeft />
          </Button>
          <Button
            variant="outline"
            class="size-8"
            size="icon"
            :disabled="!table.getCanNextPage()"
            @click="table.nextPage()"
          >
            <span class="sr-only">Go to next page</span>
            <IconChevronRight />
          </Button>
          <Button
            variant="outline"
            class="hidden size-8 lg:flex"
            size="icon"
            :disabled="!table.getCanNextPage()"
            @click="table.setPageIndex(table.getPageCount() - 1)"
          >
            <span class="sr-only">Go to last page</span>
            <IconChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
