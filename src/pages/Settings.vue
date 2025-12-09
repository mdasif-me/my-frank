<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Settings</h1>
    <div class="max-w-2xl space-y-6">
      <div class="rounded-lg bg-card p-6 shadow-sm">
        <h2 class="text-lg font-semibold mb-4">Profile Settings</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">Name</label>
            <Input placeholder="Your name" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Email</label>
            <Input type="email" placeholder="your.email@example.com" />
          </div>
          <Button class="w-full">Save Changes</Button>
        </div>
      </div>
      <div class="rounded-lg bg-card p-6 shadow-sm">
        <h2 class="text-lg font-semibold mb-4">Preferences</h2>
        <p class="text-muted-foreground">
          Additional settings will appear here.
        </p>
      </div>
    </div>
  </div>
</template>
