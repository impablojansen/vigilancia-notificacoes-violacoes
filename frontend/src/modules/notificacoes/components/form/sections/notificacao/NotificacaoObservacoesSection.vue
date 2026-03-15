<script setup lang="ts">
import FormSection from "@/shared/components/form/FormSection.vue";

const modelValue = defineModel({ type: Object, required: true });
</script>

<template>
  <FormSection legend="Observações Iniciais">
    <FloatLabel variant="on">
      <Textarea
        id="observacoes_iniciais"
        v-model="modelValue.observacoes_iniciais"
        autoResize
        rows="4"
        fluid
      />
      <label for="observacoes_iniciais">
        Observações iniciais / breve relato
      </label>
    </FloatLabel>
  </FormSection>
</template>
