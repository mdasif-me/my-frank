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
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-vue-next';
import { computed, ref } from 'vue';

export interface IComboboxOption {
  value: string;
  label: string;
}

interface Props {
  options: IComboboxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select an option...',
  searchPlaceholder: 'Search...',
  emptyMessage: 'No option found.',
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const open = ref(false);
const value = ref('');

const selectedOption = computed(() =>
  props.options.find((option) => option.value === value.value)
);

function selectOption(selectedValue: string) {
  value.value = selectedValue === value.value ? '' : selectedValue;
  emit('update:modelValue', value.value);
  open.value = false;
}
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-[200px] justify-between"
      >
        {{ selectedOption?.label || placeholder }}
        <ChevronsUpDownIcon class="opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[200px] p-0">
      <Command>
        <CommandInput class="h-9" :placeholder="searchPlaceholder" />
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
              {{ option.label }}
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
