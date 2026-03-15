<script setup lang="ts">
import FormActions from "@/shared/components/form/FormActions.vue";
import ViolacaoListaSection from "@/modules/notificacoes/components/form/sections/violacao/ViolacaoListaSection.vue";
import ViolacaoQualificacaoSection from "@/modules/notificacoes/components/form/sections/violacao/ViolacaoQualificacaoSection.vue";

type ViolacaoRegistro = {
  tipo: string;
};

const modelValue = defineModel<{
  violacoes: ViolacaoRegistro[];
  motivo_violencia?: string | null;
  lesao_autoprovocada?: string | null;
  meio_agressao?: string | null;
  ocorreu_outras_vezes?: string | null;
}>({ required: true });

defineEmits(["next", "back"]);
</script>

<template>
  <div class="flex flex-col gap-6">
    <h3 class="text-lg font-semibold text-surface-700">
      Dados da Violência ou Violação de Direitos
    </h3>

    <ViolacaoListaSection v-model="modelValue" />
    <ViolacaoQualificacaoSection v-model="modelValue" />

    <FormActions showBack @back="$emit('back')" @next="$emit('next')" />
  </div>
</template>
