<script setup lang="ts">
import FormActions from "@/shared/components/form/FormActions.vue";

import ViolacaoListaSection from "@/modules/notificacoes/components/form/sections/violacao/ViolacaoListaSection.vue";
import ViolacaoSituacaoSection from "@/modules/notificacoes//components/form/sections/violacao/ViolacaoSituacaoSection.vue";
import ViolenciaQualificacaoSection from "@/modules/notificacoes/components/form/sections/violacao/ViolenciaQualificacaoSection.vue";

// type ViolacaoRegistro = {
//   tipo: string;
// };

const modelValue = defineModel({ type: Object, required: true });

defineEmits(["next", "back"]);
</script>

<template>
  <div class="flex flex-col gap-6">
    <h3 class="text-lg font-semibold text-surface-700">
      Dados da Violência ou Violação de Direitos
    </h3>

    <ViolacaoListaSection v-model="modelValue" />
    <ViolacaoSituacaoSection v-model="modelValue" />
    <ViolenciaQualificacaoSection v-model="modelValue" />

    <FormActions showBack @back="$emit('back')" @next="$emit('next')" />
  </div>
</template>
