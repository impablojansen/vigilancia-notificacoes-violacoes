<script setup lang="ts">
import { ref, watch } from "vue";
import { vNormalizeText } from "@/shared/utils/normalizarTexto";
import { useLocalizacao } from "@/shared/composables/useLocalizacao";

import FormSection from "@/shared/components/form/FormSection.vue";
import FormGrid from "@/shared/components/form/FormGrid.vue";

const modelValue = defineModel({ type: Object, required: true });

const {
  ufsBrasilOptions,
  municipiosDisponiveis,
  carregandoMunicipios,
  carregarMunicipiosDaUf,
  limparMunicipio,
} = useLocalizacao("BR");

watch(
  () => modelValue.value.uf_ocorrencia,
  async (novaUf, ufAnterior) => {
    if (novaUf !== ufAnterior) {
      limparMunicipio(modelValue.value, "ocorrencia");
    }

    if (!novaUf) {
      limparMunicipio(modelValue.value, "ocorrencia");
      return;
    }

    await carregarMunicipiosDaUf(novaUf);
  },
  { immediate: true }
);


const locaisOcorrencia = ref([
  "Residência",
  "Habitação coletiva",
  "Escola",
  "Local de prática esportiva",
  "Bar ou similar",
  "Via pública",
  "Comércio/serviços",
  "Indústrias/construção",
  "Outros",
  "Sem informação"
]);

const zonas = ref(["Urbana", "Rural", "Periurbana"]);
</script>

<template>
  <FormSection legend="Local da Ocorrência">
    <FormGrid>

      <div class="col-span-12 md:col-span-4">
        <FloatLabel variant="on">
          <Select id="uf_ocorrencia" v-model="modelValue.uf_ocorrencia" :options="ufsBrasilOptions" optionLabel="label"
            optionValue="value" filter fluid />
          <label for="uf_ocorrencia">UF da Ocorrência</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-4">
        <FloatLabel variant="on">
          <Select id="uf_ocorrencia" v-model="modelValue.municipio_ocorrencia" :options="municipiosDisponiveis"
            optionLabel="label" optionValue="value" :loading="carregandoMunicipios"
            :disabled="!modelValue.uf_ocorrencia" filter fluid />
          <label for="uf_ocorrencia">Município da Ocorrência</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-4">
        <FloatLabel variant="on">
          <Select v-model="modelValue.zona_ocorrencia" :options="zonas" fluid />
          <label for="zona_ocorrencia">Zona da Ocorrência</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-4">
        <FloatLabel variant="on">
          <InputText id="distrito_ocorrencia" v-model="modelValue.distrito_ocorrencia" v-normalize-text="'ALPHANUM'"
            fluid />
          <label for="distrito_ocorrencia">Distrito da Ocorrência</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-4">
        <FloatLabel variant="on">
          <InputText id="bairro_ocorrencia" v-model="modelValue.bairro_ocorrencia" v-normalize-text="'ALPHANUM'"
            fluid />
          <label for="bairro_ocorrencia">Bairro/Localidade da Ocorrência</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-4">
        <FloatLabel variant="on">
          <InputMask id="cep_ocorrencia" v-model="modelValue.cep_ocorrencia" mask="99999-999" fluid />
          <label for="cep_ocorrencia">CEP da Ocorrência</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-8">
        <FloatLabel variant="on">
          <InputText id="endereco_ocorrencia" v-model="modelValue.logradouro_ocorrencia" v-normalize-text="'ALPHANUM'"
            fluid />
          <label for="endereco_ocorrencia">Logradouro da Ocorrência</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-4">
        <FloatLabel variant="on">
          <InputNumber id="numero_ocorrencia" v-model="modelValue.numero_ocorrencia" :useGrouping="false" fluid />
          <label for="numero_ocorrencia">Número</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-4">
        <FloatLabel variant="on">
          <InputText id="complemento_ocorrencia" v-model="modelValue.complemento_ocorrencia"
            v-normalize-text="'ALPHANUM'" fluid />
          <label for="complemento_ocorrencia">Complemento (apto, casa, ...)</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-4">
        <FloatLabel variant="on">
          <InputText id="ponto_referencia_ocorrencia" v-model="modelValue.ponto_referencia_ocorrencia"
            v-normalize-text="'ALPHANUM'" fluid />
          <label for="ponto_referencia_ocorrencia">Ponto de Referência</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-4">
        <FloatLabel variant="on">
          <Select v-model="modelValue.local_ocorrencia" :options="locaisOcorrencia" fluid />
          <label for="local_ocorrencia">Local da Ocorrência</label>
        </FloatLabel>
      </div>

    </FormGrid>
  </FormSection>
</template>
