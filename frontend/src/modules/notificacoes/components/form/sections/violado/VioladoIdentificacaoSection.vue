<script setup lang="ts">
import FormSection from "@/shared/components/form/FormSection.vue";
import FormGrid from "@/shared/components/form/FormGrid.vue";

const modelValue = defineModel({ type: Object, required: true });
</script>

<template>
  <FormSection legend="Identificação">
    <FormGrid>
      <div class="col-span-12 md:col-span-3">
        <FloatLabel variant="on">
          <InputText id="nome" v-model="modelValue.nome" fluid />
          <label for="nome">Nome Completo</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-3">
        <FloatLabel variant="on">
          <InputText id="nome_social" v-model="modelValue.nome_social" fluid />
          <label for="nome_social">Nome Social</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-3">
        <DatePicker
          v-model="modelValue.data_nascimento"
          placeholder="Data de Nascimento"
          dateFormat="dd/mm/yy"
          showIcon
          showButtonBar
          fluid
        />
      </div>

      <div class="col-span-12 md:col-span-3">
        <FloatLabel variant="on">
          <InputText id="nome_mae" v-model="modelValue.nome_mae" fluid />
          <label for="nome_mae">Nome da Mãe</label>
        </FloatLabel>
      </div>
    </FormGrid>
  </FormSection>
</template>
