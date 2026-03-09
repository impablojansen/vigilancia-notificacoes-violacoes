<script setup lang="ts">
import { ref } from 'vue';

const modelValue = defineModel({ type: Object, required: true });

const unidades = ref([
  'CAPS',
  'Conselho Tutelar',
  'CRAS',
  'CREAS',
  'Delegacia',
  'Delegacia da Mulher',
  'Poder Judiciário'
]);

defineEmits(['next']);
</script>

<template>
  <div class="flex flex-col gap-6">
    <h3 class="text-lg font-semibold text-surface-700">
      Dados Gerais da Notificação
    </h3>

    <div class="grid grid-cols-12 gap-4">

      <!-- servidor -->
      <div class="col-span-12 md:col-span-6">
        <FloatLabel variant="on">
          <InputText id="servidor" v-model="modelValue.servidor" fluid />
          <label for="servidor">Servidor Responsável</label>
        </FloatLabel>
      </div>

      <!-- data -->
      <div class="col-span-12 md:col-span-3">
        <DatePicker
          v-model="modelValue.data"
          placeholder="Data"
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
          <label for="orgao">Órgão</label>
        </FloatLabel>
      </div>

      <!-- unidade -->
      <div class="col-span-12 md:col-span-6">
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

    <div class="flex pt-4 justify-end">
      <Button label="Próximo" icon="pi pi-arrow-right" iconPos="right" @click="$emit('next')" />
    </div>
  </div>
</template>
