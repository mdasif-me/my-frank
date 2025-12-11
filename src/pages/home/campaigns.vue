<script setup lang="ts">
import Badge from '@/components/ui/badge/Badge.vue';
import Button from '@/components/ui/button/Button.vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Combobox } from '@/components/ui/combobox';
import Separator from '@/components/ui/separator/Separator.vue';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRankingStore } from '@/stores/rankingStore';
import { StarIcon } from '@hugeicons-pro/core-solid-rounded';
import { Add01Icon } from '@hugeicons-pro/core-stroke-rounded';
import { HugeiconsIcon } from '@hugeicons/vue';
import { computed, onMounted, ref } from 'vue';
import RankingChart from './ranking-chart.vue';
import Archive from './status/archive.vue';
import Campaign from './status/campaign.vue';
import Completed from './status/completed.vue';
import Inprogress from './status/inprogress.vue';
import Upcoming from './status/upcoming.vue';

const tabValue = ref('campaign');
const rankingStore = useRankingStore();

onMounted(() => {
  rankingStore.fetchRankings();
});

const rankings = computed(() => rankingStore.rankings);
</script>

<template>
  <section class="flex md:flex-row flex-col items-start w-full h-full gap-6">
    <Card class="w-full md:border border-none md:py-6 py-0">
      <CardHeader class="flex items-center justify-between w-full md:px-6 px-0">
        <CardTitle
          class="md:text-2xl text-xl md:font-bold font-semibold leading-normal"
          >My Campaigns</CardTitle
        >
        <Button class="md:flex hidden">
          <HugeiconsIcon class="size-4 shrink-0" :icon="Add01Icon" />
          Create New Campaign
        </Button>
        <Button class="md:hidden">
          <HugeiconsIcon class="size-4 shrink-0" :icon="Add01Icon" />
          Create
        </Button>
      </CardHeader>
      <CardContent class="w-full md:px-6 px-0">
        <Tabs v-model="tabValue" class="w-full">
          <div class="w-full overflow-x-auto md:overflow-visible">
            <TabsList
              class="w-fit md:w-full bg-[#EBEFF5] gap-2 md:h-11 h-10 mb-6 flex flex-nowrap md:flex-wrap"
            >
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
          </div>
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
    <Card class="md:w-6/12 w-full h-auto md:py-6 py-0 md:border border-none">
      <CardHeader class="flex items-center justify-between w-full md:px-6 px-0">
        <CardTitle class="md:text-2xl text-base font-medium md:font-semibold"
          >Team Ranking</CardTitle
        >
        <Combobox
          class="bg-white w-48"
          :options="[
            { value: '4.9', label: 'Sarah Chen' },
            { value: '4.4', label: 'David Chen' },
            { value: '4.2', label: 'Farah Chen' },
            { value: '4.1', label: 'Nicole Chen' },
          ]"
          placeholder="Number of reviews"
          search-placeholder="Search countries..."
        />
      </CardHeader>
      <CardContent
        class="w-full md:max-h-[708px] md:min-h-[708px] overflow-auto space-y-3 md:px-6 px-0"
      >
        <div v-if="rankingStore.loading" class="text-center py-8">
          <p class="text-muted-foreground">Loading rankings...</p>
        </div>
        <div v-else-if="rankingStore.error" class="text-center py-8">
          <p class="text-red-500">{{ rankingStore.error }}</p>
        </div>
        <Card
          v-for="(ranking, index) in rankings"
          :class="{ 'hidden md:flex': index >= 5 }"
          :key="ranking.id"
        >
          <CardContent
            class="flex items-center md:gap-3 gap-1 justify-between w-full"
          >
            <div class="flex items-center md:gap-3 gap-1 w-full">
              <img
                src="../../assets/bages-icon.svg"
                class="md:size-14 size-10 shrink-0"
                alt="Team Ranking"
              />
              <article class="w-fit shrink-0">
                <h1 class="md:text-xl text-base font-medium md:font-semibold">
                  {{ ranking.topPerformer }}
                </h1>
                <p class="flex items-center gap-1">
                  <HugeiconsIcon
                    class="size-4 shrink-0"
                    :icon="StarIcon"
                    :color="'#FDB022'"
                  />
                  <span class="md:text-base text-xs font-normal"
                    ><span class="md:text-base text-xs font-medium">{{
                      ranking.progress
                    }}</span
                    >% ({{ ranking.title }})</span
                  >
                </p>
              </article>
            </div>
            <div>
              <RankingChart />
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  </section>
</template>
