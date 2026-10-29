
<script setup lang="ts">
import { ref, watch } from "vue";
import { useToast } from "primevue/usetoast";

import PessoaIdentificacaoSection from "@/modules/pessoas/components/form/sections/pessoa/PessoaIdentificacaoSection.vue";
import PessoaDocumentacaoSection from "@/modules/pessoas/components/form/sections/pessoa/PessoaDocumentacaoSection.vue";
import PessoaResidenciaSection from "@/modules/pessoas/components/form/sections/pessoa/PessoaResidenciaSection.vue";
import PessoaCaracterizacaoSocialSection from "@/modules/pessoas/components/form/sections/pessoa/PessoaCaracterizacaoSocialSection.vue";
import PessoaPCDSection from "@/modules/pessoas/components/form/sections/pessoa/PessoaPCDSection.vue";

import type {
  PessoaFormData,
} from "@/modules/pessoas/types/pessoa.types";

import {
  validarPessoa,
  type ErrosPessoa,
} from "@/modules/pessoas/validation/validarPessoa";

// A view fornece o estado do formulário.
const modelValue = defineModel<PessoaFormData>({
  required: true,
});

// Permite reutilizar o formulário posteriormente
// no cadastro e na edição.
withDefaults(
  defineProps<{
    submitLabel?: string;
  }>(),
  {
    submitLabel: "Validar cadastro",
  }
);

const emit = defineEmits<{
  valid: [dados: PessoaFormData];
  cancel: [];
}>();

const toast = useToast();

const erros = ref<ErrosPessoa>({});
const tentouValidar = ref(false);

// Após a primeira tentativa, os erros são
// atualizados conforme os campos são corrigidos.
watch(
  modelValue,
  () => {
    if (tentouValidar.value) {
      erros.value = validarPessoa(modelValue.value);
    }
  },
  { deep: true }
);

function handleValidar() {
  tentouValidar.value = true;

  erros.value = validarPessoa(modelValue.value);

  const quantidadeErros = Object.keys(erros.value).length;

  toast.removeGroup("pessoa");

  if (quantidadeErros > 0) {
    toast.add({
      group: "pessoa",
      severity: "error",
      summary: "Cadastro incompleto",
      detail:
        `Foram identificados ${quantidadeErros} campos ` +
        "ou grupos de informações que precisam de correção.",
      life: 5000,
    });

    return;
  }

  // Não cadastra nem navega.
  // Entrega os dados validados à view responsável.
  emit("valid", modelValue.value);
}

function handleCancelar() {
  emit("cancel");
}
</script>

<template>
  <form
    class="flex flex-col gap-6"
    novalidate
    @submit.prevent="handleValidar"
  >
    <h3 class="text-lg font-semibold text-surface-700">
      Dados da Pessoa
    </h3>

    <PessoaIdentificacaoSection
      v-model="modelValue"
      :errors="erros"
    />

    <PessoaDocumentacaoSection
      v-model="modelValue"
      :errors="erros"
    />

    <PessoaResidenciaSection
      v-model="modelValue"
      :errors="erros"
    />

    <PessoaCaracterizacaoSocialSection
      v-model="modelValue"
      :errors="erros"
    />

    <PessoaPCDSection
      v-model="modelValue"
      :errors="erros"
    />

    <div
      class="flex flex-col-reverse gap-3 pt-2
             sm:flex-row sm:justify-end"
    >
      <Button
        type="button"
        label="Cancelar"
        icon="pi pi-times"
        severity="secondary"
        outlined
        @click="handleCancelar"
      />

      <Button
        type="submit"
        :label="submitLabel"
        icon="pi pi-check"
      />
    </div>
  </form>
</template>
