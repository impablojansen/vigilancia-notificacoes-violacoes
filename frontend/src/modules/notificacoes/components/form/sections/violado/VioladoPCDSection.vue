<script setup lang="ts">
import { computed, watch } from "vue";
import FormSection from "@/shared/components/form/FormSection.vue";
import FormGrid from "@/shared/components/form/FormGrid.vue";
import {
  STATUS_CONDICAO_OPTIONS,
  GRUPO_CONDICAO_OPTIONS,
  SUBTIPOS_POR_GRUPO,
} from "@/modules/notificacoes/constants/condicoes";

type StatusCondicao = "SIM" | "NAO" | "SEM_INFORMACAO" | null;

interface CondicaoItem {
  grupo: string | null;
  subtipo: string | null;
}

interface VioladoCondicoesModel {
  possui_condicao_deficiencia_transtorno: StatusCondicao;
  condicoes: CondicaoItem[];
}

const modelValue = defineModel<VioladoCondicoesModel>({
  required: true,
});

const statusCondicaoOptions = STATUS_CONDICAO_OPTIONS.map((item) => ({
  ...item,
}));

const condicoes = computed(() => modelValue.value.condicoes ?? []);

watch(
  () => modelValue.value.possui_condicao_deficiencia_transtorno,
  (val) => {
    if (val !== "SIM") {
      modelValue.value.condicoes = [];
    } else if (!Array.isArray(modelValue.value.condicoes)) {
      modelValue.value.condicoes = [];
    }
  },
  { immediate: true }
);

function getSubtiposPorGrupo(grupo: string | null) {
  if (!grupo) return [];
  return SUBTIPOS_POR_GRUPO[grupo] ?? [];
}

function combinacoesSelecionadas(excetoIndex: number) {
  return condicoes.value
    .map((item, index) =>
      index !== excetoIndex && item.grupo && item.subtipo
        ? `${item.grupo}::${item.subtipo}`
        : null
    )
    .filter((valor): valor is string => Boolean(valor));
}

function opcoesSubtipoDisponiveis(indexAtual: number, grupo: string | null) {
  const opcoes = getSubtiposPorGrupo(grupo);
  const selecionadas = combinacoesSelecionadas(indexAtual);

  return opcoes.filter((option) => {
    const chave = `${grupo}::${option.value}`;
    return !selecionadas.includes(chave);
  });
}

function opcoesGrupoDisponiveis(indexAtual: number) {
  return GRUPO_CONDICAO_OPTIONS.filter((grupoOption) => {
    const grupoAtualDaLinha = condicoes.value[indexAtual]?.grupo;

    if (grupoAtualDaLinha === grupoOption.value) {
      return true;
    }

    const subtiposDisponiveis = opcoesSubtipoDisponiveis(
      indexAtual,
      grupoOption.value
    );

    return subtiposDisponiveis.length > 0;
  });
}

function existeAlgumaCondicaoDisponivel() {
  return GRUPO_CONDICAO_OPTIONS.some((grupoOption) => {
    const subtiposDoGrupo = getSubtiposPorGrupo(grupoOption.value);
    const combinacoesUsadas = condicoes.value
      .filter((item) => item.grupo === grupoOption.value && item.subtipo)
      .map((item) => `${item.grupo}::${item.subtipo}`);

    return subtiposDoGrupo.some((subtipo) => {
      const chave = `${grupoOption.value}::${subtipo.value}`;
      return !combinacoesUsadas.includes(chave);
    });
  });
}

const podeAdicionarCondicao = computed(() => {
  if (modelValue.value.possui_condicao_deficiencia_transtorno !== "SIM") {
    return false;
  }

  return existeAlgumaCondicaoDisponivel();
});

function adicionarCondicao() {
  if (!Array.isArray(modelValue.value.condicoes)) {
    modelValue.value.condicoes = [];
  }

  if (!existeAlgumaCondicaoDisponivel()) {
    return;
  }

  modelValue.value.condicoes.push({
    grupo: null,
    subtipo: null,
  });
}

