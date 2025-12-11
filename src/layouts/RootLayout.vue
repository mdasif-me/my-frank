<script setup lang="ts">
import MobileFooterNav from '@/components/MobileFooterNav.vue';
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
      <FooterLayout />
      <MobileFooterNav />
    </SidebarInset>
  </SidebarProvider>
</template>
