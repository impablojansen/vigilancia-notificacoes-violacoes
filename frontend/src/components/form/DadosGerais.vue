<script setup lang="ts">
import { ref } from "vue";

const modelValue = defineModel({ type: Object, required: true });

const unidades = ref([
  "CAPS",
  "Conselho Tutelar",
  "CRAS",
  "CREAS",
  "Delegacia",
  "Delegacia da Mulher",
  "Poder Judiciário",
]);

defineEmits(["next"]);
</script>

<template>
  <div class="flex flex-col gap-6">
    <h3 class="text-lg font-semibold text-surface-700">
      Dados Gerais da Notificação
    </h3>

    <!-- SEÇÃO 1 -->
    <Fieldset legend="Dados do Registro">
      <div class="grid grid-cols-12 gap-4">
        <!-- servidor -->
        <div class="col-span-12 md:col-span-3">
          <FloatLabel variant="on">
            <InputText id="servidor" v-model="modelValue.servidor" fluid />
            <label for="servidor">Servidor Responsável</label>
          </FloatLabel>
        </div>

        <!-- data -->
        <div class="col-span-12 md:col-span-3">
          <DatePicker
            v-model="modelValue.data"
            placeholder="Data da Notificação"
            dateFormat="dd/mm/yy"
            showIcon
            showButtonBar
            fluid
          />
        </div>

        <!-- orgao -->
        <div class="col-span-12 md:col-span-3">
          <FloatLabel variant="on">
            <InputText id="orgao" v-model="modelValue.orgao" fluid />
            <label for="orgao">Órgão Responsável</label>
          </FloatLabel>
        </div>

        <!-- unidade -->
        <div class="col-span-12 md:col-span-3">
          <Select
            v-model="modelValue.unidade_notificadora"
            :options="unidades"
            placeholder="Unidade Notificadora"
            fluid
            filter
            showClear
          />
        </div>
      </div>
    </Fieldset>

    <!-- SEÇÃO 2 -->
    <Fieldset legend="Local da Ocorrência">
      <div class="grid grid-cols-12 gap-4">
        <!-- logradouro -->
        <div class="col-span-12 md:col-span-6">
          <FloatLabel variant="on">
            <InputText id="logradouro" v-model="modelValue.logradouro" fluid />
            <label for="logradouro">Logradouro</label>
          </FloatLabel>
        </div>

        <!-- logradouro -->
        <div class="col-span-12 md:col-span-2">
          <FloatLabel variant="on">
            <InputText id="numero" v-model="modelValue.numero" fluid />
            <label for="numero">Número</label>
          </FloatLabel>
        </div>

        <!-- localidade -->
        <div class="col-span-12 md:col-span-4">
          <FloatLabel variant="on">
            <InputText id="localidade" v-model="modelValue.localidade" fluid />
            <label for="localidade">Localidade</label>
          </FloatLabel>
        </div>

        <!-- complemento -->
        <div class="col-span-12 md:col-span-6">
          <FloatLabel variant="on">
            <InputText
              id="complemento"
              v-model="modelValue.complemento"
              fluid
            />
            <label for="complemento">Complemento e/ou Referência</label>
          </FloatLabel>
        </div>

        <!-- distrito -->
        <div class="col-span-12 md:col-span-6">
          <FloatLabel variant="on">
            <InputText id="distrito" v-model="modelValue.distrito" fluid />
            <label for="distrito">Distrito</label>
          </FloatLabel>
        </div>
      </div>
    </Fieldset>

    <Fieldset legend="Observações">
      <div class="col-span-12 md:col-span-12">
        <FloatLabel variant="on">
          <Textarea id="observacoes" v-model="modelValue.observacoes" fluid />
          <label for="observacoes"
            >Campo para observações ou breve relato no caso de violência contra
            Crianças e Adolescentes (de acordo com a Lei da Escuta Protegida nº
            13.431/17)
          </label>
        </FloatLabel>
      </div>
    </Fieldset>

    <div class="flex pt-4 justify-end">
      <Button
        label="Próximo"
        icon="pi pi-arrow-right"
        iconPos="right"
        @click="$emit('next')"
      />
    </div>
  </div>
</template>
