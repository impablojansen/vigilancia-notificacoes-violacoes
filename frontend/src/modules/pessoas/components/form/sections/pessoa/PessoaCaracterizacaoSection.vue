<script setup lang="ts">
import FormSection from "@/shared/components/form/FormSection.vue";
import FormGrid from "@/shared/components/form/FormGrid.vue";

import { SEXO_OPTIONS } from "@/modules/pessoas/constants/sexo";
import { RACA_COR_ETNIA_OPTIONS } from "@/modules/pessoas/constants/racaCorEtnia";
import { ESTADO_CIVIL_OPTIONS } from "@/modules/pessoas/constants/estadoCivil";
import { GRAU_INSTRUCAO_OPTIONS } from "@/modules/pessoas/constants/grauInstrucao";
import { ORIENTACAO_SEXUAL_OPTIONS } from "@/modules/pessoas/constants/orientacaoSexual";
import { IDENTIDADE_GENERO_OPTIONS } from "@/modules/pessoas/constants/identidadeGenero";

const modelValue = defineModel({ type: Object, required: true });
</script>

<template>
  <FormSection legend="Caracterização Social">
    <FormGrid>
      <div class="col-span-12 md:col-span-3">
        <Select
          v-model="modelValue.sexo"
          :options="SEXO_OPTIONS"
          optionLabel="label"
          optionValue="value"
          placeholder="Sexo"
          showClear
          fluid
        />
      </div>

      <div class="col-span-12 md:col-span-3">
        <Select
          v-model="modelValue.raca_cor_etnia"
          :options="RACA_COR_ETNIA_OPTIONS"
          optionLabel="label"
          optionValue="value"
          placeholder="Raça/Etnia"
          showClear
          fluid
        />
      </div>

      <div class="col-span-12 md:col-span-3">
        <Select
          v-model="modelValue.estado_civil"
          :options="ESTADO_CIVIL_OPTIONS"
          optionLabel="label"
          optionValue="value"
          placeholder="Estado Civil"
          showClear
          fluid
        />
      </div>

      <div class="col-span-12 md:col-span-3">
        <Select
          v-model="modelValue.grau_instrucao"
          :options="GRAU_INSTRUCAO_OPTIONS"
          optionLabel="label"
          optionValue="value"
          placeholder="Grau de Instrução"
          showClear
          fluid
        />
      </div>

      <div class="col-span-12 md:col-span-3">
        <Select
          v-model="modelValue.identidade_genero"
          :options="IDENTIDADE_GENERO_OPTIONS"
          optionLabel="label"
          optionValue="value"
          placeholder="Identidade de Gênero"
          showClear
          fluid
        />
      </div>

      <div class="col-span-12 md:col-span-3">
        <Select
          v-model="modelValue.segmento_lgbtqiapn"
          :options="ORIENTACAO_SEXUAL_OPTIONS"
          optionLabel="label"
          optionValue="value"
          placeholder="Orientação Sexual"
          showClear
          fluid
        />
      </div>

      <div class="col-span-12 md:col-span-3">
        <FloatLabel variant="on">
          <InputText id="ocupacao" v-model="modelValue.ocupacao" fluid />
          <label for="ocupacao">Ocupação</label>
        </FloatLabel>
      </div>
    </FormGrid>
  </FormSection>
</template>
