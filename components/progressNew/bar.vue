<script setup lang="ts">
const { percentage, energyCost, capacityCost, networkCost, retailCost } =
  defineProps<{
    percentage: number;
    energyCost: number;
    capacityCost: number;
    networkCost: number;
    retailCost: number;
  }>();
</script>

<template>
  <div class="relative">
    <div class="flex justify-between mb-1 text-xs text-zinc-400">
      <span>0kWh</span>
      <span>1500kWh</span>
    </div>

    <div class="rounded-full flex overflow-hidden">
      <div
        class="relative bg-zinc-100 py-1 flex-1 flex items-center justify-center text-[0.55rem] md:text-xs text-zinc-700 overflow-hidden"
      >
        <div
          class="absolute left-0 top-0 bg-blue-200 h-full"
          :style="{ width: Math.min(percentage, 100) + '%' }"
        />

        <div class="flex flex-col text-center relative">
          <div class="flex justify-between">
            <span class="font-bold">Energy Charges</span>
            <span class="mr-1">:</span>
            <span class="flex-1 text-right">RM{{ energyCost }}/kWh</span>
          </div>
          <div class="flex justify-between">
            <span class="font-bold">Capacity Charges</span>
            <span class="mr-1">:</span>
            <span class="flex-1 text-right">RM{{ capacityCost }}/kWh</span>
          </div>
          <div class="flex justify-between">
            <span class="font-bold">Network Charges</span>
            <span class="mr-1">:</span>
            <span class="flex-1 text-right">RM{{ networkCost }}/kWh</span>
          </div>
          <div class="flex justify-between">
            <span class="font-bold">Retail Charges</span>
            <span class="mr-1">:</span>
            <span class="flex-1 text-right">
              kWh > 600kWh, RM{{ retailCost }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div
      class="absolute top-1/2 translate-y-[-45%] h-30 w-px border-l-1 border-orange-400"
      :style="{ left: `${Math.min(percentage, 100)}%` }"
    />
  </div>
</template>
