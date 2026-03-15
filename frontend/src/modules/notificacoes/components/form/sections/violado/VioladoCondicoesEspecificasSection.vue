<script setup lang="ts">
import { watch } from "vue";
import FormSection from "@/shared/components/form/FormSection.vue";
import FormGrid from "@/shared/components/form/FormGrid.vue";
import { GPTES_OPTIONS } from "@/modules/notificacoes/constants/gptes";

const modelValue = defineModel({ type: Object, required: true });

const GESTANTE_OPTIONS = [
  { label: "Sim", value: "SIM" },
  { label: "Não", value: "NAO" },
  { label: "Sem informação", value: "SEM_INFORMACAO" },
] as const;

const SIM_NAO_SEM_INFO_OPTIONS = [
  { label: "Sim", value: "SIM" },
  { label: "Não", value: "NAO" },
  { label: "Sem informação", value: "SEM_INFORMACAO" },
] as const;

watch(
  () => modelValue.value.is_migrante,
  (val) => {
    if (!val) {
      modelValue.value.nacionalidade = "";
      modelValue.value.naturalidade = "";
    }
  }
);
</script>

<template>
  <FormSection legend="Condições Específicas">
    <FormGrid>
      <div class="col-span-12 md:col-span-4 flex items-center gap-2">
        <Checkbox v-model="modelValue.is_migrante" binary />
        <label>É migrante?</label>
      </div>

      <div class="col-span-12 md:col-span-4">
        <InputText
          v-model="modelValue.nacionalidade"
          placeholder="País de origem"
          :disabled="!modelValue.is_migrante"
          :class="{ 'opacity-50': !modelValue.is_migrante }"
          fluid
        />
      </div>

      <div class="col-span-12 md:col-span-4">
        <InputText
          v-model="modelValue.naturalidade"
          placeholder="Município/Estado"
          :disabled="!modelValue.is_migrante"
          :class="{ 'opacity-50': !modelValue.is_migrante }"
          fluid
        />
      </div>

      <div class="col-span-12 md:col-span-4">
        <Select
          v-model="modelValue.gestante"
          :options="GESTANTE_OPTIONS"
          optionLabel="label"
          optionValue="value"
          placeholder="A vítima encontra-se gestante?"
          showClear
          fluid
        />
      </div>

      <div class="col-span-12 md:col-span-8">
        <MultiSelect
          v-model="modelValue.grupo_populacional_gptes"
          :options="GPTES_OPTIONS"
          optionLabel="label"
          optionValue="value"
          placeholder="Povos Originários e Grupos Populacionais Tradicionais ou Específicos"
          filter
          showClear
          display="chip"
          fluid
        />
      </div>

      <div class="col-span-12 md:col-span-4">
        <Select
          v-model="modelValue.recebe_bpc"
          :options="SIM_NAO_SEM_INFO_OPTIONS"
          optionLabel="label"
          optionValue="value"
          placeholder="Recebe BPC?"
          showClear
          fluid
        />
      </div>

      <div class="col-span-12 md:col-span-4">
        <Select
          v-model="modelValue.participa_transferencia_renda"
          :options="SIM_NAO_SEM_INFO_OPTIONS"
          optionLabel="label"
          optionValue="value"
          placeholder="Participa de programa de transferência de renda?"
          showClear
          fluid
        />
      </div>

      <div class="col-span-12 md:col-span-4">
        <Select
          v-model="modelValue.medida_socioeducativa_meio_aberto"
          :options="SIM_NAO_SEM_INFO_OPTIONS"
          optionLabel="label"
          optionValue="value"
          placeholder="Cumpre medida socioeducativa em meio aberto?"
          showClear
          fluid
        />
      </div>
    </FormGrid>
  </FormSection>
</template>
