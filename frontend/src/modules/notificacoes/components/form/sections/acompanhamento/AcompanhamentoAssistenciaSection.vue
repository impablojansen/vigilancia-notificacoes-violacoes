<script setup lang="ts">
import { computed, watch } from "vue";
import FormSection from "@/shared/components/form/FormSection.vue";
import FormGrid from "@/shared/components/form/FormGrid.vue";

import { STATUS_ACOMPANHAMENTO_OPTIONS } from "@/modules/notificacoes/constants/statusAcompanhamento";
import { LOCAIS_ACOMPANHAMENTO_OPTIONS } from "@/modules/notificacoes/constants/locaisAcompanhamento";
import { SERVICOS } from "@/modules/notificacoes/constants/servicos";
import { SITUACAO_RUPTURA_PSR_OPTIONS } from "@/modules/notificacoes/constants/situacaoRupturaPsr";

const modelValue = defineModel({ type: Object, required: true });

const statusAcompanhamento = computed(() => modelValue.value.status_acompanhamento);

const acompanhamentoHabilitado = computed(() => {
  return (
    statusAcompanhamento.value === "CASO_EM_ACOMPANHAMENTO" ||
    statusAcompanhamento.value === "CASO_CONCLUIDO"
  );
});

const dataEncerramentoHabilitada = computed(() => {
  return statusAcompanhamento.value === "CASO_CONCLUIDO";
});

const situacaoRupturaPsrHabilitada = computed(() => {
  return (
    statusAcompanhamento.value === "CASO_EM_ACOMPANHAMENTO" ||
    statusAcompanhamento.value === "CASO_CONCLUIDO"
  );
});

watch(
  () => modelValue.value.status_acompanhamento,
  (novoStatus) => {
    if (
      novoStatus === "CASO_NAO_ACOMPANHADO" ||
      novoStatus === "SEM_INFORMACAO"
    ) {
      modelValue.value.local_acompanhamento = null;
      modelValue.value.servico_inserido = null;
      modelValue.value.data_encerramento = null;
    }

    if (novoStatus === "CASO_EM_ACOMPANHAMENTO") {
      modelValue.value.data_encerramento = null;
    }
  }
);

watch(
  () => situacaoRupturaPsrHabilitada.value,
  (habilitado) => {
    if (!habilitado) {
      modelValue.value.situacao_ruptura_psr = null;
      modelValue.value.outra_situacao = "";
    }
  }
);

watch(
  () => modelValue.value?.situacao_ruptura_psr,
  (val) => {
    if (val !== "OUTRO") {
      modelValue.value.outra_situacao = "";
    }
  }
);
</script>

<template>
  <FormSection legend="Campo exclusivo e obrigatório da Assistência Social">
    <div class="flex flex-col gap-4">
      <!-- Situação de acompanhamento -->
      <div class="rounded-xl border border-surface-200 bg-surface-50 p-4">
        <div class="mb-4">
          <h4 class="text-sm font-semibold text-surface-800">
            Situação de acompanhamento
          </h4>
          <p class="mt-1 text-sm text-surface-600">
            Informe o status do acompanhamento do caso, o local e o serviço de referência.
            A data de encerramento só deve ser preenchida quando o caso estiver concluído.
          </p>
        </div>

        <FormGrid>
          <div class="col-span-12 md:col-span-4">
            <Select
              v-model="modelValue.status_acompanhamento"
              :options="STATUS_ACOMPANHAMENTO_OPTIONS"
              optionLabel="label"
              optionValue="value"
              placeholder="Acompanhamento do caso"
              showClear
              fluid
            />
          </div>

          <div class="col-span-12 md:col-span-4">
            <Select
              v-model="modelValue.local_acompanhamento"
              :options="LOCAIS_ACOMPANHAMENTO_OPTIONS"
              optionLabel="label"
              optionValue="value"
              placeholder="Local de acompanhamento do caso"
              showClear
              fluid
              :disabled="!acompanhamentoHabilitado"
              :class="{ 'opacity-50': !acompanhamentoHabilitado }"
            />
          </div>

          <div class="col-span-12 md:col-span-4">
            <FloatLabel variant="on">
              <DatePicker
                id="data_encerramento"
                v-model="modelValue.data_encerramento"
                dateFormat="dd/mm/yy"
                showIcon
                showButtonBar
                fluid
                :disabled="!dataEncerramentoHabilitada"
                :class="{ 'opacity-50': !dataEncerramentoHabilitada }"
              />
              <label for="data_encerramento">Data de encerramento</label>
            </FloatLabel>
          </div>

          <div class="col-span-12">
            <Select
              v-model="modelValue.servico_inserido"
              :options="SERVICOS"
              filter
              showClear
              fluid
              class="w-full min-h-[42px]"
              :disabled="!acompanhamentoHabilitado"
              :class="{ 'opacity-50': !acompanhamentoHabilitado }"
            >
              <template #value="slotProps">
                <div class="truncate w-full text-left">
                  <span v-if="slotProps.value">
                    {{ slotProps.value }}
                  </span>
                  <span v-else class="text-gray-400">
                    Caso o usuário esteja em acompanhamento, indique o serviço
                  </span>
                </div>
              </template>

              <template #option="slotProps">
                <div class="whitespace-normal leading-tight py-1">
                  {{ slotProps.option }}
                </div>
              </template>
            </Select>
          </div>
        </FormGrid>
      </div>

      <!-- Situação de ruptura de vínculos / pessoa em situação de rua -->
      <div
        class="rounded-xl border border-surface-200 bg-surface-50 p-4"
        :class="{ 'opacity-60': !situacaoRupturaPsrHabilitada }"
      >
        <div class="mb-4">
          <h4 class="text-sm font-semibold text-surface-800">
            Situação de ruptura de vínculos / pessoa em situação de rua
          </h4>
          <p class="mt-1 text-sm text-surface-600">
            Preencha este bloco somente em casos de
            <strong>ruptura de vínculos</strong> e
            <strong>pessoa em situação de rua</strong>,
            quando a notificação estiver marcada como
            <strong>caso em acompanhamento</strong> ou
            <strong>caso concluído</strong>.
          </p>
        </div>

        <FormGrid>
          <div class="col-span-12 md:col-span-6">
            <Select
              v-model="modelValue.situacao_ruptura_psr"
              :options="SITUACAO_RUPTURA_PSR_OPTIONS"
              optionLabel="label"
              optionValue="value"
              placeholder="Situação do caso"
              showClear
              fluid
              :disabled="!situacaoRupturaPsrHabilitada"
              :class="{ 'opacity-50': !situacaoRupturaPsrHabilitada }"
            />
          </div>

          <div class="col-span-12 md:col-span-6">
            <InputText
              v-model="modelValue.outra_situacao"
              placeholder="Especificar a situação"
              :disabled="
                !situacaoRupturaPsrHabilitada ||
                modelValue.situacao_ruptura_psr !== 'OUTRO'
              "
              :class="{
                'opacity-50':
                  !situacaoRupturaPsrHabilitada ||
                  modelValue.situacao_ruptura_psr !== 'OUTRO'
              }"
              fluid
            />
          </div>
        </FormGrid>
      </div>
    </div>
  </FormSection>
</template>