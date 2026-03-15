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
  sexo: null,
  raca_etnia: null,
  parentesco: null,
  ciclo_vida: null,
  suspeita_uso_alcool: null,
});

function adicionarViolador() {
  modelValue.value.violadores.push({ ...novoViolador.value });

  novoViolador.value = {
    sexo: null,
    raca_etnia: null,
    parentesco: null,
    ciclo_vida: null,
    suspeita_uso_alcool: null,
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
          <Select
            v-model="novoViolador.sexo"
            :options="SEXO_OPTIONS"
            optionLabel="label"
            optionValue="value"
            placeholder="Sexo do violador"
            showClear
            fluid
          />
        </div>

        <div class="col-span-12 md:col-span-4">
          <Select
            v-model="novoViolador.raca_etnia"
            :options="RACA_COR_ETNIA_OPTIONS"
            optionLabel="label"
            optionValue="value"
            placeholder="Raça/Etnia do violador"
            showClear
            fluid
          />
        </div>

        <div class="col-span-12 md:col-span-4">
          <Select
            v-model="novoViolador.parentesco"
            :options="PARENTESCO_VIOLADOR_OPTIONS"
            optionLabel="label"
            optionValue="value"
            placeholder="Parentesco do violador"
            filter
            showClear
            fluid
          />
        </div>

        <div class="col-span-12 md:col-span-6">
          <Select
            v-model="novoViolador.ciclo_vida"
            :options="CICLO_VIDA_COM_SEM_INFO_OPTIONS"
            optionLabel="label"
            optionValue="value"
            placeholder="Faixa etária do violador"
            showClear
            fluid
          />
        </div>

        <div class="col-span-12 md:col-span-6">
          <Select
            v-model="novoViolador.suspeita_uso_alcool"
            :options="SIM_NAO_SEM_INFO_OPTIONS"
            optionLabel="label"
            optionValue="value"
            placeholder="Suspeita de uso de álcool"
            showClear
            fluid
          />
        </div>
      </FormGrid>

      <div class="flex justify-end">
        <Button
          label="Adicionar violador"
          icon="pi pi-plus"
          @click="adicionarViolador"
        />
      </div>

      <DataTable
        v-if="modelValue.violadores.length"
        :value="modelValue.violadores"
        size="small"
      >
        <Column field="sexo" header="Sexo">
          <template #body="slotProps">
            {{ mapaSexo.get(slotProps.data.sexo) }}
          </template>
        </Column>

        <Column field="parentesco" header="Parentesco">
          <template #body="slotProps">
            {{ mapaParentesco.get(slotProps.data.parentesco) }}
          </template>
        </Column>

        <Column field="ciclo_vida" header="Faixa Etária">
          <template #body="slotProps">
            {{ mapaCicloVida.get(slotProps.data.ciclo_vida) }}
          </template>
        </Column>

        <Column header="Ações" style="width: 100px">
          <template #body="slotProps">
            <Button
              icon="pi pi-trash"
              severity="danger"
              text
              @click="removerViolador(slotProps.index)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </FormSection>
</template>
