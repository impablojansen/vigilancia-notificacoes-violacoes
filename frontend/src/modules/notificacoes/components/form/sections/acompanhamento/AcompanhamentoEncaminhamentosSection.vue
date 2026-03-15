<script setup lang="ts">
import FormSection from "@/shared/components/form/FormSection.vue";
import { ENCAMINHAMENTOS_OPTIONS } from "@/modules/notificacoes/constants/encaminhamentos";

const modelValue = defineModel({ type: Object, required: true });
</script>

<template>
  <FormSection legend="Encaminhamentos">
    <MultiSelect
      v-model="modelValue.encaminhamentos"
      :options="ENCAMINHAMENTOS_OPTIONS"
      optionLabel="label"
      optionValue="value"
      placeholder="Selecione os encaminhamentos realizados"
      filter
      display="chip"
      fluid
    />
  </FormSection>
</template>
