<script setup lang="ts">
import AppSidebar from '@/components/sidebar/AppSidebar.vue';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import HeaderLayout from '@/layouts/HeaderLayout.vue';
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <HeaderLayout />
      <div class="w-full md:bg-transparent bg-white p-6">
        <router-view />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
