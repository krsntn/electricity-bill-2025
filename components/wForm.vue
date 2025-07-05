<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";

const state: {
  consumptionW: number;
  hours: number;
  days: number;
} = reactive({
  consumptionW: 10,
  hours: 12,
  days: 30,
});

const consumption = useConsumption();

async function onSubmit(event: FormSubmitEvent<typeof state>) {
  const { consumptionW, hours, days } = event.data;
  consumption.value = (consumptionW * hours * days) / 1000;
}
</script>

<template>
  <UForm :state="state" class="flex flex-col gap-4" @submit="onSubmit">
    <UFormField
      label="Power Consumption (W)"
      name="consumptionW"
      class="flex justify-between items-center"
    >
      <UInputNumber v-model="state.consumptionW" class="w-full" />
    </UFormField>
    <UFormField
      label="Total Hours Per Day"
      name="hours"
      class="flex justify-between items-center"
    >
      <UInputNumber v-model="state.hours" :min="1" :max="24" class="w-full" />
    </UFormField>
    <UFormField
      label="Total Days Per Month"
      name="days"
      class="flex justify-between items-center"
    >
      <UInputNumber v-model="state.days" :min="1" :max="30" class="w-full" />
    </UFormField>

    <UButton label="Calculate" type="submit" variant="soft" class="self-end" />
  </UForm>
</template>
