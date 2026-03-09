<script setup lang="ts">
const modelValue = defineModel({ type: Object, required: true });
defineEmits(['next', 'back']);
</script>

<template>
<div class="grid grid-cols-12 gap-4">

  <!-- nome -->
  <div class="col-span-12 md:col-span-6">
    <FloatLabel variant="on">
      <InputText id="nome" v-model="modelValue.nome" fluid />
      <label for="nome">Nome Completo</label>
    </FloatLabel>
  </div>

  <!-- nome social -->
  <div class="col-span-12 md:col-span-6">
    <FloatLabel variant="on">
      <InputText id="nome_social" v-model="modelValue.nome_social" fluid />
      <label for="nome_social">Nome Social</label>
    </FloatLabel>
  </div>

  <!-- nascimento -->
  <div class="col-span-12 md:col-span-3">
    <DatePicker
      v-model="modelValue.data_nasc"
      placeholder="Nascimento"
      dateFormat="dd/mm/yy"
      fluid
    />
  </div>

  <!-- cpf -->
  <div class="col-span-12 md:col-span-3">
    <InputMask
      v-model="modelValue.cpf"
      mask="999.999.999-99"
      placeholder="CPF"
      fluid
    />
  </div>

  <!-- migrante -->
  <div class="col-span-12 md:col-span-3 flex items-center gap-2">
    <Checkbox v-model="modelValue.is_migrante" binary />
    <label>É migrante?</label>
  </div>

  <!-- raça -->
  <div class="col-span-12 md:col-span-3">
    <Select
      v-model="modelValue.raca"
      :options="['Branco','Negro','Pardo','Indígena','Amarelo','Sem Informação']"
      placeholder="Raça/Etnia"
      fluid
    />
  </div>

  <!-- nacionalidade -->
  <div
    v-if="modelValue.is_migrante"
    class="col-span-12 md:col-span-6"
  >
    <InputText
      v-model="modelValue.nacionalidade"
      placeholder="País de origem"
      fluid
    />
  </div>

  <!-- naturalidade -->
  <div
    v-if="modelValue.is_migrante"
    class="col-span-12 md:col-span-6"
  >
    <InputText
      v-model="modelValue.naturalidade"
      placeholder="Cidade/Estado"
      fluid
    />
  </div>

  <!-- ciclo -->
  <div class="col-span-12 md:col-span-4">
    <Select
      v-model="modelValue.ciclo_vida"
      :options="['00 a 06','06 a 12','12 a 17','18 a 29','30 a 59','60+']"
      placeholder="Ciclo de Vida"
      fluid
    />
  </div>

</div>

    <div class="flex pt-6 justify-between">
      <Button label="Voltar" severity="secondary" @click="$emit('back')" />
      <Button label="Próximo" @click="$emit('next')" />
    </div>

</template>
