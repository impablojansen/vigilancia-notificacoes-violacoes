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
        <FloatLabel variant="on">
          <Select id="sexo" v-model="modelValue.sexo" :options="SEXO_OPTIONS" optionLabel="label" optionValue="value"
            fluid />
          <label for="sexo">Sexo</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-3">
        <FloatLabel variant="on">
          <Select id="raca_cor_etnia" v-model="modelValue.raca_cor_etnia" :options="RACA_COR_ETNIA_OPTIONS"
            optionLabel="label" optionValue="value" fluid />
          <label for="raca_cor_etnia">Raça/Cor/Etnia</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-3">
        <FloatLabel variant="on">
          <Select id="estado_civil" v-model="modelValue.estado_civil" :options="ESTADO_CIVIL_OPTIONS"
            optionLabel="label" optionValue="value" fluid />
          <label for="estado_civil">Estado Civil</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-3">
        <FloatLabel variant="on">
          <Select id="grau_instrucao" v-model="modelValue.grau_instrucao" :options="GRAU_INSTRUCAO_OPTIONS"
            optionLabel="label" optionValue="value" fluid />
          <label for="grau_instrucao">Grau de Instrução</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-3">
        <FloatLabel variant="on">
          <Select id="identidade_genero" v-model="modelValue.identidade_genero" :options="IDENTIDADE_GENERO_OPTIONS"
            optionLabel="label" optionValue="value" fluid />
          <label for="identidade_genero">Identidade de Gênero</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-3">
        <FloatLabel variant="on">
          <Select id="orientacao_sexual" v-model="modelValue.orientacao_sexual" :options="ORIENTACAO_SEXUAL_OPTIONS"
            optionLabel="label" optionValue="value" fluid />
          <label for="orientacao_sexual">Orientação Sexual</label>
        </FloatLabel>
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
