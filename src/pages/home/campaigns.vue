<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Add01Icon } from '@hugeicons-pro/core-stroke-rounded';
import { HugeiconsIcon } from '@hugeicons/vue';
import { ref } from 'vue';
import Badge from '../../components/ui/badge/Badge.vue';
import Button from '../../components/ui/button/Button.vue';
import Separator from '../../components/ui/separator/Separator.vue';
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
      <Tabs v-model="tabValue" class="w-full">
        <TabsList class="w-full bg-[#EBEFF5] gap-2 h-10 mb-6">
          <TabsTrigger
            :class="tabValue === 'campaign' && 'bg-white! shadow!'"
            value="campaign"
          >
            All Campaign
            <Badge
              :class="
                tabValue === 'campaign'
                  ? 'text-primary'
                  : 'text-[#334155]! bg-[#CBD5E1]!'
              "
              class="h-5 min-w-5 bg-[#E6EEFD] rounded-full px-1 tabular-nums font-medium text-xs"
            >
              3
            </Badge>
          </TabsTrigger>
          <Separator orientation="vertical" class="bg-[#94A3B8]" />
          <TabsTrigger
            :class="tabValue === 'upcoming' && 'bg-white! shadow!'"
            value="upcoming"
            >Upcoming<Badge
              :class="
                tabValue === 'upcoming'
                  ? 'text-primary'
                  : 'text-[#334155]! bg-[#CBD5E1]!'
              "
              class="h-5 min-w-5 bg-[#E6EEFD] text-primary rounded-full px-1 tabular-nums font-medium text-xs"
            >
              8
            </Badge></TabsTrigger
          >
          <Separator orientation="vertical" class="bg-[#94A3B8]" />
          <TabsTrigger
            :class="tabValue === 'inprogress' && 'bg-white! shadow!'"
            value="inprogress"
            >In Progress<Badge
              :class="
                tabValue === 'inprogress'
                  ? 'text-primary'
                  : 'text-[#334155]! bg-[#CBD5E1]!'
              "
              class="h-5 min-w-5 bg-[#E6EEFD] text-primary rounded-full px-1 tabular-nums font-medium text-xs"
            >
              8
            </Badge></TabsTrigger
          >
          <Separator orientation="vertical" class="bg-[#94A3B8]" />
          <TabsTrigger
            :class="tabValue === 'completed' && 'bg-white! shadow!'"
            value="completed"
            >Completed<Badge
              :class="
                tabValue === 'completed'
                  ? 'text-primary'
                  : 'text-[#334155]! bg-[#CBD5E1]!'
              "
              class="h-5 min-w-5 bg-[#E6EEFD] text-primary rounded-full px-1 tabular-nums font-medium text-xs"
            >
              8
            </Badge></TabsTrigger
          >
          <Separator orientation="vertical" class="bg-[#94A3B8]" />
          <TabsTrigger
            :class="tabValue === 'archive' && 'bg-white! shadow!'"
            value="archive"
            >Archive<Badge
              :class="
                tabValue === 'archive'
                  ? 'text-primary'
                  : 'text-[#334155]! bg-[#CBD5E1]!'
              "
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
