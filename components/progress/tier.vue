<script setup lang="ts">
const { label, cost, progress } = defineProps<{
  label: string;
  cost: string;
  progress: number;
}>();
</script>

<template>
  <div
    class="relative bg-zinc-100 py-2 flex-1 flex items-center justify-center text-[0.65rem] text-zinc-700 overflow-hidden"
  >
    <div
      class="absolute left-0 top-0 bg-blue-200 h-full"
      :style="{ width: progress + '%' }"
    />

    <div class="text-center relative">
      <div>{{ label }}</div>
      <div class="font-bold">
        {{ cost }}
      </div>
    </div>
  </div>
</template>
