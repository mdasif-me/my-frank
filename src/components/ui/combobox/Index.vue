<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ArrowDown01Icon } from '@hugeicons-pro/core-stroke-standard';
import { HugeiconsIcon } from '@hugeicons/vue';
import { CheckIcon } from 'lucide-vue-next';
import { computed, ref } from 'vue';

export interface IComboboxOption {
  value: string;
  label: string;
  icon?: any;
  altIcon?: any;
}

interface Props {
  options: IComboboxOption[];
  modelValue?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
  searchable?: boolean;
  clearable?: boolean;
  multiple?: boolean;
  width?: string;
  size?: 'sm' | 'lg' | 'default';
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Select an option...',
  searchPlaceholder: 'Search...',
  emptyMessage: 'No option found.',
  disabled: false,
  align: 'start',
  side: 'bottom',
  searchable: true,
  clearable: false,
  multiple: false,
  width: 'w-[200px]',
  size: 'default',
  class: '',
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const open = ref(false);
const value = ref(props.modelValue);

const selectedOption = computed(() =>
  props.options.find((option) => option.value === value.value)
);

function selectOption(selectedValue: string) {
  value.value = selectedValue === value.value ? '' : selectedValue;
  emit('update:modelValue', value.value);
  open.value = false;
}

function clearValue() {
  value.value = '';
  emit('update:modelValue', '');
}
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        :variant="disabled ? 'secondary' : 'outline'"
        role="combobox"
        :aria-expanded="open"
        :disabled="disabled"
        :class="cn(props.width, 'justify-between', props.class)"
        :size="size"
      >
        <div class="flex items-center gap-2 flex-1 truncate">
          <HugeiconsIcon
            v-if="selectedOption?.icon"
            class="size-4 shrink-0"
            :icon="selectedOption.icon"
            :size="16"
          />
          <span class="truncate">{{
            selectedOption?.label || placeholder
          }}</span>
        </div>
        <div class="flex items-center gap-1 ml-2">
          <button
            v-if="clearable && value"
            type="button"
            class="p-0 h-6 w-6 rounded hover:bg-muted flex items-center justify-center"
            @click.stop="clearValue"
          >
            ✕
          </button>
          <HugeiconsIcon :icon="ArrowDown01Icon" class="size-5 shrink-0" />
        </div>
      </Button>
    </PopoverTrigger>
    <PopoverContent
      :align="align"
      :side="side"
      class="p-0"
      :class="props.width"
    >
      <Command>
        <CommandInput
          v-if="searchable"
          class="h-9"
          :placeholder="searchPlaceholder"
        />
        <CommandList>
          <CommandEmpty>{{ emptyMessage }}</CommandEmpty>
          <CommandGroup>
            <CommandItem
              v-for="option in options"
              :key="option.value"
              :value="option.value"
              @select="(ev) => {
                selectOption(ev.detail.value as string)
              }"
            >
              <div class="flex items-center gap-2">
                <HugeiconsIcon
                  v-if="option.icon"
                  class="size-4"
                  :icon="option.icon"
                  :size="16"
                />
                {{ option.label }}
              </div>
              <CheckIcon
                :class="
                  cn(
                    'ml-auto',
                    value === option.value ? 'opacity-100' : 'opacity-0'
                  )
                "
              />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
<!-- 
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">Combobox Component</h1>
    <div class="space-y-2">
      <label class="block text-sm font-medium">Select a Framework:</label>
      <Combobox
        :options="frameworks"
        placeholder="Choose a framework..."
        search-placeholder="Search frameworks..."
        @update:model-value="(val: string) => (selectedFramework = val)"
      />
      <p v-if="selectedFramework" class="text-sm text-muted-foreground">
        Selected: <strong>{{ selectedFramework }}</strong>
      </p>
    </div>

    <div class="space-y-2">
      <label class="block text-sm font-medium">Select a Language:</label>
      <Combobox
        :options="languages"
        placeholder="Choose a language..."
        search-placeholder="Search languages..."
        empty-message="No language found."
      />
    </div>

    <div class="space-y-2">
      <label class="block text-sm font-medium">Select a Country:</label>
      <Combobox
        :options="[
          { value: 'us', label: 'United States' },
          { value: 'uk', label: 'United Kingdom' },
          { value: 'ca', label: 'Canada' },
          { value: 'au', label: 'Australia' },
        ]"
        placeholder="Choose a country..."
        search-placeholder="Search countries..."
      />
    </div>
  </div>
 -->
