

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";

import PessoaIdentificacaoSection from "@/modules/pessoas/components/form/sections/pessoa/PessoaIdentificacaoSection.vue";
import PessoaDocumentacaoSection from "@/modules/pessoas/components/form/sections/pessoa/PessoaDocumentacaoSection.vue";
import PessoaResidenciaSection from "@/modules/pessoas/components/form/sections/pessoa/PessoaResidenciaSection.vue";
import PessoaCaracterizacaoSocialSection from "@/modules/pessoas/components/form/sections/pessoa/PessoaCaracterizacaoSocialSection.vue";
import PessoaPCDSection from "@/modules/pessoas/components/form/sections/pessoa/PessoaPCDSection.vue";

import { usePessoaForm } from "@/modules/pessoas/composables/usePessoaForm";

import {
  validarPessoa,
  type ErrosPessoa,
} from "@/modules/pessoas/validation/validarPessoa";

const router = useRouter();
const toast = useToast();

const { formData } = usePessoaForm();

const erros = ref<ErrosPessoa>({});
const tentouValidar = ref(false);

// Após a primeira tentativa de validação,
// os erros são atualizados conforme o usuário
// corrige os campos do formulário.
watch(
  formData,
  () => {
    if (tentouValidar.value) {
      erros.value = validarPessoa(formData.value);
    }
  },
  { deep: true }
);

function handleCancelar() {
  router.push("/pessoas");
}

function handleValidar() {
  tentouValidar.value = true;

  erros.value = validarPessoa(formData.value);

  const quantidadeErros = Object.keys(erros.value).length;

  // Evita acumular notificações a cada tentativa.
  toast.removeGroup("pessoa");

  if (quantidadeErros > 0) {
    toast.add({
      group: "pessoa",
      severity: "error",
      summary: "Cadastro incompleto",
      detail:
        `Foram identificados ${quantidadeErros} campos ` +
        "que precisam de correção.",
      life: 5000,
    });

    return;
  }

  // Formulário válido.
  // A persistência será implementada futuramente.
  toast.add({
    group: "pessoa",
    severity: "success",
    summary: "Validação concluída",
    detail:
      "As informações passaram pela validação. " +
      "O cadastro ainda não foi salvo.",
    life: 4000,
  });
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
      v-model="formData"
      :errors="erros"
    />

    <PessoaDocumentacaoSection
      v-model="formData"
      :errors="erros"
    />

    <PessoaResidenciaSection
      v-model="formData"
      :errors="erros"
    />

    <PessoaCaracterizacaoSocialSection
      v-model="formData"
      :errors="erros"
    />

    <PessoaPCDSection
      v-model="formData"
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
        label="Validar cadastro"
        icon="pi pi-check"
      />
    </div>
  </form>
</template>
