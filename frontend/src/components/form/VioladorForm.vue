<script setup lang="ts">
import { ref } from "vue";

const modelValue = defineModel<{ violadores: any[] }>({ required: true });

const novoViolador = ref({
  sexo: null,
  raca_etnia: null,
  parentesco: null,
  ciclo_vida: null,
  susp_alcool_drogas: null
});

function adicionarViolador() {
  modelValue.value.violadores.push({ ...novoViolador.value });

  novoViolador.value = {
    sexo: null,
    raca_etnia: null,
    parentesco: null,
    ciclo_vida: null,
    susp_alcool_drogas: null
  };
}

function removerViolador(index: number) {
  modelValue.value.violadores.splice(index, 1);
}

const emit = defineEmits(["next", "back"]);
</script>

<template>
<div class="flex flex-col gap-6">

  <h3 class="text-lg font-semibold text-surface-700">
    Dados do Violador
  </h3>

  <Fieldset legend="Identificação do Violador">

    <!-- FORMULÁRIO -->
    <div class="grid grid-cols-12 gap-4">

      <div class="col-span-12 md:col-span-4">
        <Select
          v-model="novoViolador.sexo"
          :options="['Masculino','Feminino','Sem Informação']"
          placeholder="Sexo do violador"
          showClear
          fluid
        />
      </div>

      <div class="col-span-12 md:col-span-4">
        <Select
          v-model="novoViolador.raca_etnia"
          :options="[
            'Branco',
            'Negro',
            'Pardo',
            'Indígena',
            'Amarelo',
            'Sem Informação'
          ]"
          placeholder="Raça/Etnia do violador"
          showClear
          fluid
        />
      </div>

      <div class="col-span-12 md:col-span-4">
        <Select
          v-model="novoViolador.parentesco"
          :options="[
            'O próprio sujeito',
            'Pai / Mãe',
            'Filho (a)',
            'Irmã(o)',
            'Avô / Avó',
            'Neto (a) ou Bisneto (a)',
            'Tio (a)',
            'Cônjuge / Companheiro',
            'Ex-cônjuge / Companheiro',
            'Namorado (a)',
            'Ex-Namorado (a)',
            'Padrasto / Madrasta',
            'Enteado (a)',
            'Cuidador',
            'Sem parentesco',
            'Estado - Órgão Público',
            'Outro',
            'Sem informação'
          ]"
          placeholder="Parentesco do violador"
          filter
          showClear
          fluid
        />
      </div>

      <div class="col-span-12 md:col-span-6">
        <Select
          v-model="novoViolador.ciclo_vida"
          :options="[
            '00 a 06 anos',
            '06 a 12 anos',
            '12 a 17 anos',
            '18 a 29 anos',
            '30 a 59 anos',
            '60 anos ou mais',
            'Sem informação'
          ]"
          placeholder="Faixa etária do violador"
          showClear
          fluid
        />
      </div>

      <div class="col-span-12 md:col-span-6">
        <Select
          v-model="novoViolador.susp_alcool_drogas"
          :options="['Sim','Não','Sem Informação']"
          placeholder="Suspeita de álcool e drogas"
          showClear
          fluid
        />
      </div>

    </div>

    <!-- BOTÃO -->
    <div class="flex justify-end mt-4">
      <Button
        label="Adicionar violador"
        icon="pi pi-plus"
        @click="adicionarViolador"
      />
    </div>

  </Fieldset>

  <!-- TABELA -->
  <DataTable
    v-if="modelValue.violadores.length"
    :value="modelValue.violadores"
    size="small"
  >

    <Column field="sexo" header="Sexo"/>
    <Column field="parentesco" header="Parentesco"/>
    <Column field="ciclo_vida" header="Faixa Etária"/>

    <Column header="Ações" style="width:100px">
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
  <div class="flex pt-6 justify-between">
    <Button label="Voltar" severity="secondary" @click="$emit('back')" />
    <Button label="Próximo" @click="$emit('next')" />
  </div>
</template>
