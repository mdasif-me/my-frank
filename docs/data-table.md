# DataTable Component - Complete Documentation

A fully reusable, feature-rich data table component for Vue 3 with TypeScript support, built on TanStack Table with drag-and-drop functionality.

## Features

- ✅ **Dynamic Columns** - Works with any data structure
- ✅ **Drag & Drop** - Reorder rows with visual feedback
- ✅ **Row Selection** - Checkbox selection with bulk operations
- ✅ **Actions Menu** - Per-row dropdown actions
- ✅ **Column Customization** - Show/hide columns dynamically
- ✅ **Custom Buttons** - Add your own action buttons with callbacks
- ✅ **Pagination** - Built-in pagination with configurable page sizes
- ✅ **Sorting** - Column-based sorting
- ✅ **Responsive Design** - Mobile-friendly with Tailwind CSS

## Installation

The component is located at `src/components/data-table/DataTable.vue`

Required dependencies:

```bash
npm install @tanstack/vue-table dnd-kit-vue
```

## Basic Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import DataTable from '@/components/data-table/DataTable.vue';

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
];

const data = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
]);
</script>

<template>
  <DataTable :data="data" :columns="columns" />
</template>
```

## Props

| Prop                   | Type                     | Default      | Description                            |
| ---------------------- | ------------------------ | ------------ | -------------------------------------- |
| `data`                 | `TableData[]`            | **Required** | Array of data objects to display       |
| `columns`              | `ColumnDef<TableData>[]` | **Required** | Column definitions (TanStack format)   |
| `is_dragable`          | `boolean`                | `false`      | Enable drag-and-drop row reordering    |
| `is_checked`           | `boolean`                | `false`      | Enable row selection checkboxes        |
| `is_actions`           | `boolean`                | `false`      | Enable actions dropdown menu per row   |
| `is_customize_columns` | `boolean`                | `false`      | Enable column visibility customization |
| `buttons`              | `ButtonAction[]`         | `[]`         | Custom action buttons                  |

### ButtonAction Interface

```typescript
interface ButtonAction {
  name: string; // Button label
  callback: () => void | Promise<void>; // Click handler
}
```

## Events

| Event         | Payload       | Description                                       |
| ------------- | ------------- | ------------------------------------------------- |
| `update:data` | `TableData[]` | Emitted when rows are reordered via drag-and-drop |

## Column Definition

Uses TanStack Vue Table's `ColumnDef` interface:

```typescript
const columns: any = [
  {
    accessorKey: 'fieldName', // Data field key
    header: 'Display Header', // Column header text
    cell: ({ row }: any) => {
      // Custom cell renderer
      return h('div', row.getValue('fieldName'));
    },
    enableHiding: false, // Can column be hidden?
    enableSorting: true, // Can column be sorted?
  },
];
```

### Custom Cell Renderers

```typescript
import { h } from 'vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const columns = [
  // Simple text
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => h('div', row.getValue('name')),
  },

  // Badge component
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) =>
      h(Badge, { variant: 'outline' }, () => row.getValue('status')),
  },

  // Button with icon
  {
    accessorKey: 'count',
    header: 'Count',
    cell: ({ row }) =>
      h(
        Button,
        { variant: 'ghost', size: 'sm' },
        () => `${row.getValue('count')} items`
      ),
  },

  // Conditional rendering
  {
    accessorKey: 'active',
    header: 'Active',
    cell: ({ row }) => {
      const active = row.getValue('active');
      return h(
        'span',
        {
          class: active ? 'text-green-500' : 'text-red-500',
        },
        active ? '✓ Active' : '✗ Inactive'
      );
    },
  },
];
```

## Examples

### Example 1: Read-Only Table

```vue
<script setup lang="ts">
import { ref } from 'vue';
import DataTable from '@/components/data-table/DataTable.vue';

const columns = [
  { accessorKey: 'product', header: 'Product' },
  { accessorKey: 'price', header: 'Price' },
  { accessorKey: 'stock', header: 'Stock' },
];

