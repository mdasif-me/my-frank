<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Add01Icon } from '@hugeicons-pro/core-stroke-rounded';
import { HugeiconsIcon } from '@hugeicons/vue';
import Badge from '../../components/ui/badge/Badge.vue';
import Button from '../../components/ui/button/Button.vue';
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
      <Tabs default-value="campaign" class="w-full h-10">
        <TabsList class="w-full bg-[#EBEFF5] h-10">
          <TabsTrigger class="bg-white!" value="campaign"
            >All Campaign
            <Badge
              class="h-5 min-w-5 bg-[#E6EEFD] text-primary rounded-full px-1 tabular-nums font-medium text-xs"
            >
              8
            </Badge></TabsTrigger
          >
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="inprogress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="archive">Archive</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password"> Change your password here. </TabsContent>
      </Tabs>
    </CardContent>
  </Card>
</template>
