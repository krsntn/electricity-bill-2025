// Reactive data for the electricity bill
<script setup lang="ts">
const rates = useRates();
const consumption = useConsumption();
const percentage = computed(() => (consumption.value / 1500) * 100);
const energyBill = computed(
  () =>
    consumption.value *
    (consumption.value > 1500
      ? rates.Big.EnergyCharges
      : rates.Small.EnergyCharges),
);
const capacityBill = computed(
  () =>
    consumption.value *
    (consumption.value > 1500
      ? rates.Big.CapacityCharges
      : rates.Small.CapacityCharges),
);
const networkBill = computed(
  () =>
    consumption.value *
    (consumption.value > 1500
      ? rates.Big.NetworkCharges
      : rates.Small.NetworkCharges),
);
const afaBill = computed(
  () => consumption.value * (consumption.value > 600 ? rates.AFA : 0),
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
const serviceTax = computed(() => {
  if (consumption.value > 600) {
    const exceedConsumption = consumption.value - 600;
    if (consumption.value <= 1500) {
      const energy = exceedConsumption * rates.Small.EnergyCharges;
      const capacity = exceedConsumption * rates.Small.CapacityCharges;
      const network = exceedConsumption * rates.Small.NetworkCharges;
      const retail = exceedConsumption * rates.Small.RetailCharges;
      const afa = exceedConsumption * rates.AFA;
      const incentive = rates.Incentive.find(
        ({ min, max }) => consumption.value >= min && consumption.value <= max,
      );
      let totalIncentive = 0;
      if (incentive) {
        totalIncentive = exceedConsumption * incentive.rate;
      }

      return (
        (energy + capacity + network + retail + afa + totalIncentive) * 0.08
      );
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
        :energy-cost="
          consumption > 1500
            ? rates.Big.EnergyCharges
            : rates.Small.EnergyCharges
        "
        :capacity-cost="
          consumption > 1500
            ? rates.Big.CapacityCharges
            : rates.Small.CapacityCharges
        "
        :network-cost="
          consumption > 1500
            ? rates.Big.NetworkCharges
            : rates.Small.NetworkCharges
        "
        :retail-cost="
          consumption > 1500
            ? rates.Big.RetailCharges
            : rates.Small.RetailCharges
        "
      />
      <ProgressNewBill
        :consumption="consumption"
        :energy-bill="energyBill"
        :capacity-bill="capacityBill"
        :network-bill="networkBill"
        :retail-bill="consumption > 600 ? rates.Small.RetailCharges : 0"
        :afa-bill="afaBill"
        :percentage="percentage"
        :incentive="totalIncentive"
        :service-tax="serviceTax"
      />

      <div v-if="width <= 768" class="mt-2">
        <ProgressNewBillDetails
          :consumption="consumption"
          :energy-bill="energyBill"
          :capacity-bill="capacityBill"
          :network-bill="networkBill"
          :retail-bill="consumption > 600 ? rates.Small.RetailCharges : 0"
          :afa-bill="afaBill"
          :percentage="percentage"
          :incentive="totalIncentive"
          :service-tax="serviceTax"
        />
      </div>
    </div>
  </div>
</template>
