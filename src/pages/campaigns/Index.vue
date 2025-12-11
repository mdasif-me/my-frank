<script setup lang="ts">
import DataTable from '@/components/data-table/DataTable.vue';
import { Badge } from '@/components/ui/badge';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import CardTitle from '@/components/ui/card/CardTitle.vue';
import { InputGroup, InputGroupAddon } from '@/components/ui/input-group';
import InputGroupInput from '@/components/ui/input-group/InputGroupInput.vue';
import { useCampaignStore } from '@/stores/campaignStore';
import { SearchIcon } from 'lucide-vue-next';
import { computed, h, onMounted } from 'vue';

const campaignStore = useCampaignStore();

onMounted(() => {
  campaignStore.fetchCampaigns();
});

const data = computed(() => campaignStore.campaigns);

const tableColumns: any = [
  {
    accessorKey: 'name',
    header: 'Campaign Name',
    cell: ({ row }: any) => h('div', String(row.getValue('name'))),
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }: any) => {
      const status = row.getValue('status') as string;
      let variant: 'default' | 'secondary' | 'destructive' | 'outline' | null =
        'secondary';
      if (status === 'active') variant = 'default';
      if (status === 'completed') variant = 'outline';
      if (status === 'draft') variant = 'secondary';

      return h(
        Badge,
        { variant },
        () => status.charAt(0).toUpperCase() + status.slice(1)
      );
    },
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ row }: any) => h('div', String(row.getValue('startDate'))),
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ row }: any) => h('div', String(row.getValue('endDate'))),
  },
  {
    accessorKey: 'budget',
    header: 'Budget',
    cell: ({ row }: any) => {
      const budget = row.getValue('budget') as number;
      return h('div', `$${budget.toLocaleString()}`);
    },
  },
  {
    accessorKey: 'spent',
    header: 'Spent',
    cell: ({ row }: any) => {
      const spent = row.getValue('spent') as number;
      return h('div', `$${spent.toLocaleString()}`);
    },
  },
  {
    accessorKey: 'reach',
    header: 'Reach',
    cell: ({ row }: any) => {
      const reach = row.getValue('reach') as number;
      return h('div', reach.toLocaleString());
    },
  },
  {
    accessorKey: 'engagement',
    header: 'Engagement',
    cell: ({ row }: any) => {
      const engagement = row.getValue('engagement') as number;
      return h('div', engagement.toLocaleString());
    },
  },
  {
    accessorKey: 'conversions',
    header: 'Conversions',
    cell: ({ row }: any) => {
      const conversions = row.getValue('conversions') as number;
      return h('div', conversions.toString());
    },
  },
  {
    accessorKey: 'conversionRate',
    header: 'Conversion Rate',
    cell: ({ row }: any) => {
      const rate = row.getValue('conversionRate') as number;
      return h('div', `${rate}%`);
    },
  },
];
</script>

<template>
  <Card class="w-full">
    <CardHeader class="flex items-center justify-between w-full">
      <CardTitle
        class="md:text-2xl text-xl md:font-bold font-semibold leading-normal"
        >My Campaigns</CardTitle
      >
      <div>
        <InputGroup>
          <InputGroupInput placeholder="Search campaigns" class="h-10" />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </div>
    </CardHeader>
    <CardContent>
      <div v-if="campaignStore.loading" class="text-center py-8">
        <p class="text-muted-foreground">Loading campaigns...</p>
      </div>
      <div v-else-if="campaignStore.error" class="text-center py-8">
        <p class="text-red-500">{{ campaignStore.error }}</p>
      </div>
      <DataTable
        v-else
        :data="data"
        :columns="tableColumns"
        :is_dragable="false"
        :is_checked="false"
        :is_actions="true"
        :is_customize_columns="true"
      />
    </CardContent>
  </Card>
</template>
