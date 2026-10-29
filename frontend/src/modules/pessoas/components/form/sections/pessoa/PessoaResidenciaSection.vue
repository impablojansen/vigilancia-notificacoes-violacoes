<script setup lang="ts">
import { computed, watch } from "vue";

import FormSection from "@/shared/components/form/FormSection.vue";
import FormGrid from "@/shared/components/form/FormGrid.vue";

import { vNormalizeText } from "@/shared/utils/normalizarTexto";
import { useLocalizacao } from "@/shared/composables/useLocalizacao";

import type {
    ErrosPessoa,
  } from "@/modules/pessoas/validation/validarPessoa";

  defineProps<{
    errors: ErrosPessoa;
}>();

const modelValue = defineModel({ type: Object, required: true });

const zonas = [
  { label: "URBANA", value: "URBANA" },
  { label: "RURAL", value: "RURAL" },
  { label: "PERIRUBANA", value: "PERIURBANA" },
];

const {
  paisesOptions,
  ufsBrasilOptions,
  municipiosDisponiveis,
  carregandoMunicipios,
  isBrasil,
  carregarMunicipiosDaUf,
  limparUfEMunicipio,
  limparMunicipio,
  codigoBrasil,
} = useLocalizacao("BR");


const paisEhBrasil = computed(() => isBrasil(modelValue.value.pais_residencia));


watch(
  () => modelValue.value.pais_residencia,
  async (novoPais, paisAnterior) => {
    if (!isBrasil(novoPais)) {
      limparUfEMunicipio(modelValue.value, "residencia");
      return;
    }

    if (
      novoPais === codigoBrasil &&
      modelValue.value.uf_residencia &&
      novoPais !== paisAnterior
    ) {
      await carregarMunicipiosDaUf(modelValue.value.uf_residencia);
    }
  },
  { immediate: true }
);

watch(
  () => modelValue.value.uf_residencia,
  async (novaUf, ufAnterior) => {
    if (!paisEhBrasil.value) {
      limparUfEMunicipio(modelValue.value, "residencia");
      return;
    }

    if (novaUf !== ufAnterior) {
      limparMunicipio(modelValue.value, "residencia");
    }

    if (!novaUf) {
      limparMunicipio(modelValue.value, "residencia");
      return;
    }

    await carregarMunicipiosDaUf(novaUf);
  },
  { immediate: true }
);

</script>

<template>
  <FormSection legend="Dados de Residência">
    <FormGrid>
      <div class="col-span-12 md:col-span-4">
        <FloatLabel variant="on">
          <Select id="pais_residencia" v-model="modelValue.pais_residencia" :options="paisesOptions" optionLabel="label"
            optionValue="value" :invalid="!!errors.pais_residencia" aria-describedby="erro-pais" filter fluid />
          <label for="pais_residencia">País</label>
        </FloatLabel>
        <small
          v-if="errors.pais_residencia"
          id="erro-pais"
          class="mt-1 block text-sm text-red-600"
        >
          {{ errors.pais_residencia }}
        </small>
      </div>

      <div class="col-span-12 md:col-span-4">
        <FloatLabel variant="on">
          <Select id="uf_residencia" v-model="modelValue.uf_residencia" :options="ufsBrasilOptions" optionLabel="label"
            optionValue="value" filter :invalid="!!errors.uf_residencia" aria-describedby="erro-uf" fluid :disabled="!paisEhBrasil" :class="{ 'opacity-50': !paisEhBrasil }" />
          <label for="uf_residencia">UF</label>
        </FloatLabel>
        <small
          v-if="errors.uf_residencia"
          id="erro-uf"
          class="mt-1 block text-sm text-red-600"
        >
          {{ errors.uf_residencia }}
        </small>
      </div>

      <div class="col-span-12 md:col-span-4">
        <FloatLabel variant="on">
          <Select id="municipio_residencia" v-model="modelValue.municipio_residencia" :options="municipiosDisponiveis"
            optionLabel="label" optionValue="value" filter :invalid="!!errors.municipio_residencia" aria-describedby="erro-municipio" fluid :loading="carregandoMunicipios"
            :disabled="!paisEhBrasil || !modelValue.uf_residencia"
            :class="{ 'opacity-50': !paisEhBrasil || !modelValue.uf_residencia }" />
          <label for="municipio_residencia">Município de Residência</label>
        </FloatLabel>
        <small
          v-if="errors.municipio_residencia"
          id="erro-municipio"
          class="mt-1 block text-sm text-red-600"
        >
          {{ errors.municipio_residencia }}
        </small>
      </div>

      <div class="col-span-12 md:col-span-4">
        <FloatLabel variant="on">
          <InputText id="distrito" v-model="modelValue.distrito" v-normalize-text="'ALPHANUM'" fluid />
          <label for="distrito">Distrito</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-4">
        <FloatLabel variant="on">
          <InputText id="bairro" v-model="modelValue.bairro" v-normalize-text="'ALPHANUM'" fluid />
          <label for="bairro">Bairro/Localidade</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-4">
        <FloatLabel variant="on">
          <InputMask id="cep_residencia" v-model="modelValue.cep" mask="99999-999" fluid />
          <label for="cep_residencia">CEP</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-8">
        <FloatLabel variant="on">
          <InputText id="logradouro" v-model="modelValue.logradouro" v-normalize-text="'ALPHANUM'" fluid />
          <label for="logradouro">Logradouro</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-4">
        <FloatLabel variant="on">
          <InputText id="numero" v-model="modelValue.numero" v-normalize-text="'ALPHANUM'" :useGrouping="false" fluid />
          <label for="numero">Número</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-4">
        <FloatLabel variant="on">
          <InputText id="complemento" v-model="modelValue.complemento" v-normalize-text="'ALPHANUM'" fluid />
          <label for="complemento">Complemento (apto, casa, ...)</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-4">
        <FloatLabel variant="on">
          <InputText id="ponto_referencia" v-model="modelValue.ponto_referencia" v-normalize-text="'ALPHANUM'" fluid />
          <label for="ponto_referencia">Ponto de Referência</label>
        </FloatLabel>
      </div>


      <div class="col-span-12 md:col-span-4">
        <FloatLabel variant="on">
          <Select id="zona_residencia" v-model="modelValue.zona_residencia" :options="zonas" optionLabel="label"
            optionValue="value" showClear fluid />
          <label for="zona_residencia">Zona da Residência</label>
        </FloatLabel>
      </div>
    </FormGrid>
  </FormSection>
</template>