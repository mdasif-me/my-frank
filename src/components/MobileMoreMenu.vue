<script setup lang="ts">
import { Logout01Icon } from '@hugeicons-pro/core-stroke-rounded';
import { HugeiconsIcon } from '@hugeicons/vue';
import { useRoute, useRouter } from 'vue-router';
import { MenuItems } from './sidebar/menu-items';

defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

const router = useRouter();
const route = useRoute();

const moreItems = MenuItems.slice(4);

const handleNavigate = (path: string) => {
  router.push(path);
  emit('close');
};

const isActive = (path: string) => {
  return route.path === path;
};

const handleLogout = () => {
  //TODO: Add logout logic here
  console.log('Logging out...');
  emit('close');
};
</script>

<template>
  <transition name="fade">
    <div
      v-if="open"
      class="fixed inset-0 bg-black/50 z-9999"
      @click="$emit('close')"
    ></div>
  </transition>

  <transition name="slide-in-right">
    <div
      v-if="open"
      class="fixed right-0 top-0 bottom-0 w-64 bg-white shadow-lg z-10000 overflow-y-auto"
    >
      <div class="p-4 h-full flex flex-col justify-between">
        <div class="flex items-center w-full justify-between mb-6">
          <h2 class="text-xl font-bold">Menu</h2>

          <button
            @click="$emit('close')"
            class="w-8 h-8 hover:bg-accent rounded-lg"
          >
            <span class="text-2xl">&times;</span>
          </button>
        </div>

        <div class="space-y-2 h-full">
          <button
            v-for="item in moreItems"
            :key="item.id"
            @click="handleNavigate(item.path)"
            :class="[
              'w-full flex items-center gap-3 p-2 rounded-lg transition-colors text-left',
              isActive(item.path)
                ? 'bg-primary/10 text-primary'
                : 'hover:bg-accent text-muted-foreground hover:text-foreground',
            ]"
          >
            <HugeiconsIcon
              :icon="item.icon"
              :altIcon="item.altIcon"
              :showAlt="isActive(item.path)"
              class="size-5"
            />
            <span class="text-sm font-medium">{{ item.label }}</span>
          </button>
        </div>

        <div class="bottom-0 py-2 border-t border-border">
          <button
            @click="handleLogout"
            class="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
          >
            <HugeiconsIcon :icon="Logout01Icon" class="size-5" />
            <span class="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-in-right-enter-active,
.slide-in-right-leave-active {
  transition: transform 0.3s ease;
}

.slide-in-right-enter-from,
.slide-in-right-leave-to {
  transform: translateX(100%);
}
</style>
