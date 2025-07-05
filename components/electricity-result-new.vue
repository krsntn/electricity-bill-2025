// Reactive data for the electricity bill
<script setup lang="ts">
const rates = useRates();
const consumption = useConsumption();
const percentage = computed(() => (consumption.value / 1500) * 100);
const energyBill = computed(
  () => consumption.value * rates.Small.EnergyCharges,
);
const capacityBill = computed(
  () => consumption.value * rates.Small.CapacityCharges,
);
const networkBill = computed(
  () => consumption.value * rates.Small.NetworkCharges,
);
const totalIncentive = computed(() => {
  if (consumption.value <= 1000) {
    const incentive = rates.Incentive.find(
      ({ min, max }) => consumption.value >= min && consumption.value <= max,
    );

    if (incentive) {
      return consumption.value * incentive.rate;
    }
  }
  return 0;
});

const width = ref(0);
onMounted(() => {
  window.addEventListener("resize", () => {
    width.value = window.innerWidth;
  });
});
</script>

<template>
  <div class="flex flex-col gap-6">
    <div>
      <ProgressNewUsage :current-usage="consumption" :percentage="percentage" />
      <ProgressNewBar
        :percentage="percentage"
        :energy-cost="rates.Small.EnergyCharges"
        :capacity-cost="rates.Small.CapacityCharges"
        :network-cost="rates.Small.NetworkCharges"
        :retail-cost="rates.Small.RetailCharges"
      />
      <ProgressNewBill
        :consumption="consumption"
        :energy-bill="energyBill"
        :capacity-bill="capacityBill"
        :network-bill="networkBill"
        :retail-bill="consumption > 600 ? rates.Small.RetailCharges : 0"
        :percentage="percentage"
        :incentive="totalIncentive"
      />

      <div v-if="width <= 768" class="mt-2">
        <ProgressNewBillDetails
          :consumption="consumption"
          :energy-bill="energyBill"
          :capacity-bill="capacityBill"
          :network-bill="networkBill"
          :retail-bill="consumption > 600 ? rates.Small.RetailCharges : 0"
          :percentage="percentage"
          :incentive="totalIncentive"
        />
      </div>
    </div>
  </div>
</template>
