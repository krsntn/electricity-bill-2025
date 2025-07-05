<script setup lang="ts">
const { totalBill, percentage } = defineProps<{
  totalBill: number;
  percentage: number;
}>();
</script>

<template>
  <div class="mt-6">
    <div
      class="relative inline-block translate-x-[-50%]"
      :style="{ left: `${percentage}%` }"
    >
      <!-- Arrow pointing up -->
      <div class="flex justify-center mb-1">
        <div
          class="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[12px] border-l-transparent border-r-transparent border-b-orange-400"
        />
      </div>

      <div class="flex justify-center">
        <div class="bg-orange-400 text-white px-4 rounded-full font-bold">
          RM{{ totalBill }}
        </div>
      </div>
    </div>
  </div>
</template>
