<script setup lang="ts">
import { ref, computed } from "vue";
import { VIOLACOES } from "@/constants/violacoes";

type ViolacaoRegistro = {
  tipo: string;
};

type ViolacaoItem = {
  label: string;
  value: string;
};

type ViolacaoGrupo = {
  label: string;
  simple?: boolean;
  items: ViolacaoItem[];
};

const modelValue = defineModel<{
  violacoes: ViolacaoRegistro[],
  motivo_violencia?: string,
  lesao_autoprovocada?: string,
  meio_agressao?: string,
  multipla_ocorrencia?: string
}>({ required: true });

const novaViolacao = ref<string | null>(null);

/* MAPA PARA RESOLVER LABELS */
const mapaViolacoes = computed(() => {
  const map = new Map<string, string>();

  (VIOLACOES as ViolacaoGrupo[]).forEach((grupo) => {
    grupo.items.forEach((item) => {
      if (grupo.simple) {
        map.set(item.value, item.label);
      } else {
        map.set(item.value, `${grupo.label} - ${item.label}`);
      }
    });
  });

  return map;
});

/* REMOVE OPÇÕES JÁ UTILIZADAS */
const opcoesDisponiveis = computed(() => {
  const usadas = modelValue.value.violacoes.map((v) => v.tipo);

  return (VIOLACOES as ViolacaoGrupo[])
    .map((grupo) => ({
      label: grupo.label,
      items: grupo.items.filter((item) => !usadas.includes(item.value)),
    }))
    .filter((grupo) => grupo.items.length > 0);
});

/* ADICIONAR */
function adicionarViolacao() {
  if (!novaViolacao.value) return;

  modelValue.value.violacoes.push({
    tipo: novaViolacao.value,
  });

  novaViolacao.value = null;
}

/* REMOVER */
function removerViolacao(index: number) {
  modelValue.value.violacoes.splice(index, 1);
}

const semOpcoes = computed(() => opcoesDisponiveis.value.length === 0);

const emit = defineEmits(["next", "back"]);
</script>

<template>
  <div class="flex flex-col gap-6">
    <h3 class="text-lg font-semibold text-surface-700">
      Dados da Violência ou Violação de Direitos
    </h3>
  <Fieldset :legend="`Violência ou Violação (${modelValue.violacoes.length})`">
    <div class="flex flex-col gap-4">

      <div class="grid grid-cols-12 gap-4">

        <div class="col-span-12 md:col-span-8">
          <Select
            v-model="novaViolacao"
            :options="opcoesDisponiveis"
            optionGroupLabel="label"
            optionGroupChildren="items"
            optionLabel="label"
            optionValue="value"
            placeholder="Selecione a violação"
            :disabled="semOpcoes"
            filter
            fluid
          />
        </div>

        <div class="col-span-12 md:col-span-4">
          <Button
            label="Adicionar"
            icon="pi pi-plus"
            class="w-full"
            @click="adicionarViolacao"
          />
        </div>

      </div>

      <DataTable
        v-if="modelValue.violacoes.length"
        :value="modelValue.violacoes"
        size="small"
      >

        <Column field="tipo" header="Violação">
          <template #body="slotProps">
            {{ mapaViolacoes.get(slotProps.data.tipo) }}
          </template>
        </Column>

        <Column header="Ações" style="width: 100px">
          <template #body="slotProps">
            <Button
              icon="pi pi-trash"
              severity="danger"
              text
              @click="removerViolacao(slotProps.index)"
            />
          </template>
        </Column>

      </DataTable>

    </div>
  </Fieldset>

  <Fieldset legend="Tipificação da Violência/Violação">
        <div class="grid grid-cols-12 gap-4">
          <!-- motivo da violencia -->
          <div class="col-span-12 md:col-span-7">
            <Select
              v-model="modelValue.motivo_violencia"
              :options="[
                'Conflito intergeracional',
                'Deficiência',
                'Homofobia/Lesbofobia/Bifobia/Transfobia',
                'Intolerância Religiosa',
                'Racismo',
                'Sexismo',
                'Situação de rua',
                'Xenofobia',
                'Outros',
                'Ignorado',
              ]"
              placeholder="Qual foi a motivação da violência?"
              showClear
              fluid
            />
          </div>

          <!-- lesão autoprovocada -->
          <div class="col-span-12 md:col-span-5">
            <Select
              v-model="modelValue.lesao_autoprovocada"
              :options="['Sim', 'Não', 'Sem informação']"
              placeholder="A lesão foi autoprovocada?"
              showClear
              fluid
            />
          </div>

          <!-- meio da agressão -->
          <div class="col-span-12 md:col-span-7">
            <Select
              v-model="modelValue.meio_agressao"
              :options="[
                'Ameaça',
                'Arma de fogo',
                'Enforcamento',
                'Envenenamento, intoxicação',
                'Espancamento / Força corporal',
                'Obj. contundente',
                'Obj. perfurocortante',
                'Substância / Obj. quente'
              ]"
              placeholder="Qual foi o meio de agressão?"
              showClear
              fluid
            />
          </div>

          <!-- multiplas ocorrências -->
          <div class="col-span-12 md:col-span-5">
            <Select
              v-model="modelValue.multipla_ocorrencia"
              :options="['Sim', 'Não', 'Sem informação']"
              placeholder="Ocorreu outras vezes?"
              showClear
              fluid
            />
          </div>

        </div>
  </Fieldset>
</div>
  <div class="flex pt-6 justify-between">
    <Button label="Voltar" severity="secondary" @click="$emit('back')" />
    <Button label="Próximo" @click="$emit('next')" />
  </div>
</template>
