<script setup lang="ts">
import FormSection from "@/shared/components/form/FormSection.vue";
import FormGrid from "@/shared/components/form/FormGrid.vue";

import { SEXO_OPTIONS } from "@/modules/notificacoes/constants/sexo";
import { CICLO_VIDA_OPTIONS } from "@/modules/notificacoes/constants/cicloVida";
import { RACA_COR_ETNIA_OPTIONS } from "@/modules/notificacoes/constants/racaCorEtnia";
import { ESTADO_CIVIL_OPTIONS } from "@/modules/notificacoes/constants/estadoCivil";
import { GRAU_INSTRUCAO_OPTIONS } from "@/modules/notificacoes/constants/grauInstrucao";
import { SEGMENTO_LGBT_OPTIONS } from "@/modules/notificacoes/constants/segmentoLgbt";
import { IDENTIDADE_GENERO_OPTIONS } from "@/modules/notificacoes/constants/identidadeGenero";

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
          v-model="modelValue.ciclo_vida"
          :options="CICLO_VIDA_OPTIONS"
          optionLabel="label"
          optionValue="value"
          placeholder="Ciclo de Vida"
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

      <div class="col-span-12 md:col-span-4">
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

      <div class="col-span-12 md:col-span-4">
        <FloatLabel variant="on">
          <InputText id="ocupacao" v-model="modelValue.ocupacao" fluid />
          <label for="ocupacao">Ocupação</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-4">
        <Select
          v-model="modelValue.segmento_lgbtqiapn"
          :options="SEGMENTO_LGBT_OPTIONS"
          optionLabel="label"
          optionValue="value"
          placeholder="Segmento LGBTQIAPN+"
          showClear
          fluid
        />
      </div>

      <div class="col-span-12 md:col-span-6">
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
    </FormGrid>
  </FormSection>
</template>