const data = ref([
  { id: 1, product: 'Laptop', price: '$999', stock: '15' },
  { id: 2, product: 'Mouse', price: '$29', stock: '150' },
]);
</script>

<template>
  <DataTable :data="data" :columns="columns" />
</template>
```

### Example 2: Selectable Table with Bulk Actions

```vue
<script setup lang="ts">
import { ref } from 'vue';
import DataTable from '@/components/data-table/DataTable.vue';

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
];

const data = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
]);

const bulkActionButtons = [
  {
    name: 'Delete Selected',
    callback: async () => {
      try {
        const selectedIds = table
          .getSelectedRowModel()
          .rows.map((r) => r.original.id);
        await fetch('/api/users/delete', {
          method: 'POST',
          body: JSON.stringify({ ids: selectedIds }),
        });
      } catch (error) {
        console.error('Delete failed:', error);
      }
    },
  },
  {
    name: 'Export Selected',
    callback: async () => {
      const selectedRows = table.getSelectedRowModel().rows;
      console.log('Exporting:', selectedRows);
    },
  },
];
</script>

<template>
  <DataTable
    :data="data"
    :columns="columns"
    :is_checked="true"
    :buttons="bulkActionButtons"
  />
</template>
```

### Example 3: Draggable Table (Order Management)

```vue
<script setup lang="ts">
import { ref } from 'vue';
import DataTable from '@/components/data-table/DataTable.vue';

const columns = [
  { accessorKey: 'task', header: 'Task' },
  { accessorKey: 'priority', header: 'Priority' },
];

const data = ref([
  { id: 1, task: 'Design homepage', priority: 'High' },
  { id: 2, task: 'Fix bugs', priority: 'Medium' },
  { id: 3, task: 'Write tests', priority: 'Low' },
]);

const saveOrderButton = [
  {
    name: 'Save Order',
    callback: async () => {
      try {
        const orderedIds = data.value.map((item) => item.id);
        await fetch('/api/tasks/reorder', {
          method: 'PUT',
          body: JSON.stringify({ order: orderedIds }),
        });
        console.log('Order saved successfully');
      } catch (error) {
        console.error('Save failed:', error);
      }
    },
  },
];

const handleReorder = (newData: any) => {
  data.value = newData;
  console.log('New order:', newData);
};
</script>

<template>
  <DataTable
    :data="data"
    :columns="columns"
    :is_dragable="true"
    :buttons="saveOrderButton"
    @update:data="handleReorder"
  />
</template>
```

### Example 4: Full-Featured Admin Table

```vue
<script setup lang="ts">
import { h, ref } from 'vue';
import { Badge } from '@/components/ui/badge';
import DataTable from '@/components/data-table/DataTable.vue';

const columns = [
  {
    accessorKey: 'name',
    header: 'Name',
    enableHiding: false,
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) =>
      h(Badge, { variant: 'secondary' }, () => row.getValue('role')),
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
];

const data = ref([
  { id: 1, name: 'Admin User', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Editor User', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Viewer User', role: 'Viewer', status: 'Inactive' },
]);

const adminButtons = [
  {
    name: 'Add User',
    callback: () => {
      console.log('Open add user modal');
    },
  },
  {
    name: 'Refresh',
    callback: async () => {
      const response = await fetch('/api/users');
      const freshData = await response.json();
      data.value = freshData;
    },
  },
  {
    name: 'Export All',
    callback: async () => {
      await fetch('/api/users/export');
    },
  },
];
</script>

<template>
  <DataTable
    :data="data"
    :columns="columns"
    :is_dragable="true"
    :is_checked="true"
    :is_actions="true"
    :is_customize_columns="true"
    :buttons="adminButtons"
    @update:data="(newData) => (data = newData)"
  />
</template>
```

### Example 5: Custom Styled Cells

```vue
<script setup lang="ts">
import { h, ref } from 'vue';
import { IconCircleCheckFilled, IconLoader } from '@tabler/icons-vue';
import DataTable from '@/components/data-table/DataTable.vue';

