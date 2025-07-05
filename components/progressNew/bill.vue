<script setup lang="ts">
const props = defineProps<{
  consumption: number;
  energyBill: number;
  capacityBill: number;
  networkBill: number;
  retailBill: number;
  percentage: number;
  incentive: number;
}>();

const width = ref(0);

onMounted(() => {
  window.addEventListener("resize", () => {
    width.value = window.innerWidth;
  });
});
</script>

<template>
  <div class="mt-6">
    <div
      class="relative inline-block translate-x-[-50%] z-20"
      :style="{ left: `${Math.min(props.percentage, 100)}%` }"
    >
      <!-- Arrow pointing up -->
      <div class="flex justify-center mb-1">
        <div
          class="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[12px] border-l-transparent border-r-transparent border-b-orange-400"
        />
      </div>

      <ProgressNewBillDetails v-if="width > 768" v-bind="props" />
    </div>
  </div>
</template>
