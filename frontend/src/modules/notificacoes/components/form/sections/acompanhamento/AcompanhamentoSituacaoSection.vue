<script setup lang="ts">
import { watch } from "vue";
import FormSection from "@/shared/components/form/FormSection.vue";
import FormGrid from "@/shared/components/form/FormGrid.vue";
import { SITUACAO_RUPTURA_PSR_OPTIONS } from "@/modules/notificacoes/constants/situacaoRupturaPsr";

const modelValue = defineModel({ type: Object, required: true });

watch(
  () => modelValue.value?.situacao_ruptura_psr,
  (val) => {
    if (val !== "OUTRO") {
      modelValue.value.outra_situacao = "";
    }
  }
);
</script>

<template>
  <FormSection
    legend="Situação do Caso em Ruptura de Vínculos / Pessoa em Situação de Rua"
  >
    <FormGrid>
      <div class="col-span-12 md:col-span-6">
        <Select
          v-model="modelValue.situacao_ruptura_psr"
          :options="SITUACAO_RUPTURA_PSR_OPTIONS"
          optionLabel="label"
          optionValue="value"
          placeholder="Situação do caso"
          showClear
          fluid
        />
      </div>

      <div class="col-span-12 md:col-span-6">
        <InputText
          v-model="modelValue.outra_situacao"
          placeholder="Especificar a situação"
          :disabled="modelValue.situacao_ruptura_psr !== 'OUTRO'"
          :class="{ 'opacity-50': modelValue.situacao_ruptura_psr !== 'OUTRO' }"
          fluid
        />
      </div>
    </FormGrid>
  </FormSection>
</template>
