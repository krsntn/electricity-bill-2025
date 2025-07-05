<script setup lang="ts">
import type { TabsItem, AccordionItem } from "@nuxt/ui";

const tabs: TabsItem[] = [
  { label: "kilowatt-hour", icon: "mdi:lightning-bolt", slot: "kwh" as const },
  { label: "watt", icon: "mdi:lightning-bolt", slot: "w" as const },
];

const items = ref<AccordionItem[]>([
  {
    label: "Old Calculation",
    icon: "i-fe-bolt",
    slot: "oldCalc" as const,
  },
]);

const consumptionKwh = useConsumption();

function setConsumptionKwh(value: number) {
  consumptionKwh.value = value;
}
</script>

<template>
  <UApp>
    <div class="min-h-dvh flex flex-col justify-between">
      <div class="flex-1 md:w-xl m-auto py-4 px-2">
        <h1 class="text-xl font-bold mb-2">
          Predict Your Monthly Electricity Bill
        </h1>
        <UTabs :items="tabs" class="mb-12">
          <template #kwh>
            <KwhForm
              :consumption-kwh="consumptionKwh"
              @set-consumption-kwh="setConsumptionKwh"
            />
          </template>

          <template #w>
            <WForm @set-consumption-kwh="setConsumptionKwh" />
          </template>
        </UTabs>

        <UAccordion
          :items="items"
          type="multiple"
          class="border-b border-default"
        >
          <template #oldCalc>
            <div class="px-10 my-4">
              <ElectricityResult :total-usage="consumptionKwh" />
            </div>
          </template>
        </UAccordion>

        <h2 class="py-3.5 flex items-center gap-1.5 text-sm">
          <UIcon name="i-fe-bolt" class="w-5 h-5" />New Calculation (1 July
          2025)
        </h2>
        <div class="px-12 my-4">
          <ElectricityResultNew :total-usage="consumptionKwh" />
        </div>
      </div>

      <MainFooter />
    </div>
  </UApp>
</template>
