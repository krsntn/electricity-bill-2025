<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";

const {
  consumption,
  energyBill,
  capacityBill,
  networkBill,
  retailBill,
  percentage,
  incentive,
} = defineProps<{
  consumption: number;
  energyBill: number;
  capacityBill: number;
  networkBill: number;
  retailBill: number;
  percentage: number;
  incentive: number;
}>();

const totalBill = computed(
  () => energyBill + capacityBill + networkBill + retailBill - incentive,
);

type IncentiveInfo = {
  label: string;
  unit: string;
  rates: string;
};

const data = ref<IncentiveInfo[]>([
  {
    label: "1 - 200",
    unit: "sen/kWh",
    rates: "-25.0",
  },
  {
    label: "201 - 250",
    unit: "sen/kWh",
    rates: "-24.5",
  },
  {
    label: "251 - 300",
    unit: "sen/kWh",
    rates: "-22.5",
  },
  {
    label: "301 - 350",
    unit: "sen/kWh",
    rates: "-21.0",
  },
  {
    label: "351 - 400",
    unit: "sen/kWh",
    rates: "-17.0",
  },
  {
    label: "401 - 450",
    unit: "sen/kWh",
    rates: "-14.5",
  },
  {
    label: "451 - 500",
    unit: "sen/kWh",
    rates: "-12.0",
  },
  {
    label: "501 - 550",
    unit: "sen/kWh",
    rates: "-10.5",
  },
  {
    label: "551 - 600",
    unit: "sen/kWh",
    rates: "-9.0",
  },
  {
    label: "601 - 650",
    unit: "sen/kWh",
    rates: "-7.5",
  },
  {
    label: "651 - 700",
    unit: "sen/kWh",
    rates: "-5.5",
  },
  {
    label: "701 - 750",
    unit: "sen/kWh",
    rates: "-4.5",
  },
  {
    label: "751 - 800",
    unit: "sen/kWh",
    rates: "-4.0",
  },
  {
    label: "801 - 850",
    unit: "sen/kWh",
    rates: "-2.5",
  },
  {
    label: "851 - 900",
    unit: "sen/kWh",
    rates: "-1.0",
  },
  {
    label: "901 - 1000",
    unit: "sen/kWh",
    rates: "-0.5",
  },
]);

const columns: TableColumn<IncentiveInfo>[] = [
  {
    accessorKey: "label",
    header: "For total consumption (kWh) per month",
  },
  {
    accessorKey: "unit",
    header: "Unit",
  },
  {
    accessorKey: "rates",
    header: "Rates (1 July 2025)",
  },
];
</script>

<template>
  <div class="mt-6">
    <div
      class="relative inline-block translate-x-[-50%] z-20"
      :style="{ left: `${Math.min(percentage, 100)}%` }"
    >
      <!-- Arrow pointing up -->
      <div class="flex justify-center mb-1">
        <div
          class="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[12px] border-l-transparent border-r-transparent border-b-orange-400"
        />
      </div>

      <div
        class="flex flex-col gap-1 justify-center text-xs border border-dashed border-orange-400 bg-zinc-800 text-white px-4 py-2 rounded"
      >
        <div class="flex justify-between">
          <span class="font-bold">Energy Charges</span>
          <span class="mr-1">:</span>
          <span class="flex-1 text-right">RM{{ energyBill.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-bold">Capacity Charges</span>
          <span class="mr-1">:</span>
          <span class="flex-1 text-right">RM{{ capacityBill.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-bold">Network Charges</span>
          <span class="mr-1">:</span>
          <span class="flex-1 text-right">RM{{ networkBill.toFixed(2) }}</span>
        </div>
        <div v-show="retailBill > 0" class="flex justify-between">
          <span class="font-bold">Retail Charges</span>
          <span class="mr-1">:</span>
          <span class="flex-1 text-right">RM{{ retailBill.toFixed(2) }}</span>
        </div>
        <div v-show="consumption <= 1000" class="flex justify-between">
          <UModal>
            <span class="font-bold cursor-pointer">
              Energy Efficiency Incentive
            </span>
            <template #content>
              <UTable :data="data" :columns="columns" class="flex-1" />
            </template>
          </UModal>
          <span class="mr-1">:</span>
          <span class="flex-1 text-right">-RM{{ incentive.toFixed(2) }}</span>
        </div>

        <div class="border-t border-zinc-700 text-right">
          RM{{ totalBill.toFixed(2) }}
        </div>
      </div>
    </div>
  </div>
</template>
