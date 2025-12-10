<script setup lang="ts">
import { InputGroup, InputGroupAddon } from '@/components/ui/input-group';
import { SearchIcon } from 'lucide-vue-next';
import Card from '../../components/ui/card/Card.vue';
import CardContent from '../../components/ui/card/CardContent.vue';
import CardHeader from '../../components/ui/card/CardHeader.vue';
import CardTitle from '../../components/ui/card/CardTitle.vue';
import InputGroupInput from '../../components/ui/input-group/InputGroupInput.vue';
</script>
<template>
  <Card class="w-full">
    <CardHeader class="flex items-center justify-between w-full">
      <CardTitle class="text-2xl font-bold leading-normal"
        >My competitors</CardTitle
      >
      <div>
        <InputGroup>
          <InputGroupInput placeholder="Search for business" class="h-10" />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </div>
    </CardHeader>
    <CardContent>My competitors</CardContent>
  </Card>
</template>
