<script setup lang="ts"></script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Home</h1>
    <div class="grid auto-rows-min gap-4 md:grid-cols-5">
      <div
        v-for="i in 20"
        :key="i"
        class="aspect-square rounded-xl bg-muted/50"
      />
    </div>
  </div>
</template>
