// Reactive data for the electricity bill
<script setup lang="ts">
const consumption = useConsumption();
const totalBill = computed(() => calculateTierUsage(consumption.value));
const percentage = ref(0);

const tiers: {
  [key: string]: {
    kwh: number;
    percentage: number;
  };
} = reactive({
  tier1: { kwh: 0, percentage: 0 },
  tier2: { kwh: 0, percentage: 0 },
  tier3: { kwh: 0, percentage: 0 },
  tier4: { kwh: 0, percentage: 0 },
  tier5: { kwh: 0, percentage: 0 },
});

const props = defineProps<{
  totalUsage: number;
}>();
// Calculate tier usage and costs

const calculateTierUsage = (usage: number) => {
  const tierStandard = [
    { min: 1, max: 200, rate: 0.218 },
    { min: 201, max: 300, rate: 0.334 },
    { min: 301, max: 600, rate: 0.516 },
    { min: 601, max: 900, rate: 0.546 },
    { min: 901, max: Infinity, rate: 0.571 },
  ];

  let remainingUsage = usage;
  let totalCost = 0;

  tierStandard.forEach((tier) => {
    if (remainingUsage > 0) {
      const tierUsage = Math.min(remainingUsage, tier.max - tier.min + 1);
      const tierCost = tierUsage * tier.rate;
      totalCost += tierCost;
      remainingUsage -= tierUsage;
    }
  });

  if (usage > 1 && usage <= tierStandard[tierStandard.length - 2].max) {
    let currentRemainingUsage = usage;

    for (let i = 0; i < tierStandard.length; i++) {
      const tier = tierStandard[i];
      const tierKey = `tier${i + 1}`;
      const tierCapacity = tier.max - tier.min + 1;

      if (currentRemainingUsage >= tierCapacity) {
        tiers[tierKey].percentage = 100;
        tiers[tierKey].kwh = tierCapacity;
        currentRemainingUsage -= tierCapacity;
      } else if (currentRemainingUsage > 0) {
        tiers[tierKey].percentage =
          (currentRemainingUsage / tierCapacity) * 100;
        tiers[tierKey].kwh = currentRemainingUsage;
        currentRemainingUsage = 0;
      } else {
        tiers[tierKey].percentage = 0;
        tiers[tierKey].kwh = 0;
      }
    }
  } else if (usage > tierStandard[tierStandard.length - 2].max) {
    for (let i = 0; i <= tierStandard.length - 2; i++) {
      const tierKey = `tier${i + 1}`;
      tiers[tierKey].percentage = 100;
      tiers[tierKey].kwh = tierStandard[i].max - tierStandard[i].min + 1;
    }
    tiers.tier5.percentage = 50;
    tiers.tier5.kwh = usage - tierStandard[tierStandard.length - 2].max;
  }

  percentage.value =
    (Object.values(tiers).reduce((a, b) => a + b.percentage, 0) /
      (Object.keys(tiers).length * 100)) *
    100;

  return Number(totalCost.toFixed(2));
};
</script>

<template>
  <div>
    <ProgressUsage :current-usage="props.totalUsage" :percentage="percentage" />
    <ProgressBar :percentage="percentage" :tiers="tiers" />
    <ProgressBill :total-bill="totalBill" :percentage="percentage" />
  </div>
</template>
