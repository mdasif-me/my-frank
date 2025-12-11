<script setup lang="ts">
import { Menu01Icon } from '@hugeicons-pro/core-stroke-rounded';
import { HugeiconsIcon } from '@hugeicons/vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MobileMoreMenu from './MobileMoreMenu.vue';
import { MenuItems } from './sidebar/menu-items';

const router = useRouter();
const route = useRoute();
const showMoreMenu = ref(false);

const footerItems = MenuItems.slice(0, 4);

const navigate = (path: string) => {
  router.push(path);
};

const toggleMoreMenu = () => {
  showMoreMenu.value = !showMoreMenu.value;
};

const isActive = (path: string) => {
  return route.path === path;
};
</script>

<template>
  <div class="fixed bottom-0 left-0 right-0 md:hidden z-1000">
    <div class="bg-white border-t border-border shadow-lg">
      <div class="flex items-start pt-1 justify-around h-20 px-2">
        <button
          v-for="item in footerItems"
          :key="item.id"
          @click="navigate(item.path)"
          :class="[
            'flex flex-col items-center justify-center flex-1 py-2 text-xs rounded-lg transition-colors',
            isActive(item.path)
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground',
          ]"
        >
          <HugeiconsIcon
            :icon="item.icon"
            :altIcon="item.altIcon"
            class="size-5 mb-1"
            :showAlt="isActive(item.path)"
          />
          <span class="text-xs">{{
            item.label.includes(' ') ? item.label.split(' ')[0] : item.label
          }}</span>
        </button>

        <button
          @click="toggleMoreMenu"
          :class="[
            'flex flex-col items-center justify-center flex-1 py-2 text-xs rounded-lg transition-colors',
            showMoreMenu
              ? 'text-primary bg-primary/10'
              : 'text-muted-foreground hover:text-foreground',
          ]"
        >
          <HugeiconsIcon :icon="Menu01Icon" class="size-5 mb-1" />
          <span class="text-xs">More</span>
        </button>
      </div>
    </div>

    <MobileMoreMenu :open="showMoreMenu" @close="showMoreMenu = false" />
  </div>

  <div class="h-16 md:hidden"></div>
</template>
