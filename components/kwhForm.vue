<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";

const props = defineProps<{
  consumptionKwh: number;
}>();

const emits = defineEmits<{
  setConsumptionKwh: [value: number];
}>();

const formData = ref({
  consumptionKwh: props.consumptionKwh,
});

watch(
  () => props.consumptionKwh,
  (newValue) => {
    formData.value.consumptionKwh = newValue;
  },
);

async function onSubmit(event: FormSubmitEvent<typeof formData.value>) {
  emits("setConsumptionKwh", event.data.consumptionKwh);
}
</script>

<template>
  <UForm :state="formData" class="flex flex-col gap-4" @submit="onSubmit">
    <UFormField
      label="Total Consumption (kWh)"
      name="consumptionKwh"
      class="md:flex md:justify-between md:items-center"
    >
      <UInputNumber v-model="formData.consumptionKwh" class="w-full" />
    </UFormField>

    <UButton label="Calculate" type="submit" variant="soft" class="self-end" />
  </UForm>
</template>
