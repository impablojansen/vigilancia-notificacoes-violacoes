<script setup lang="ts">
import FormSection from "@/shared/components/form/FormSection.vue";

const modelValue = defineModel({ type: Object, required: true });
</script>

<template>
  <FormSection legend="Observações">
    <FloatLabel variant="on">
      <Textarea
        id="observacoes_finais"
        v-model="modelValue.observacoes"
        autoResize
        rows="4"
        fluid
      />
      <label for="observacoes_finais">Espaço reservado para observações adicionais</label>
    </FloatLabel>
  </FormSection>
</template>
