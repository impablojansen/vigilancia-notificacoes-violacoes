<script setup lang="ts">
import { computed, watch } from "vue";
import FormSection from "@/shared/components/form/FormSection.vue";
import FormGrid from "@/shared/components/form/FormGrid.vue";

import {
  TIPO_DEFICIENCIA_OPTIONS,
  DEFICIENCIAS_POR_TIPO,
} from "@/modules/notificacoes/constants/deficiencias";

const modelValue = defineModel({ type: Object, required: true });

const opcoesDeficienciaSelecionada = computed(() => {
  return DEFICIENCIAS_POR_TIPO[modelValue.value.tipo_deficiencia] || [];
});

watch(
  () => modelValue.value.is_pcd,
  (val) => {
    if (!val) {
      modelValue.value.tipo_deficiencia = null;
      modelValue.value.deficiencia = null;
    }
  }
);
</script>

<template>
  <FormSection legend="Deficiência / Transtorno">
    <FormGrid>
      <div class="col-span-12 md:col-span-3 flex items-center gap-2">
        <Checkbox v-model="modelValue.is_pcd" binary />
        <label>Possui deficiência/transtorno?</label>
      </div>

      <div class="col-span-12 md:col-span-3">
        <Select
          v-model="modelValue.tipo_deficiencia"
          :options="TIPO_DEFICIENCIA_OPTIONS"
          optionLabel="label"
          optionValue="value"
          placeholder="Tipo de Deficiência"
          :disabled="!modelValue.is_pcd"
          :class="{ 'opacity-50': !modelValue.is_pcd }"
          showClear
          fluid
        />
      </div>

      <div class="col-span-12 md:col-span-6">
        <Select
          v-model="modelValue.deficiencia"
          :options="opcoesDeficienciaSelecionada"
          optionLabel="label"
          optionValue="value"
          placeholder="Deficiência"
          :disabled="!modelValue.tipo_deficiencia"
          :class="{ 'opacity-50': !modelValue.tipo_deficiencia }"
          filter
          showClear
          fluid
        />
      </div>

      <div class="col-span-12 md:col-span-6">
        <Select
          v-model="modelValue.transtorno_mental_comportamento"
          :options="[
            { label: 'Sim', value: 'SIM' },
            { label: 'Não', value: 'NAO' },
            { label: 'Sem informação', value: 'SEM_INFORMACAO' }
          ]"
          optionLabel="label"
          optionValue="value"
          placeholder="Transtorno mental/comportamento"
          showClear
          fluid
        />
      </div>
    </FormGrid>
  </FormSection>
</template>
