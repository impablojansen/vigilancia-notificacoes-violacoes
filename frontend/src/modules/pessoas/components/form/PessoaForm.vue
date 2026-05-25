<script setup lang="ts">
import { useRouter } from "vue-router";

import PessoaIdentificacaoSection from "@/modules/pessoas/components/form/sections/pessoa/PessoaIdentificacaoSection.vue";
import PessoaDocumentacaoSection from "@/modules/pessoas/components/form/sections/pessoa/PessoaDocumentacaoSection.vue";
import PessoaCaracterizacaoSection from "@/modules/pessoas/components/form/sections/pessoa/PessoaCaracterizacaoSection.vue";
import PessoaPCDSection from "@/modules/pessoas/components/form/sections/pessoa/PessoaPCDSection.vue";
import PessoaCondicoesEspecificasSection from "@/modules/pessoas/components/form/sections/pessoa/PessoaCondicoesEspecificasSection.vue";
import PessoaResidenciaSection from "@/modules/pessoas/components/form/sections/pessoa/PessoaResidenciaSection.vue";
import { usePessoaForm } from "@/modules/pessoas/composables/usePessoaForm";

const router = useRouter();
const { formData } = usePessoaForm();

function handleCancelar() {
  router.push("/pessoas");
}

function handleSalvar() {
  // TODO: LÓGICA DE SALVAR
  console.log("Salvar pessoa:", formData.value);

  // TODO: PARA ONDE IR?
  router.push("/pessoas");
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <h3 class="text-lg font-semibold text-surface-700">
      Dados da Pessoa
    </h3>

    <PessoaIdentificacaoSection v-model="formData" />
    <PessoaDocumentacaoSection v-model="formData" />
    <PessoaResidenciaSection v-model="formData" />
    <PessoaCaracterizacaoSection v-model="formData" />
    <PessoaPCDSection v-model="formData" />
    <PessoaCondicoesEspecificasSection v-model="formData" />

    <div class="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
      <Button
        label="Cancelar"
        icon="pi pi-times"
        severity="danger"
        outlined
        @click="handleCancelar"
      />
      <Button
        label="Cadastrar pessoa"
        icon="pi pi-check"
        @click="handleSalvar"
      />
    </div>
  </div>
</template>