const columns = [
  {
    accessorKey: 'task',
    header: 'Task',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status');
      return h('div', { class: 'flex items-center gap-2' }, [
        status === 'Done'
          ? h(IconCircleCheckFilled, { class: 'h-4 w-4 text-emerald-500' })
          : h(IconLoader, { class: 'h-4 w-4 animate-spin text-gray-400' }),
        h('span', {}, status),
      ]);
    },
  },
];

const data = ref([
  { id: 1, task: 'Build feature', status: 'Done' },
  { id: 2, task: 'Write docs', status: 'In Progress' },
]);
</script>

<template>
  <DataTable :data="data" :columns="columns" />
</template>
```

## Accessing Table Instance

To access table methods (for selection, filtering, etc.), you need to get a reference to the table instance. Here's how:

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';

// Your data and columns
const data = ref([...]);
const columns = [...];

// To access selected rows in button callbacks:
const bulkActionButtons = [
  {
    name: 'Process Selected',
    callback: async () => {
      // Access via the table instance that's created internally
      // You'll need to expose the table instance or use event data
      console.log('Selected items:', selectedRows.value);
    }
  }
];
</script>
```

## API Integration Patterns

### Pattern 1: Async Callback with Loading State

```typescript
const isLoading = ref(false);

const buttons = [
  {
    name: 'Sync Data',
    callback: async () => {
      isLoading.value = true;
      try {
        const response = await fetch('/api/sync');
        const freshData = await response.json();
        data.value = freshData;
        showNotification('Success', 'Data synced');
      } catch (error) {
        showNotification('Error', error.message);
      } finally {
        isLoading.value = false;
      }
    },
  },
];
```

### Pattern 2: Drag-and-Drop with Persistence

```vue
<script setup lang="ts">
const data = ref([...]);

const handleDragUpdate = async (newData: any) => {
  // Optimistic update
  data.value = newData;

  try {
    // Persist to backend
    await fetch('/api/items/reorder', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order: newData.map((item, index) => ({
          id: item.id,
          position: index
        }))
      })
    });
  } catch (error) {
    // Rollback on error
    console.error('Failed to save order:', error);
    // Refetch original data
  }
};
</script>

<template>
  <DataTable
    :data="data"
    :columns="columns"
    :is_dragable="true"
    @update:data="handleDragUpdate"
  />
</template>
```

### Pattern 3: Real-time Data Updates

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const data = ref([]);
let intervalId: number;

onMounted(() => {
  // Initial load
  fetchData();

  // Poll every 5 seconds
  intervalId = setInterval(fetchData, 5000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});

async function fetchData() {
  try {
    const response = await fetch('/api/data');
    data.value = await response.json();
  } catch (error) {
    console.error('Fetch failed:', error);
  }
}
</script>
```

## Styling Customization

The component uses Tailwind CSS. You can customize the appearance by:

1. **Wrapping in a container:**

```vue
<div class="bg-white rounded-lg shadow-lg p-4">
  <DataTable :data="data" :columns="columns" />
</div>
```

2. **Custom cell styling** via column definitions:

```typescript
{
  accessorKey: 'amount',
  header: 'Amount',
  cell: ({ row }) =>
    h('span', {
      class: 'font-bold text-green-600'
    }, `$${row.getValue('amount')}`)
}
```

## TypeScript Support

Full TypeScript support with type safety:

```typescript
import type { ColumnDef } from '@tanstack/vue-table';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const columns: ColumnDef<User>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'Role' },
];

const data = ref<User[]>([
  { id: 1, name: 'John', email: 'john@example.com', role: 'Admin' },
]);
```

## Troubleshooting

### Drag-and-drop not working

- Ensure `is_dragable` is set to `true`
- Data must have an `id` field
- Use `@update:data` event to update your data ref

### Columns not hiding

- Set `enableHiding: true` in column definition
- Enable `is_customize_columns` prop

### Selection not working

- Enable `is_checked` prop
- Access selected rows via table instance methods

## Component Files

- `src/components/data-table/DataTable.vue` - Main component
- `src/components/data-table/DraggableRow.vue` - Row component for drag-and-drop
- `src/components/data-table/DragHandle.vue` - Drag handle icon

## License

Part of your Vue 3 project.
