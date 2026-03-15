<script setup lang="ts">
import FormSection from "@/shared/components/form/FormSection.vue";
import FormGrid from "@/shared/components/form/FormGrid.vue";

import { MOTIVO_VIOLENCIA_OPTIONS } from "@/modules/notificacoes/constants/motivosViolencia";
import { MEIO_AGRESSAO_OPTIONS } from "@/modules/notificacoes/constants/meiosAgressao";
import { SIM_NAO_SEM_INFO_OPTIONS } from "@/modules/notificacoes/constants/respostasPadrao";

const modelValue = defineModel<{
  motivo_violencia?: string | null;
  lesao_autoprovocada?: string | null;
  meio_agressao?: string | null;
  ocorreu_outras_vezes?: string | null;
}>({ required: true });
</script>

<template>
  <FormSection legend="Qualificação da Violência/Violação">
    <FormGrid>
      <div class="col-span-12 md:col-span-7">
        <Select
          v-model="modelValue.motivo_violencia"
          :options="MOTIVO_VIOLENCIA_OPTIONS"
          optionLabel="label"
          optionValue="value"
          placeholder="Qual foi a motivação da violência?"
          showClear
          fluid
        />
      </div>

      <div class="col-span-12 md:col-span-5">
        <Select
          v-model="modelValue.lesao_autoprovocada"
          :options="SIM_NAO_SEM_INFO_OPTIONS"
          optionLabel="label"
          optionValue="value"
          placeholder="A lesão foi autoprovocada?"
          showClear
          fluid
        />
      </div>

      <div class="col-span-12 md:col-span-7">
        <Select
          v-model="modelValue.meio_agressao"
          :options="MEIO_AGRESSAO_OPTIONS"
          optionLabel="label"
          optionValue="value"
          placeholder="Qual foi o meio de agressão?"
          showClear
          fluid
        />
      </div>

      <div class="col-span-12 md:col-span-5">
        <Select
          v-model="modelValue.ocorreu_outras_vezes"
          :options="SIM_NAO_SEM_INFO_OPTIONS"
          optionLabel="label"
          optionValue="value"
          placeholder="Ocorreu outras vezes?"
          showClear
          fluid
        />
      </div>
    </FormGrid>
  </FormSection>
</template>
