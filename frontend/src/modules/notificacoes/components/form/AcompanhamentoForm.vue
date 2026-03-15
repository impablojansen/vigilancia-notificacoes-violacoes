<script setup lang="ts">
import FormActions from "@/shared/components/form/FormActions.vue";
import AcompanhamentoStatusSection from "@/modules/notificacoes/components/form/sections/acompanhamento/AcompanhamentoStatusSection.vue";
import AcompanhamentoSituacaoSection from "@/modules/notificacoes/components/form/sections/acompanhamento/AcompanhamentoSituacaoSection.vue";
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

    <AcompanhamentoStatusSection v-model="modelValue" />
    <AcompanhamentoEncaminhamentosSection v-model="modelValue" />
    <AcompanhamentoSituacaoSection v-model="modelValue" />
    <AcompanhamentoObservacoesSection v-model="modelValue" />

    <FormActions showBack @back="$emit('back')" @next="$emit('next')" />
  </div>
</template>
