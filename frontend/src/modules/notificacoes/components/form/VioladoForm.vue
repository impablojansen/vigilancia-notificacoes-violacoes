<script setup lang="ts">
import FormActions from "@/shared/components/form/FormActions.vue";

import VioladoIdentificacaoSection from "@/modules/notificacoes/components/form/sections/violado/VioladoIdentificacaoSection.vue";
import VioladoDocumentacaoSection from "@/modules/notificacoes/components/form/sections/violado/VioladoDocumentacaoSection.vue";
import VioladoCaracterizacaoSection from "@/modules/notificacoes/components/form/sections/violado/VioladoCaracterizacaoSection.vue";
import VioladoPCDSection from "@/modules/notificacoes/components/form/sections/violado/VioladoPCDSection.vue";
import VioladoCondicoesEspecificasSection from "@/modules/notificacoes/components/form/sections/violado/VioladoCondicoesEspecificasSection.vue";

const modelValue = defineModel({ type: Object, required: true });

defineEmits(["next", "back"]);
</script>

<template>
  <div class="flex flex-col gap-6">
    <h3 class="text-lg font-semibold text-surface-700">
      Dados da Pessoa Violada
    </h3>

    <VioladoIdentificacaoSection v-model="modelValue" />
    <VioladoDocumentacaoSection v-model="modelValue" />
    <VioladoCaracterizacaoSection v-model="modelValue" />
    <VioladoPCDSection v-model="modelValue" />
    <VioladoCondicoesEspecificasSection v-model="modelValue" />

    <FormActions showBack @back="$emit('back')" @next="$emit('next')" />
  </div>
</template>
