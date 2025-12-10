<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Add01Icon } from '@hugeicons-pro/core-stroke-rounded';
import { HugeiconsIcon } from '@hugeicons/vue';
import { ref } from 'vue';
import Badge from '../../components/ui/badge/Badge.vue';
import Button from '../../components/ui/button/Button.vue';
import Archive from './status/archive.vue';
import Campaign from './status/campaign.vue';
import Completed from './status/completed.vue';
import Inprogress from './status/inprogress.vue';
import Upcoming from './status/upcoming.vue';

const tabValue = ref('campaign');
</script>

<template>
  <Card>
    <CardHeader class="flex items-center justify-between w-full">
      <CardTitle class="text-2xl font-bold leading-normal"
        >My Campaigns</CardTitle
      >
      <Button
        ><HugeiconsIcon class="size-4 shrink-0" :icon="Add01Icon" />Create New
        Campaign</Button
      >
    </CardHeader>
    <CardContent class="w-full">
      <Tabs v-model="tabValue" class="w-full h-10">
        <TabsList class="w-full bg-[#EBEFF5] h-10">
          <TabsTrigger
            :class="tabValue === 'campaign' && 'bg-white!'"
            value="campaign"
            >All Campaign
            <Badge
              class="h-5 min-w-5 bg-[#E6EEFD] text-primary rounded-full px-1 tabular-nums font-medium text-xs"
            >
              8
            </Badge></TabsTrigger
          >
          <TabsTrigger
            :class="tabValue === 'upcoming' && 'bg-white!'"
            value="upcoming"
            >Upcoming<Badge
              class="h-5 min-w-5 bg-[#E6EEFD] text-primary rounded-full px-1 tabular-nums font-medium text-xs"
            >
              8
            </Badge></TabsTrigger
          >
          <TabsTrigger
            :class="tabValue === 'inprogress' && 'bg-white!'"
            value="inprogress"
            >In Progress<Badge
              class="h-5 min-w-5 bg-[#E6EEFD] text-primary rounded-full px-1 tabular-nums font-medium text-xs"
            >
              8
            </Badge></TabsTrigger
          >
          <TabsTrigger
            :class="tabValue === 'completed' && 'bg-white!'"
            value="completed"
            >Completed<Badge
              class="h-5 min-w-5 bg-[#E6EEFD] text-primary rounded-full px-1 tabular-nums font-medium text-xs"
            >
              8
            </Badge></TabsTrigger
          >
          <TabsTrigger
            :class="tabValue === 'archive' && 'bg-white!'"
            value="archive"
            >Archive<Badge
              class="h-5 min-w-5 bg-[#E6EEFD] text-primary rounded-full px-1 tabular-nums font-medium text-xs"
            >
              8
            </Badge></TabsTrigger
          >
        </TabsList>
        <TabsContent value="campaign">
          <Campaign />
        </TabsContent>
        <TabsContent value="upcoming">
          <Upcoming />
        </TabsContent>
        <TabsContent value="inprogress">
          <Inprogress />
        </TabsContent>
        <TabsContent value="completed">
          <Completed />
        </TabsContent>
        <TabsContent value="archive">
          <Archive />
        </TabsContent>
      </Tabs>
    </CardContent>
  </Card>
</template>
