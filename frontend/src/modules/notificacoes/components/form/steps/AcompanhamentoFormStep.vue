<script setup lang="ts">
import FormActions from "@/shared/components/form/FormActions.vue";

import AcompanhamentoAssistenciaSection from "@/modules/notificacoes/components/form/sections/acompanhamento/AcompanhamentoAssistenciaSection.vue";
import AcompanhamentoSaudeSection from "@/modules/notificacoes/components/form/sections/acompanhamento/AcompanhamentoSaudeSection.vue";
import AcompanhamentoEncaminhamentosSection from "@/modules/notificacoes/components/form/sections/acompanhamento/AcompanhamentoEncaminhamentosSection.vue";
import AcompanhamentoObservacoesSection from "@/modules/notificacoes/components/form/sections/acompanhamento/AcompanhamentoObservacoesSection.vue";

const modelValue = defineModel({ type: Object, required: true });

defineEmits(["next", "back"]);
</script>

<template>
  <div class="flex flex-col gap-6">
    <h3 class="text-lg font-semibold text-surface-700">
      Dados do Acompanhamento
    </h3>

    <AcompanhamentoEncaminhamentosSection v-model="modelValue" />
    <AcompanhamentoAssistenciaSection v-model="modelValue" />
    <AcompanhamentoSaudeSection v-model="modelValue" />
    <AcompanhamentoObservacoesSection v-model="modelValue" />

    <FormActions showBack @back="$emit('back')" @next="$emit('next')" />
  </div>
</template>
