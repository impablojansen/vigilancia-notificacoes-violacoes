
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";

import PessoaForm from "@/modules/pessoas/components/form/PessoaForm.vue";

import { usePessoaForm } from "@/modules/pessoas/composables/usePessoaForm";

import {
  cadastrarPessoaMock,
} from "@/modules/pessoas/mock/pessoas.mock";

import type {
  PessoaFormData,
} from "@/modules/pessoas/types/pessoa.types";

type DestinoAposCadastro = "notificacao" | "lista";

const router = useRouter();
const toast = useToast();

const { formData } = usePessoaForm();

const destinoAposCadastro = ref<DestinoAposCadastro>(
  "notificacao"
);

const opcoesDestino = [
  {
    label: "Iniciar uma notificação",
    value: "notificacao",
  },
  {
    label: "Voltar à pesquisa de pessoas",
    value: "lista",
  },
];

function voltarParaLista() {
  router.push({ name: "pessoas-list" });
}

function registrarPessoa(dados: PessoaFormData) {
  // Neste momento, o cadastro é somente simulado.
  const resultado = cadastrarPessoaMock(dados);

  toast.removeGroup("pessoa");

  // Impede duplicidade de CPF na fonte mock.
  if (!resultado.ok) {
    toast.add({
      group: "pessoa",
      severity: "warn",
      summary: "CPF já cadastrado",
      detail:
        "Já existe uma pessoa com esse CPF na base " +
        "simulada. Confira o cadastro existente " +
        "antes de continuar.",
      life: 6000,
    });

    return;
  }

  const pessoaCriada = resultado.pessoa;

  toast.add({
    group: "pessoa",
    severity: "success",
    summary: "Cadastro simulado concluído",
    detail:
      "A pessoa foi adicionada à memória da aplicação. " +
      "Os dados serão perdidos ao recarregar a página.",
    life: 6000,
  });

  if (destinoAposCadastro.value === "notificacao") {
    router.push({
      name: "notificacao-create",
      query: {
        pessoaId: String(pessoaCriada.id),
      },
    });

    return;
  }

  voltarParaLista();
}
</script>

<template>
  <div class="mx-auto max-w-5xl space-y-6">
    <!-- Identificação da página -->
    <header>
      <h1
        class="text-2xl font-semibold
               tracking-tight text-surface-900"
      >
        Cadastrar pessoa
      </h1>

      <p class="mt-1 text-sm text-surface-600">
        Registre os dados da pessoa para
        vinculá-la às notificações municipais.
      </p>
    </header>

    <!-- Aviso temporário de desenvolvimento -->
    <div
      role="note"
      class="flex items-start gap-3 rounded-lg
             bg-surface-100 p-4 text-sm text-surface-700"
    >
      <i
        class="pi pi-info-circle mt-0.5
               text-surface-500"
      />

      <p>
        Ambiente de teste: os cadastros são
        armazenados apenas em memória.
        Nenhuma informação será enviada
        ao servidor.
      </p>
    </div>

    <!-- O destino é responsabilidade da view -->
    <div class="space-y-2">
      <label
        for="destino_cadastro"
        class="block text-sm font-medium
               text-surface-700"
      >
        Após cadastrar
      </label>

      <Select
        id="destino_cadastro"
        v-model="destinoAposCadastro"
        :options="opcoesDestino"
        optionLabel="label"
        optionValue="value"
        class="w-full sm:max-w-sm"
      />
    </div>

    <!-- Formulário independente da navegação -->
    <PessoaForm
      v-model="formData"
      submit-label="Simular cadastro"
      @valid="registrarPessoa"
      @cancel="voltarParaLista"
    />
  </div>
</template>
