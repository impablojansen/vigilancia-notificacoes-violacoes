<script setup lang="ts">
import FormSection from "@/shared/components/form/FormSection.vue";
import FormGrid from "@/shared/components/form/FormGrid.vue";

import { MOTIVO_VIOLENCIA_OPTIONS } from "@/modules/notificacoes/constants/motivosViolencia";
import { MEIO_AGRESSAO_OPTIONS } from "@/modules/notificacoes/constants/meiosAgressao";

const modelValue = defineModel<{
  motivo_violencia?: string | null;
  meio_agressao?: string | null;
}>({ required: true });
</script>

<template>
  <FormSection legend="Em caso de violência, responda os campos abaixo">
    <FormGrid>
      <div class="col-span-12 md:col-span-6">
        <FloatLabel variant="on">
          <Select id="motivo_violencia" v-model="modelValue.motivo_violencia" :options="MOTIVO_VIOLENCIA_OPTIONS"
            optionLabel="label" optionValue="value" fluid />
          <label for="motivo_violencia">Qual foi a motivação da violência?</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-6">
        <FloatLabel variant="on">
          <Select id="meio_agressao" v-model="modelValue.meio_agressao" :options="MEIO_AGRESSAO_OPTIONS"
            optionLabel="label" optionValue="value" fluid />
          <label for="meio_agressao">Qual foi o meio de agressão?</label>
        </FloatLabel>
      </div>

    </FormGrid>
  </FormSection>
</template>
