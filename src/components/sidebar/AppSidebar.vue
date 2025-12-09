<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar';
import { RouterLink, useRoute } from 'vue-router';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { HugeiconsIcon } from '@hugeicons/vue';
import { MenuItems } from './menu-items';

const props = defineProps<SidebarProps>();
const route = useRoute();

const isActive = (path: string): boolean => {
  return route.path === path;
};
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader
      class="h-20 p-4 bg-background border-b border-sidebar-border w-full"
    >
      <img
        src="/logo-text.svg"
        alt="MyFrank"
        class="h-10 w-fit flex justify-start"
      />
    </SidebarHeader>
    <SidebarContent class="px-4 py-8">
      <SidebarMenu class="space-y-2">
        <RouterLink
          v-for="item in MenuItems"
          :key="item.id"
          :to="item.path"
          exact-active-class="bg-background text-primary!"
          class="flex text-secondary-foreground items-center gap-3 font-semibold cursor-pointer rounded-md p-3 transition-colors hover:bg-background/70"
        >
          <template #default>
            <HugeiconsIcon
              class="size-6"
              :icon="item.icon"
              :altIcon="item.altIcon"
              :size="24"
              :showAlt="isActive(item.path)"
            />
            <span>{{ item.label }}</span>
          </template>
        </RouterLink>
      </SidebarMenu>
    </SidebarContent>
    <SidebarFooter class="px-4 py-8">
      <SidebarMenu>
        <SidebarMenuItem class="text-sm text-muted-foreground">
          © 2024 MyFrank
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
