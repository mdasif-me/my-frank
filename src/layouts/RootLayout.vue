<script setup lang="ts">
import AppSidebar from '@/components/sidebar/AppSidebar.vue';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useRoute } from 'vue-router';

const route = useRoute();

const breadcrumbLabel = {
  Home: 'Home',
  'Review Management': 'Review Management',
  'Team Members': 'Team Members',
  'My Campaigns': 'My Campaigns',
  Rewards: 'Rewards',
  'Competitor Analysis': 'Competitor Analysis',
  'Plan & Billings': 'Plan & Billings',
  'My Network': 'My Network',
  Settings: 'Settings',
};

const currentLabel =
  breadcrumbLabel[route.name as keyof typeof breadcrumbLabel] || 'Page';
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header
        class="bg-background sticky top-0 flex h-20 shrink-0 items-center gap-2 border-b px-4"
      >
        <SidebarTrigger class="-ml-1" />
        <Separator
          orientation="vertical"
          class="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>{{ currentLabel }}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4">
        <router-view />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
