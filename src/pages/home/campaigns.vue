<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StarIcon } from '@hugeicons-pro/core-solid-rounded';
import { Add01Icon } from '@hugeicons-pro/core-stroke-rounded';
import { HugeiconsIcon } from '@hugeicons/vue';
import { ref } from 'vue';
import Badge from '../../components/ui/badge/Badge.vue';
import Button from '../../components/ui/button/Button.vue';
import { Combobox } from '../../components/ui/combobox';
import Separator from '../../components/ui/separator/Separator.vue';
import RankingChart from './ranking-chart.vue';
import Archive from './status/archive.vue';
import Campaign from './status/campaign.vue';
import Completed from './status/completed.vue';
import Inprogress from './status/inprogress.vue';
import Upcoming from './status/upcoming.vue';

const tabValue = ref('campaign');
</script>

<template>
  <section class="flex items-start w-full h-full gap-6">
    <Card class="w-full">
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
    <Card class="md:w-5/12 w-full h-auto">
      <CardHeader class="flex items-center justify-between w-full">
        <CardTitle class="text-2xl font-bold leading-normal"
          >Team Ranking</CardTitle
        >
        <Combobox
          class="bg-white w-48"
          :options="[
            { value: '4.9', label: 'Sarah Chen' },
            { value: '4.9', label: 'Sarah Chen' },
            { value: '4.9', label: 'Sarah Chen' },
            { value: '4.9', label: 'Sarah Chen' },
          ]"
          placeholder="Number of reviews"
          search-placeholder="Search countries..."
        />
      </CardHeader>
      <CardContent class="w-full h-full">
        <Card>
          <CardContent class="flex items-center justify-between w-full">
            <img
              src="../../assets/bages-icon.svg"
              class="size-10"
              alt="Team Ranking"
            />
            <article>
              <h1 class="text-xl font-semibold">Sarah Chen</h1>
              <p class="flex items-center gap-1">
                <HugeiconsIcon
                  class="size-4 shrink-0"
                  :icon="StarIcon"
                  :color="'#FDB022'"
                />
                <span class="text-base font-normal"
                  ><span class="text-base font-medium">4.9</span> (10
                  Reviews)</span
                >
              </p>
            </article>
            <RankingChart />
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  </section>
</template>
