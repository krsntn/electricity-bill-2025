<script setup lang="ts">
const { currentUsage, percentage } = defineProps<{
  currentUsage: number;
  percentage: number;
}>();
</script>

<template>
  <div class="mb-2">
    <div
      class="relative inline-block translate-x-[-50%]"
      :style="{ left: `${percentage}%` }"
    >
      <div class="flex justify-center">
        <div class="bg-orange-400 text-white px-4 rounded-full font-bold">
          {{ currentUsage }}kWh
        </div>
      </div>

      <!-- Arrow pointing down -->
      <div class="flex justify-center mt-1">
        <div
          class="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-orange-400"
        />
      </div>
    </div>
  </div>
</template>
