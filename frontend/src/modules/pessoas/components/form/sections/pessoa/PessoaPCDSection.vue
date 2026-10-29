
<script setup lang="ts">
import { computed, ref, watch } from "vue";

import FormSection from "@/shared/components/form/FormSection.vue";
import FormGrid from "@/shared/components/form/FormGrid.vue";

import {
  STATUS_CONDICAO_OPTIONS,
  GRUPO_CONDICAO_OPTIONS,
  SUBTIPOS_POR_GRUPO,
} from "@/modules/pessoas/constants/DeficienciaTranstorno";

import type {
  PessoaCondicoesFormModel,
} from "@/modules/pessoas/types/pessoa.types";

const modelValue = defineModel<PessoaCondicoesFormModel>({
  required: true,
});

const novoGrupo = ref<number | null>(null);
const novoSubtipo = ref<number | null>(null);

// Retorna os subtipos que ainda podem ser selecionados.
function listarSubtiposDisponiveis(grupo: number) {
  const opcoes = SUBTIPOS_POR_GRUPO[grupo] ?? [];

  const utilizados = modelValue.value.condicoes
    .filter(
      (item) =>
        item.grupo === grupo && item.subtipo !== null
    )
    .map((item) => item.subtipo as number);

  // Quando o subtipo é desconhecido, não permitimos
  // adicionar outros subtipos ao mesmo grupo.
  if (utilizados.includes(0)) {
    return [];
  }

  return opcoes.filter((opcao) => {
    if (utilizados.includes(opcao.value)) {
      return false;
    }

    // "Sem informação" não pode coexistir com
    // subtipos conhecidos do mesmo grupo.
    if (opcao.value === 0 && utilizados.length > 0) {
      return false;
    }

    return true;
  });
}

const gruposDisponiveis = computed(() =>
  GRUPO_CONDICAO_OPTIONS.filter(
    (grupo) => listarSubtiposDisponiveis(grupo.value).length > 0
  )
);

const subtiposDisponiveis = computed(() => {
  if (novoGrupo.value === null) {
    return [];
  }

  return listarSubtiposDisponiveis(novoGrupo.value);
});

const podeAdicionar = computed(() => {
  const grupo = novoGrupo.value;
  const subtipo = novoSubtipo.value;

  if (grupo === null || subtipo === null) {
    return false;
  }

  return listarSubtiposDisponiveis(grupo).some(
    (opcao) => opcao.value === subtipo
  );
});

// Ao trocar o grupo, reinicia o subtipo.
// Se houver somente uma opção, seleciona-a.
watch(novoGrupo, (grupo) => {
  novoSubtipo.value = null;

  if (grupo === null) {
    return;
  }

  const opcoes = listarSubtiposDisponiveis(grupo);

  if (opcoes.length === 1) {
    novoSubtipo.value = opcoes[0]!.value;
  }
});

// As condições deixam de ser aplicáveis quando
// a resposta principal não é SIM.
watch(
  () => modelValue.value.possui_condicao_deficiencia_transtorno,
  (status) => {
    if (status !== "SIM") {
      modelValue.value.condicoes = [];
      novoGrupo.value = null;
      novoSubtipo.value = null;
    }
  },
  { immediate: true }
);

function adicionarCondicao() {
  if (
    !podeAdicionar.value ||
    novoGrupo.value === null ||
    novoSubtipo.value === null
  ) {
    return;
  }

  modelValue.value.condicoes.push({
    grupo: novoGrupo.value,
    subtipo: novoSubtipo.value,
  });

  novoGrupo.value = null;
  novoSubtipo.value = null;
}

function removerCondicao(index: number) {
  modelValue.value.condicoes.splice(index, 1);
}

function nomeGrupo(grupo: number | null): string {
  return (
    GRUPO_CONDICAO_OPTIONS.find(
      (opcao) => opcao.value === grupo
    )?.label ?? "GRUPO NÃO IDENTIFICADO"
  );
}

