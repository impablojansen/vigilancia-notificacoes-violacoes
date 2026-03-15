<script setup lang="ts">
import FormSection from "@/shared/components/form/FormSection.vue";
import FormGrid from "@/shared/components/form/FormGrid.vue";

const modelValue = defineModel({ type: Object, required: true });
</script>

<template>
  <FormSection legend="Resumo do Envolvimento">
    <FormGrid>
      <div class="col-span-12 md:col-span-4">
        <FloatLabel variant="on">
          <InputNumber
            id="numero_envolvidos"
            v-model="modelValue.numero_envolvidos"
            :min="1"
            showButtons
            fluid
          />
          <label for="numero_envolvidos">Número de envolvidos</label>
        </FloatLabel>
      </div>
    </FormGrid>
  </FormSection>
</template>
