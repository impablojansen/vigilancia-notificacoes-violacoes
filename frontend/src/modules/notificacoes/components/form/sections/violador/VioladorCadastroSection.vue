<script setup lang="ts">
import { ref, computed } from "vue";
import FormSection from "@/shared/components/form/FormSection.vue";
import FormGrid from "@/shared/components/form/FormGrid.vue";

import { SEXO_OPTIONS } from "@/modules/notificacoes/constants/sexo";
import { RACA_COR_ETNIA_OPTIONS } from "@/modules/notificacoes/constants/racaCorEtnia";
import { CICLO_VIDA_COM_SEM_INFO_OPTIONS } from "@/modules/notificacoes/constants/cicloVida";
import { PARENTESCO_VIOLADOR_OPTIONS } from "@/modules/notificacoes/constants/parentescoViolador";
import { SIM_NAO_SEM_INFO_OPTIONS } from "@/modules/notificacoes/constants/respostasPadrao";

const modelValue = defineModel<{ violadores: any[] }>({ required: true });

const novoViolador = ref({
  sexo_violador: null,
  raca_cor_etnia_violador: null,
  parentesco_violador: null,
  ciclo_vida_violador: null,
  suspeita_uso_alcool_violador: null,
});

const podeAdicionarViolador = computed(() => {
  return Boolean(
    novoViolador.value.sexo_violador &&
    novoViolador.value.raca_cor_etnia_violador &&
    novoViolador.value.parentesco_violador &&
    novoViolador.value.ciclo_vida_violador &&
    novoViolador.value.suspeita_uso_alcool_violador
  );
});

function adicionarViolador() {
  if (!podeAdicionarViolador.value) {
    return;
  }

  modelValue.value.violadores.push({ ...novoViolador.value });

  novoViolador.value = {
    sexo_violador: null,
    raca_cor_etnia_violador: null,
    parentesco_violador: null,
    ciclo_vida_violador: null,
    suspeita_uso_alcool_violador: null,
  };
}

function removerViolador(index: number) {
  modelValue.value.violadores.splice(index, 1);
}

function criarMapa<T extends { label: string; value: string }>(options: readonly T[]) {
  return new Map(options.map((item) => [item.value, item.label]));
}

const mapaSexo = computed(() => criarMapa(SEXO_OPTIONS));
const mapaParentesco = computed(() => criarMapa(PARENTESCO_VIOLADOR_OPTIONS));
const mapaCicloVida = computed(() => criarMapa(CICLO_VIDA_COM_SEM_INFO_OPTIONS));
</script>

<template>
  <FormSection legend="Cadastro de Violadores">
    <div class="flex flex-col gap-4">
      <FormGrid>
        <div class="col-span-12 md:col-span-4">
          <FloatLabel variant="on">
            <Select id="sexo_violador" v-model="novoViolador.sexo_violador" :options="SEXO_OPTIONS" optionLabel="label"
              optionValue="value" fluid />
            <label for="sexo_violador">Sexo do Violador</label>
          </FloatLabel>
        </div>

        <div class="col-span-12 md:col-span-4">
          <FloatLabel variant="on">
            <Select id="raca_cor_etnia_violador" v-model="novoViolador.raca_cor_etnia_violador"
              :options="RACA_COR_ETNIA_OPTIONS" optionLabel="label" optionValue="value" fluid />
            <label for="raca_cor_etnia_violador">Raça/Cor/Etnia do Violador</label>
          </FloatLabel>
        </div>

        <div class="col-span-12 md:col-span-4">
          <FloatLabel variant="on">
            <Select id="parentesco_violador" v-model="novoViolador.parentesco_violador"
              :options="PARENTESCO_VIOLADOR_OPTIONS" optionLabel="label" optionValue="value" filter fluid />
            <label for="parentesco_violador">Parentesco do Violador</label>
          </FloatLabel>
        </div>

        <div class="col-span-12 md:col-span-6">
          <FloatLabel variant="on">
            <Select id="ciclo_vida_violador" v-model="novoViolador.ciclo_vida_violador"
              :options="CICLO_VIDA_COM_SEM_INFO_OPTIONS" optionLabel="label" optionValue="value" placeholder="" fluid />
            <label for="ciclo_vida_violador">Ciclo de Vida do Violador</label>
          </FloatLabel>

        </div>

        <div class="col-span-12 md:col-span-6">
          <FloatLabel variant="on">
            <Select id="suspeita_uso_alcool_violador" v-model="novoViolador.suspeita_uso_alcool_violador"
              :options="SIM_NAO_SEM_INFO_OPTIONS" optionLabel="label" optionValue="value" fluid />
            <label for="suspeita_uso_alcool_violador">Violador sob Suspeita de uso de Álcool?</label>
          </FloatLabel>
        </div>
      </FormGrid>

      <div class="flex justify-end">
        <Button label="Adicionar violador" icon="pi pi-plus" :disabled="!podeAdicionarViolador"
          @click="adicionarViolador" />
      </div>

      <DataTable v-if="modelValue.violadores.length" :value="modelValue.violadores" size="small">
        <Column field="sexo" header="Sexo">
          <template #body="slotProps">
            {{ mapaSexo.get(slotProps.data.sexo_violador) }}
          </template>
        </Column>

        <Column field="parentesco" header="Parentesco">
          <template #body="slotProps">
            {{ mapaParentesco.get(slotProps.data.parentesco_violador) }}
          </template>
        </Column>

        <Column field="ciclo_vida" header="Faixa Etária">
          <template #body="slotProps">
            {{ mapaCicloVida.get(slotProps.data.ciclo_vida_violador) }}
          </template>
        </Column>

        <Column header="Ações" style="width: 100px">
          <template #body="slotProps">
            <Button icon="pi pi-trash" severity="danger" text @click="removerViolador(slotProps.index)" />
          </template>
        </Column>
      </DataTable>
    </div>
  </FormSection>
</template>