function nomeSubtipo(
  grupo: number | null,
  subtipo: number | null
): string {
  if (grupo === null || subtipo === null) {
    return "CONDIÇÃO NÃO INFORMADA";
  }

  return (
    SUBTIPOS_POR_GRUPO[grupo]?.find(
      (opcao) => opcao.value === subtipo
    )?.label ?? "CONDIÇÃO NÃO IDENTIFICADA"
  );
}
</script>

<template>
  <FormSection legend="Deficiência / Transtorno">
    <div class="flex flex-col gap-5">
      <div class="flex flex-col gap-2">
        <label
          for="possui_condicao"
          class="text-sm font-medium text-surface-700"
        >
          A pessoa possui deficiência, transtorno
          ou outra condição relevante?
        </label>

        <Select
          id="possui_condicao"
          v-model="modelValue.possui_condicao_deficiencia_transtorno"
          :options="STATUS_CONDICAO_OPTIONS"
          optionLabel="label"
          optionValue="value"
          placeholder="Selecione uma resposta"
          class="w-full md:max-w-md"
        />
      </div>

      <div
        v-if="
          modelValue.possui_condicao_deficiencia_transtorno
          === 'SIM'
        "
        class="flex flex-col gap-4"
      >
        <div class="rounded-xl border border-surface-200 p-4">
          <div class="mb-4">
            <h4 class="text-sm font-semibold text-surface-800">
              Adicionar condição
            </h4>

            <p class="mt-1 text-sm text-surface-500">
              Selecione o grupo e a condição correspondente.
              É possível registrar mais de uma condição.
            </p>
          </div>

          <FormGrid>
            <div class="col-span-12 md:col-span-5">
              <label
                for="grupo_condicao"
                class="mb-2 block text-sm font-medium"
              >
                Grupo
              </label>

              <Select
                id="grupo_condicao"
                v-model="novoGrupo"
                :options="gruposDisponiveis"
                optionLabel="label"
                optionValue="value"
                placeholder="Selecione o grupo"
                filter
                fluid
              />
            </div>

            <div class="col-span-12 md:col-span-7">
              <label
                for="subtipo_condicao"
                class="mb-2 block text-sm font-medium"
              >
                Condição
              </label>

              <Select
                id="subtipo_condicao"
                v-model="novoSubtipo"
                :options="subtiposDisponiveis"
                optionLabel="label"
                optionValue="value"
                placeholder="Selecione a condição"
                :disabled="novoGrupo === null"
                filter
                fluid
              />
            </div>
          </FormGrid>

          <div class="mt-4 flex justify-end">
            <Button
              type="button"
              label="Adicionar condição"
              icon="pi pi-plus"
              :disabled="!podeAdicionar"
              @click="adicionarCondicao"
            />
          </div>
        </div>

        <div class="flex flex-col gap-3">
          <h4 class="text-sm font-semibold text-surface-800">
            Condições registradas
            ({{ modelValue.condicoes.length }})
          </h4>

          <div
            v-if="modelValue.condicoes.length === 0"
            class="rounded-lg border border-surface-200
                   p-4 text-sm text-surface-500"
          >
            Nenhuma condição adicionada.
          </div>

          <div
            v-for="(condicao, index) in modelValue.condicoes"
            :key="`${condicao.grupo}-${condicao.subtipo}`"
            class="flex flex-col gap-3 rounded-lg border
                   border-surface-200 p-4
                   sm:flex-row sm:items-center
                   sm:justify-between"
          >
            <div class="min-w-0">
              <div class="text-xs text-surface-500">
                {{ nomeGrupo(condicao.grupo) }}
              </div>

              <div class="mt-1 text-sm font-medium">
                {{
                  nomeSubtipo(
                    condicao.grupo,
                    condicao.subtipo
                  )
                }}
              </div>
            </div>

            <Button
              type="button"
              icon="pi pi-trash"
              label="Remover"
              severity="danger"
              text
              size="small"
              @click="removerCondicao(index)"
            />
          </div>
        </div>
      </div>
    </div>
  </FormSection>
</template>
