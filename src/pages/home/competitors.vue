<script setup lang="ts">
import DataTable from '@/components/data-table/DataTable.vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import CardTitle from '@/components/ui/card/CardTitle.vue';
import { InputGroup, InputGroupAddon } from '@/components/ui/input-group';
import InputGroupInput from '@/components/ui/input-group/InputGroupInput.vue';
import { useProductStore } from '@/stores/productStore';
import {
  IconCongruentTo,
  IconStar,
  IconTrendingDown,
  IconTrendingUp,
} from '@tabler/icons-vue';
import { SearchIcon } from 'lucide-vue-next';
import { computed, h, onMounted } from 'vue';

const productStore = useProductStore();

onMounted(() => {
  productStore.fetchProducts();
});

const data = computed(() => productStore.products);

const tableColumns: any = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }: any) => h('div', String(row.getValue('name'))),
    enableHiding: false,
  },
  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }: any) => h('div', String(row.getValue('address'))),
  },
  {
    accessorKey: 'rating',
    header: 'Average Rating',
    cell: ({ row }: any) => {
      const rating = row.getValue('rating') as number;
      return h('div', { class: 'flex items-center gap-2' }, [
        h(IconStar, { class: 'h-4 w-4 text-yellow-500' }),
        h('span', {}, rating.toString()),
      ]);
    },
  },
  {
    accessorKey: 'totalReview',
    header: 'Total Review',
    cell: ({ row }: any) => h('div', String(row.getValue('totalReview'))),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }: any) => {
      const status = row.getValue('status') as {
        value: number;
        type: 'neutral' | 'positive' | 'negative';
      };

      let badgeClass = 'bg-muted text-foreground';
      let icon = null;

      if (status.type === 'neutral') {
        badgeClass = 'bg-muted text-foreground';
        icon = h(IconCongruentTo, { class: 'h-4 w-4' });
      } else if (status.type === 'positive') {
        badgeClass = 'bg-emerald-500/10 text-emerald-600 border-emerald-200';
        icon = h(IconTrendingUp, { class: 'h-4 w-4' });
      } else if (status.type === 'negative') {
        badgeClass = 'bg-red-500/10 text-red-600 border-red-200';
        icon = h(IconTrendingDown, { class: 'h-4 w-4' });
      }

      return h(Badge, { variant: 'outline', class: badgeClass }, () => [
        h('div', { class: 'flex items-center gap-1' }, [
          icon,
          `${status.value}%`,
        ]),
      ]);
    },
  },
  {
    id: 'actions',
    header: 'Action',
    cell: () =>
      h('div', [
        h(
          Button,
          {
            variant: 'outline',
            size: 'sm',
            class: 'bg-white',
          },
          () => 'View'
        ),
      ]),
  },
];
</script>
<template>
  <Card class="w-full">
    <CardHeader class="flex items-center justify-between w-full">
      <CardTitle class="text-2xl font-bold leading-normal"
        >My competitors</CardTitle
      >
      <div>
        <InputGroup>
          <InputGroupInput placeholder="Search for business" class="h-10" />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </div>
    </CardHeader>
    <CardContent>
      <DataTable
        :data="data"
        :columns="tableColumns"
        :is_dragable="false"
        :is_checked="false"
        :is_actions="true"
        :is_customize_columns="false"
      />
    </CardContent>
  </Card>
</template>
