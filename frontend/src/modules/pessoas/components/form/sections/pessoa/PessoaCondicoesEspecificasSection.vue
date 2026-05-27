<script setup lang="ts">
import { watch } from "vue";
import FormSection from "@/shared/components/form/FormSection.vue";
import FormGrid from "@/shared/components/form/FormGrid.vue";
import { GPTES_OPTIONS } from "@/modules/pessoas/constants/gptes";

const modelValue = defineModel({ type: Object, required: true });

// const GESTANTE_OPTIONS = [
//   { label: "Não", value: "NAO" },
//   { label: "1º Trimestre", value: "TRIMESTRE_1" },
//   { label: "2º Trimestre", value: "TRIMESTRE_2" },
//   { label: "3º Trimestre", value: "TRIMESTRE_3" },
//   { label: "Idade Gestacional Ignorada", value: "IDADE_GESTACIONAL_IGN" },  
//   { label: "Sem informação", value: "SEM_INFORMACAO" },
// ];

const SIM_NAO_SEM_INFO_OPTIONS = [
  { label: "Sim", value: "SIM" },
  { label: "Não", value: "NAO" },
  { label: "Sem informação", value: "SEM_INFORMACAO" },
];

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
      <div class="col-span-12 md:col-span-2 flex items-center gap-2">
        <Checkbox id="is_psr" v-model="modelValue.is_psr" binary />
        <label for="is_psr">Encontra-se em situação de rua?</label>
      </div>

      <div class="col-span-12 md:col-span-2 flex items-center gap-2">
        <Checkbox id="is_migrante" v-model="modelValue.is_migrante" binary />
        <label for="is_migrante">É migrante?</label>
      </div>

      <div class="col-span-12 md:col-span-4">
        <FloatLabel variant="on">
          <InputText id="nacionalidade" v-model="modelValue.nacionalidade" :disabled="!modelValue.is_migrante"
            :class="{ 'opacity-50': !modelValue.is_migrante }" fluid />
          <label for="nacionalidade">Nacionalidade</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-4">
        <FloatLabel variant="on">
          <InputText id="naturalidade" v-model="modelValue.naturalidade" :disabled="!modelValue.is_migrante"
            :class="{ 'opacity-50': !modelValue.is_migrante }" fluid />
          <label for="naturalidade">Naturalidade</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-12">
        <FloatLabel variant="on">
          <Select id="grupos_populacionais_gpte" v-model="modelValue.grupo_populacional_gptes" :options="GPTES_OPTIONS"
            optionLabel="label" optionValue="value" filter showClear display="chip" fluid />
          <label for="grupos_populacionais_gpte">Povos Originários e Grupos Populacionais, Tradicionais ou
            Específicos</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-6">
        <FloatLabel variant="on">
          <Select id="recebe_bpc" v-model="modelValue.recebe_bpc" :options="SIM_NAO_SEM_INFO_OPTIONS"
            optionLabel="label" optionValue="value" fluid />
          <label for="recebe_bpc">Recebe BPC?</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-6">
        <FloatLabel variant="on">
          <Select id="participa_transferencia_renda" v-model="modelValue.participa_transferencia_renda"
            :options="SIM_NAO_SEM_INFO_OPTIONS" optionLabel="label" optionValue="value" fluid />
          <label for="participa_transferencia_renda">
            Participa de Programas de Transferência de Renda?
          </label>
        </FloatLabel>
      </div>

    </FormGrid>
  </FormSection>
</template>
