<script setup lang="ts">
import FormActions from "@/shared/components/form/FormActions.vue";

import VioladorCadastroSection from "@/modules/notificacoes/components/form/sections/violador/VioladorCadastroSection.vue";

const modelValue = defineModel({ type: Object, required: true });

defineEmits(["next", "back"]);
</script>

<template>
  <div class="flex flex-col gap-6">
    <h3 class="text-lg font-semibold text-surface-700">
      Dados do(s) Violador(es)
    </h3>

    <VioladorCadastroSection v-model="modelValue" />

    <FormActions showBack @back="$emit('back')" @next="$emit('next')" />
  </div>
</template>
