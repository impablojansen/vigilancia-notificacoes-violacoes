<script setup lang="ts">
import { ref, computed } from "vue";
import FormSection from "@/shared/components/form/FormSection.vue";
import FormGrid from "@/shared/components/form/FormGrid.vue";
import { VIOLACOES } from "@/modules/notificacoes/constants/violacoes";

type ViolacaoRegistro = {
  tipo: string;
};

const modelValue = defineModel<{
  violacoes: ViolacaoRegistro[];
}>({ required: true });

const novaViolacao = ref<string | null>(null);

const mapaViolacoes = computed(() => {
  const map = new Map<string, string>();

  VIOLACOES.forEach((grupo) => {
    grupo.items.forEach((item) => {
      if ("simple" in grupo && grupo.simple) {
        map.set(item.value, item.label);
      } else {
        map.set(item.value, `${grupo.label} - ${item.label}`);
      }
    });
  });

  return map;
});

const opcoesDisponiveis = computed(() => {
  const usadas = modelValue.value.violacoes.map((v) => v.tipo);

  return VIOLACOES.map((grupo) => ({
    label: grupo.label,
    items: grupo.items.filter((item) => !usadas.includes(item.value)),
  })).filter((grupo) => grupo.items.length > 0);
});

const semOpcoes = computed(() => opcoesDisponiveis.value.length === 0);

function adicionarViolacao() {
  if (!novaViolacao.value) return;

  modelValue.value.violacoes.push({
    tipo: novaViolacao.value,
  });

  novaViolacao.value = null;
}

function removerViolacao(index: number) {
  modelValue.value.violacoes.splice(index, 1);
}
</script>

<template>
  <FormSection :legend="`Violência ou Violação (${modelValue.violacoes.length})`">
    <div class="flex flex-col gap-4">
      <FormGrid>
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
      </FormGrid>

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
  </FormSection>
</template>
