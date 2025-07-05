<script setup lang="ts">
const { percentage, tiers } = defineProps<{
  percentage: number;
  tiers: {
    kwh: number;
    percentage: number;
    cost: number;
  }[];
}>();
</script>

<template>
  <div class="relative">
    <!-- Tier Labels -->
    <div
      class="flex justify-evenly mb-1 text-[0.6rem] md:text-xs text-zinc-400"
    >
      <span class="flex-1 flex justify-center items-center text-center"
        >1 - 200kWh</span
      >
      <span class="flex-1 flex justify-center items-center text-center"
        >201 - 300kWh</span
      >
      <span class="flex-1 flex justify-center items-center text-center"
        >301 - 600kWh</span
      >
      <span class="flex-1 flex justify-center items-center text-center"
        >601 - 900kWh</span
      >
      <span class="flex-1 flex justify-center items-center text-center"
        >&gt; 900kWh</span
      >
    </div>

    <!-- Main Progress Bar -->
    <div class="relative rounded-full flex overflow-hidden">
      <ProgressTier
        :label="`${tiers[0].kwh}kWh x RM0.218`"
        :cost="`RM${tiers[0].cost.toFixed(2)}`"
        :progress="tiers[0].percentage"
      />
      <ProgressTier
        :label="`${tiers[1].kwh}kWh x RM0.334`"
        :cost="`RM${tiers[1].cost.toFixed(2)}`"
        :progress="tiers[1].percentage"
      />
      <ProgressTier
        :label="`${tiers[2].kwh}kWh x RM0.516`"
        :cost="`RM${tiers[2].cost.toFixed(2)}`"
        :progress="tiers[2].percentage"
      />
      <ProgressTier
        :label="`${tiers[3].kwh}kWh x RM0.546`"
        :cost="`RM${tiers[3].cost.toFixed(2)}`"
        :progress="tiers[3].percentage"
      />
      <ProgressTier
        :label="`${tiers[4].kwh}kWh x RM0.571`"
        :cost="`RM${tiers[4].cost.toFixed(2)}`"
        :progress="tiers[4].percentage"
      />

      <!-- Vertical Dashed Lines -->
      <div
        class="absolute inset-y-0 left-[20%] w-px border-l-1 border-dashed border-zinc-400"
      />
      <div
        class="absolute inset-y-0 left-[40%] w-px border-l-1 border-dashed border-zinc-400"
      />
      <div
        class="absolute inset-y-0 left-[60%] w-px border-l-1 border-dashed border-zinc-400"
      />
      <div
        class="absolute inset-y-0 left-[80%] w-px border-l-1 border-dashed border-zinc-400"
      />
    </div>

    <div
      class="absolute top-1/2 translate-y-[-45%] h-30 w-px border-l-1 border-orange-400"
      :style="{ left: `${percentage}%` }"
    />
  </div>
</template>
