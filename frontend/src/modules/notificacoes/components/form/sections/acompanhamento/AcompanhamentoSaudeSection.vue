<script setup lang="ts">
import { computed, watch } from "vue";
import FormSection from "@/shared/components/form/FormSection.vue";
import FormGrid from "@/shared/components/form/FormGrid.vue";

import { vNormalizeText } from "@/shared/utils/normalizarTexto";

import { SIM_NAO_SEM_INFO_OPTIONS } from "@/modules/notificacoes/constants/respostasPadrao";

// Placeholder temporário.
const PROCEDIMENTOS_VIOLENCIA_SEXUAL_OPTIONS = [
  "Profilaxia para IST",
  "Profilaxia para HIV",
  "Profilaxia para Hepatite B",
  "Coleta de sangue",
  "Coleta de sêmen",
  "Coleta de secreção vaginal",
  "Contracepção de emergência",
  "Aborto previsto em lei",
];

const CAT_OPTIONS = [
  { label: "Sim", value: "SIM" },
  { label: "Não", value: "NAO" },
  { label: "Não se aplica", value: "NAO_SE_APLICA" },
  { label: "Sem informação", value: "SEM_INFORMACAO" },
];

const modelValue = defineModel({ type: Object, required: true });

const violenciaTrabalhoHabilitada = computed(() => {
  return modelValue.value.violencia_relacionada_trabalho === "SIM";
});

watch(
  () => modelValue.value.violencia_relacionada_trabalho,
  (novoValor) => {
    if (novoValor !== "SIM") {
      modelValue.value.cat_emitida = null;
      modelValue.value.circunstancia_lesao_cid10 = "";
      modelValue.value.data_encerramento_trabalho = null;
    }
  }
);
</script>

<template>
  <FormSection legend="Campo exclusivo e obrigatório para Unidades de Saúde">
    <div class="flex flex-col gap-4">
      <div class="rounded-xl border border-surface-200 bg-surface-50 p-4">
        <div class="mb-4">
          <h4 class="text-sm font-semibold text-surface-800">
            Identificação da unidade
          </h4>
          <p class="mt-1 text-sm text-surface-600">
            Informe os dados da unidade notificadora e da unidade de saúde relacionada ao atendimento.
          </p>
        </div>

        <FormGrid>
          <div class="col-span-12 md:col-span-8">
            <FloatLabel variant="on">
              <InputText id="nome_unidade_notificadora" v-model="modelValue.nome_unidade_notificadora"
                v-normalize-text="'ALPHANUM'" fluid />
              <label for="nome_unidade_notificadora">
                Nome da Unidade Notificadora
              </label>
            </FloatLabel>
          </div>

          <div class="col-span-12 md:col-span-4">
            <FloatLabel variant="on">
              <InputText id="codigo_unidade_notificadora" v-model="modelValue.codigo_unidade_notificadora"
                v-normalize-text="'ALPHANUM'" fluid />
              <label for="codigo_unidade_notificadora">
                Código da Unidade
              </label>
            </FloatLabel>
          </div>

          <div class="col-span-12 md:col-span-8">
            <FloatLabel variant="on">
              <InputText id="unidade_saude" v-model="modelValue.unidade_saude" v-normalize-text="'ALPHANUM'" fluid />
              <label for="unidade_saude">
                Unidade de Saúde
              </label>
            </FloatLabel>
          </div>

          <div class="col-span-12 md:col-span-4">
            <FloatLabel variant="on">
              <InputText id="codigo_cnes" v-model="modelValue.codigo_cnes" v-normalize-text="'ALPHANUM'" fluid />
              <label for="codigo_cnes">
                Código (CNES)
              </label>
            </FloatLabel>
          </div>
        </FormGrid>
      </div>

      <div class="rounded-xl border border-surface-200 bg-surface-50 p-4">
        <div class="mb-4">
          <h4 class="text-sm font-semibold text-surface-800">
            Procedimentos realizados
          </h4>
          <p class="mt-1 text-sm text-surface-600">
            Preencha quando aplicável, especialmente em situações de violência sexual.
          </p>
        </div>

        <FormGrid>
          <div class="col-span-12">
            <MultiSelect v-model="modelValue.procedimentos_saude_realizados" :options="PROCEDIMENTOS_VIOLENCIA_SEXUAL_OPTIONS"
              placeholder="Selecione os procedimentos realizados" filter display="chip" fluid />
          </div>
        </FormGrid>
      </div>

      <div class="rounded-xl border border-surface-200 bg-surface-50 p-4">
        <div class="mb-4">
          <h4 class="text-sm font-semibold text-surface-800">
            Violência relacionada ao trabalho
          </h4>
          <p class="mt-1 text-sm text-surface-600">
            Preencha este bloco quando houver suspeita ou confirmação de relação entre a violência e o contexto de
            trabalho.
          </p>
        </div>

        <FormGrid>
          <div class="col-span-12 md:col-span-6">
            <FloatLabel variant="on">
              <Select id="violencia_relacionada_trabalho" v-model="modelValue.violencia_relacionada_trabalho"
                :options="SIM_NAO_SEM_INFO_OPTIONS" optionLabel="label" optionValue="value" fluid />
              <label for="violencia_relacionada_trabalho">Violência relacionada ao trabalho?</label>
            </FloatLabel>
          </div>

          <div class="col-span-12 md:col-span-6">
            <FloatLabel variant="on">
              <Select id="cat_emitida" v-model="modelValue.cat_emitida" :options="CAT_OPTIONS" optionLabel="label"
                optionValue="value" fluid :disabled="!violenciaTrabalhoHabilitada"
                :class="{ 'opacity-50': !violenciaTrabalhoHabilitada }" />
              <label for="cat_emitida">Comunicação de Acidente no Trabalho (CAT) emitida?</label>
            </FloatLabel>
          </div>

          <div class="col-span-12 md:col-span-6">
            <FloatLabel variant="on">
              <InputText id="circunstancia_lesao_cid10" v-model="modelValue.circunstancia_lesao_cid10" maxlength="10"
                fluid :disabled="!violenciaTrabalhoHabilitada"
                :class="{ 'opacity-50': !violenciaTrabalhoHabilitada }" />
              <label for="circunstancia_lesao_cid10">
                Circunstância da lesão (CID-10 / Cap. XX)
              </label>
            </FloatLabel>
          </div>

          <div class="col-span-12 md:col-span-6">
            <FloatLabel variant="on">
              <DatePicker id="data_encerramento_saude" v-model="modelValue.data_encerramento_saude"
                dateFormat="dd/mm/yy" showIcon showButtonBar fluid :disabled="!violenciaTrabalhoHabilitada"
                :class="{ 'opacity-50': !violenciaTrabalhoHabilitada }" />
              <label for="data_encerramento_saude">
                Data de encerramento
              </label>
            </FloatLabel>
          </div>
        </FormGrid>
      </div>
    </div>
  </FormSection>
</template>