function removerCondicao(index: number) {
  modelValue.value.condicoes.splice(index, 1);
}

function onGrupoChange(index: number) {
  const item = modelValue.value.condicoes[index];

  if (!item) {
    return;
  }

  const grupo = item.grupo ?? null;
  const opcoesDisponiveis = opcoesSubtipoDisponiveis(index, grupo);
  const primeiraOpcao = opcoesDisponiveis[0];

  if (opcoesDisponiveis.length === 1 && primeiraOpcao) {
    item.subtipo = primeiraOpcao.value;
    return;
  }

  if (opcoesDisponiveis.length === 0) {
    item.subtipo = null;
    item.grupo = null;
    return;
  }

  item.subtipo = null;
}

function labelGrupo(grupo: string | null) {
  if (!grupo) return "";
  return (
    GRUPO_CONDICAO_OPTIONS.find((item) => item.value === grupo)?.label ?? grupo
  );
}

function labelSubtipo(grupo: string | null, subtipo: string | null) {
  if (!grupo || !subtipo) return "";
  return (
    SUBTIPOS_POR_GRUPO[grupo]?.find((item) => item.value === subtipo)?.label ??
    subtipo
  );
}
</script>

<template>
  <FormSection legend="Deficiência / Transtorno">
    <FormGrid>
      <div class="col-span-12 md:col-span-6">
        <label class="block mb-2">
          Possui deficiência, transtorno ou outra condição relevante?
        </label>
        <Select v-model="modelValue.possui_condicao_deficiencia_transtorno" :options="statusCondicaoOptions"
          optionLabel="label" optionValue="value" placeholder="Selecione" showClear fluid />
      </div>

      <div v-if="modelValue.possui_condicao_deficiencia_transtorno === 'SIM'" class="col-span-12">
        <div class="flex items-center justify-between mb-3">
          <div class="font-medium">Condições informadas</div>
          <Button label="Adicionar condição" icon="pi pi-plus" size="small" outlined :disabled="!podeAdicionarCondicao"
            @click="adicionarCondicao" />
        </div>

        <div v-if="!condicoes.length" class="border rounded-lg p-4 text-sm text-surface-600">
          Nenhuma condição adicionada até o momento.
        </div>

        <div v-for="(condicao, index) in condicoes" :key="index" class="border rounded-lg p-4 mb-4">
          <div class="flex items-center justify-between mb-3">
            <div class="text-sm text-surface-600">
              <span v-if="condicao.grupo && condicao.subtipo">
                {{ labelGrupo(condicao.grupo) }} —
                {{ labelSubtipo(condicao.grupo, condicao.subtipo) }}
              </span>
              <span v-else>
                Condição {{ index + 1 }}
              </span>
            </div>

            <Button icon="pi pi-trash" severity="danger" text rounded aria-label="Remover condição"
              @click="removerCondicao(index)" />
          </div>

          <FormGrid>
            <div class="col-span-12 md:col-span-5">
              <label class="block mb-2">Grupo</label>
              <Select v-model="condicao.grupo" :options="opcoesGrupoDisponiveis(index)" optionLabel="label"
                optionValue="value" placeholder="Selecione o grupo" fluid @change="onGrupoChange(index)" />
            </div>

            <div class="col-span-12 md:col-span-7">
              <label class="block mb-2">Condição</label>
              <Select v-model="condicao.subtipo" :options="opcoesSubtipoDisponiveis(index, condicao.grupo)"
                optionLabel="label" optionValue="value" placeholder="Selecione a condição" :disabled="!condicao.grupo"
                :class="{ 'opacity-50': !condicao.grupo }" filter fluid />
            </div>
          </FormGrid>
        </div>
      </div>
    </FormGrid>
  </FormSection>
</template>