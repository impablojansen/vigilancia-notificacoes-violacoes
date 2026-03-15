<script setup lang="ts">
import FormActions from "@/shared/components/form/FormActions.vue";
import VioladorResumoSection from "@/modules/notificacoes/components/form/sections/violador/VioladorResumoSection.vue";
import VioladorCadastroSection from "@/modules/notificacoes/components/form/sections/violador/VioladorCadastroSection.vue";

const modelValue = defineModel<{ numero_envolvidos: number | null; violadores: any[] }>({
  required: true,
});

defineEmits(["next", "back"]);
</script>

<template>
  <div class="flex flex-col gap-6">
    <h3 class="text-lg font-semibold text-surface-700">
      Dados do Violador / Provável Autor
    </h3>

    <VioladorResumoSection v-model="modelValue" />
    <VioladorCadastroSection v-model="modelValue" />

    <FormActions showBack @back="$emit('back')" @next="$emit('next')" />
  </div>
</template>
