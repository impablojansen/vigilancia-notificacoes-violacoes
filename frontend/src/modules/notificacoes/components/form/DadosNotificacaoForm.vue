<script setup lang="ts">
import FormActions from "@/shared/components/form/FormActions.vue";
import NotificacaoRegistroSection from "@/modules/notificacoes/components/form/sections/notificacao/NotificacaoRegistroSection.vue";
import NotificacaoLocalSection from "@/modules/notificacoes/components/form/sections/notificacao/NotificacaoLocalSection.vue";
import NotificacaoObservacoesSection from "@/modules/notificacoes/components/form/sections/notificacao/NotificacaoObservacoesSection.vue";

const modelValue = defineModel({ type: Object, required: true });

defineEmits(["next"]);
</script>

<template>
  <div class="flex flex-col gap-6">
    <h3 class="text-lg font-semibold text-surface-700">
      Dados da Notificação
    </h3>

    <NotificacaoRegistroSection v-model="modelValue" />
    <NotificacaoLocalSection v-model="modelValue" />
    <NotificacaoObservacoesSection v-model="modelValue" />

    <FormActions @next="$emit('next')" />
  </div>
</template>
