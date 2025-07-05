<script setup lang="ts">
const { percentage, tiers } = defineProps<{
  percentage: number;
  tiers: {
    [key: string]: {
      kwh: number;
      percentage: number;
    };
  };
}>();
</script>

<template>
  <div class="relative">
    <!-- Tier Labels -->
    <div class="flex justify-evenly mb-1 text-xs text-zinc-400">
      <span>1 - 200kWh</span>
      <span>201 - 300kWh</span>
      <span>301 - 600kWh</span>
      <span>601 - 900kWh</span>
      <span>&gt; 900kWh</span>
    </div>

    <!-- Main Progress Bar -->
    <div class="relative rounded-full flex overflow-hidden">
      <ProgressTier
        :label="`${tiers.tier1.kwh}kWh x RM0.218`"
        cost="RM43.60"
        :progress="tiers.tier1.percentage"
      />
      <ProgressTier
        :label="`${tiers.tier2.kwh}kWh x RM0.334`"
        cost="RM26.05"
        :progress="tiers.tier2.percentage"
      />
      <ProgressTier
        :label="`${tiers.tier3.kwh}kWh x RM0.516`"
        cost="RM0.00"
        :progress="tiers.tier3.percentage"
      />
      <ProgressTier
        :label="`${tiers.tier4.kwh}kWh x RM0.546`"
        cost="RM0.00"
        :progress="tiers.tier4.percentage"
      />
      <ProgressTier
        :label="`${tiers.tier5.kwh}kWh x RM0.571`"
        cost="RM0.00"
        :progress="tiers.tier5.percentage"
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
