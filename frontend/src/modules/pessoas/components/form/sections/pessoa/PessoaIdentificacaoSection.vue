<script setup lang="ts">

import { vNormalizeText } from "@/shared/utils/normalizarTexto";

import FormSection from "@/shared/components/form/FormSection.vue";
import FormGrid from "@/shared/components/form/FormGrid.vue";

const modelValue = defineModel({ type: Object, required: true });
</script>

<template>
  <FormSection legend="Identificação">
    <FormGrid>
      <div class="col-span-12 md:col-span-8">
        <FloatLabel variant="on">
          <InputText id="nome" v-model="modelValue.nome_pessoa" v-normalize-text="'ALPHA'" fluid />
          <label for="nome">Nome Completo</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-4">
        <FloatLabel variant="on">
          <DatePicker id="data_nascimento" v-model="modelValue.data_nascimento" dateFormat="dd/mm/yy" showIcon
            showButtonBar fluid />
          <label for="data_nascimento">Data de Nascimento</label>
        </FloatLabel>

      </div>

      <div class="col-span-12 md:col-span-6">
        <FloatLabel variant="on">
          <InputText id="nome_social" v-model="modelValue.nome_social" v-normalize-text="'ALPHA'" fluid />
          <label for="nome_social">Nome Social</label>
        </FloatLabel>
      </div>



      <div class="col-span-12 md:col-span-6">
        <FloatLabel variant="on">
          <InputText id="nome_mae" v-model="modelValue.nome_mae" v-normalize-text="'ALPHA'" fluid />
          <label for="nome_mae">Nome da Mãe</label>
        </FloatLabel>
      </div>
    </FormGrid>
  </FormSection>
</template>
