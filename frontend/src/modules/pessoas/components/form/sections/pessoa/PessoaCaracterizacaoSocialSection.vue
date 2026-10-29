<script setup lang="ts">
import FormSection from "@/shared/components/form/FormSection.vue";
import FormGrid from "@/shared/components/form/FormGrid.vue";

import type {
    ErrosPessoa,
  } from "@/modules/pessoas/validation/validarPessoa";

  defineProps<{
    errors: ErrosPessoa;
}>();

import {
  SEXO_PESSOA_OPTIONS,
  RACA_COR_ETNIA_OPTIONS,
  ESTADO_CIVIL_OPTIONS,
  GRAU_INSTRUCAO_OPTIONS,
  IDENTIDADE_GENERO_OPTIONS,
  ORIENTACAO_SEXUAL_OPTIONS
} from "@/modules/pessoas/constants/perfilPessoa";

import { vNormalizeText } from "@/shared/utils/normalizarTexto";

const modelValue = defineModel({ type: Object, required: true });
</script>

<template>
  <FormSection legend="Caracterização Social">
    <FormGrid>
      <div class="col-span-12 md:col-span-3">
        <FloatLabel variant="on">
          <Select
            id="sexo"
            v-model="modelValue.sexo"
            :options="SEXO_PESSOA_OPTIONS"
            optionLabel="label"
            optionValue="value"
            :invalid="!!errors.sexo"
            aria-describedby="erro-sexo"
            fluid
          />
          <label for="sexo">Sexo</label>
        </FloatLabel>
        <small
          v-if="errors.sexo"
          id="erro-sexo"
          class="mt-1 block text-sm text-red-600"
        >
          {{ errors.sexo }}
        </small>
      </div>

      <div class="col-span-12 md:col-span-3">
        <FloatLabel variant="on">
          <Select id="raca_cor_etnia" v-model="modelValue.raca_cor_etnia" :options="RACA_COR_ETNIA_OPTIONS"
            optionLabel="label" optionValue="value" :invalid="!!errors.raca_cor_etnia" aria-describedby="erro-raca-cor-etnia" fluid />
          <label for="raca_cor_etnia">Raça/Cor/Etnia</label>
        </FloatLabel>
        <small
          v-if="errors.raca_cor_etnia"
          id="erro-raca-cor-etnia"
          class="mt-1 block text-sm text-red-600"
        >
          {{ errors.raca_cor_etnia }}
        </small>
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
          <InputText id="ocupacao" v-model="modelValue.ocupacao" v-normalize-text="'ALPHA'" :invalid="!!errors.ocupacao" aria-describedby="erro-ocupacao" fluid />
          <label for="ocupacao">Ocupação</label>
        </FloatLabel>
        <small
          v-if="errors.ocupacao"
          id="erro-ocupacao"
          class="mt-1 block text-sm text-red-600"
        >
          {{ errors.ocupacao }}
        </small>
      </div>
    </FormGrid>
  </FormSection>
</template>
