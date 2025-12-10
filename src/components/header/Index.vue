<script setup lang="ts">
import { ArrowRight02Icon } from '@hugeicons-pro/core-solid-rounded';
import {
  Globe02Icon,
  Store01Icon,
  Tag01Icon,
} from '@hugeicons-pro/core-stroke-rounded';
import { Location06Icon } from '@hugeicons-pro/core-stroke-standard';
import { HugeiconsIcon } from '@hugeicons/vue';
import Button from '../ui/button/Button.vue';
import Combobox from '../ui/combobox/Index.vue';

let selectedFramework = '';

const frameworks = [
  {
    value: 'frank',
    label: 'Frank',
    icon: Store01Icon,
  },
  {
    value: 'establishment',
    label: 'Establishment',
    icon: Tag01Icon,
  },
];
const languages = [
  {
    value: 'english',
    label: 'English',
    icon: Globe02Icon,
  },
  {
    value: 'french',
    label: 'French',
    icon: Globe02Icon,
  },
];
</script>

<template>
  <section class="flex items-center justify-between w-full">
    <div
      class="bg-foreground hidden rounded-lg p-3 border border-border h-13 md:flex items-center"
    >
      <div class="flex items-center gap-4">
        <Button
          class="btn-gradient text-foreground text-base font-medium"
          size="sm"
          >New Feature<HugeiconsIcon class="size-4" :icon="ArrowRight02Icon"
        /></Button>
        <p class="text-gradient font-semibold text-base">
          Control Center is now live !
        </p>
      </div>
    </div>

    <div class="md:flex hidden items-center gap-3">
      <div>
        <Combobox
          class="h-12 bg-white font-medium"
          model-value="frank"
          :options="frameworks"
          placeholder="Establishment"
          search-placeholder="Search establishment"
          @update:model-value="(val: string) => (selectedFramework = val)"
        />
        <!-- <p v-if="selectedFramework" class="text-base text-muted-foreground">
        Selected: <strong>{{ selectedFramework }}</strong>
      </p> -->
      </div>
      <div>
        <Combobox
          width="w-fit"
          align="end"
          class="h-12 bg-white font-medium"
          model-value="english"
          :options="languages"
          placeholder="Choose a language"
          search-placeholder="Search language"
          @update:model-value="(val: string) => (selectedFramework = val)"
        />
        <!-- <p v-if="selectedFramework" class="text-base text-muted-foreground">
        Selected: <strong>{{ selectedFramework }}</strong>
      </p> -->
      </div>
      <div
        class="border border-border rounded-lg py-2 px-4 flex items-center gap-2"
      >
        <img
          src="../../assets/user.png"
          alt="user icon"
          sizes="32"
          class="w-8 shrink-0"
        />
        <article>
          <p class="text-[#0F172A] text-sm font-semibold">Forhad Sheikh</p>
          <p class="text-xs text-[#475569] font-semibold -mt-1">Manager</p>
        </article>
      </div>
    </div>
    <div class="md:hidden flex items-center justify-between">
      <article class="flex items-center gap-1">
        <HugeiconsIcon class="size-5 text-primary" :icon="Location06Icon" />
        <p class="text-sm font-medium text-primary">Establish Name goes here</p>
      </article>
      <div>
        <Combobox
          icon-only
          width="w-fit"
          align="end"
          class="rounded-full bg-muted font-medium"
          model-value="english"
          :options="languages"
          placeholder="Choose a language"
          search-placeholder="Search language"
          @update:model-value="(val: string) => (selectedFramework = val)"
        />
      </div>
    </div>
  </section>
</template>
