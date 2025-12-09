<script setup lang="ts"></script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
    <div class="grid gap-4">
      <div class="rounded-lg bg-card p-6 shadow-sm">
        <h2 class="text-lg font-semibold mb-2">Overview</h2>
        <p class="text-muted-foreground">
          Dashboard analytics and metrics will appear here.
        </p>
      </div>
      <div class="grid md:grid-cols-2 gap-4">
        <div class="rounded-lg bg-card p-6 shadow-sm">
          <h3 class="text-base font-semibold mb-2">Stat 1</h3>
          <p class="text-2xl font-bold">1,234</p>
        </div>
        <div class="rounded-lg bg-card p-6 shadow-sm">
          <h3 class="text-base font-semibold mb-2">Stat 2</h3>
          <p class="text-2xl font-bold">5,678</p>
        </div>
      </div>
    </div>
  </div>
</template>
