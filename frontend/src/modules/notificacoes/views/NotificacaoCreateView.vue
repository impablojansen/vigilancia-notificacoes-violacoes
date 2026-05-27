<script setup lang="ts">
import { computed, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

import NotificacaoForm from "@/modules/notificacoes/components/form/NotificacaoForm.vue";

import { useNotificacaoForm } from "@/modules/notificacoes/composables/useNotificacaoForm";
import { buscarPessoaPorId } from "@/modules/pessoas/mock/pessoas.mock";

const route = useRoute();
const router = useRouter();

const { formData } = useNotificacaoForm(); //TODO: REMOVER

const pessoaId = computed(() => {
  const raw = route.query.pessoaId;

  if (!raw) return null;
  const value = Array.isArray(raw) ? raw[0] : raw;
  const parsed = Number(value);

  return Number.isNaN(parsed) ? null : parsed;
});

const pessoaSelecionada = computed(() => {
  if (!pessoaId.value) return null;
  return buscarPessoaPorId(pessoaId.value);
});

watchEffect(() => {
  if (!pessoaId.value) {
    router.replace("/pessoas");
    return;
  }

  if (!pessoaSelecionada.value) {
    router.replace("/pessoas");
    return;
  }

  // formData.value.nome = {
  //   ...formData.value.violado,
  //   nome: pessoaSelecionada.value.nome ?? "",
  //   cpf: pessoaSelecionada.value.cpf ?? "",
  //   data_nascimento: pessoaSelecionada.value.data_nascimento ?? null,
  // };
});

function formatarData(data: string | null) {
  if (!data) return "Não informado";

  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}
</script>

<template>
  <div class="space-y-4">
    <div
      v-if="pessoaSelecionada"
      class="rounded-2xl border border-primary-100 bg-primary-50 p-4 shadow-sm lg:p-6"
    >
      <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 class="text-lg font-semibold text-surface-900 lg:text-xl">
            Nova Notificação
          </h1>

          <div class="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <div class="text-xs uppercase tracking-wide text-surface-500">
                Nome
              </div>
              <div class="mt-1 text-sm font-medium text-surface-900">
                {{ pessoaSelecionada.nome }}
              </div>
            </div>

            <div>
              <div class="text-xs uppercase tracking-wide text-surface-500">
                CPF
              </div>
              <div class="mt-1 text-sm font-medium text-surface-900">
                {{ pessoaSelecionada.cpf || "Não informado" }}
              </div>
            </div>

            <div>
              <div class="text-xs uppercase tracking-wide text-surface-500">
                Data de nascimento
              </div>
              <div class="mt-1 text-sm font-medium text-surface-900">
                {{ formatarData(pessoaSelecionada.data_nascimento) }}
              </div>
            </div>
          </div>
        </div>

        <Button
          label="Trocar pessoa"
          icon="pi pi-arrow-left"
          severity="secondary"
          outlined
          @click="router.push('/pessoas')"
        />
      </div>
    </div>

    <div class="rounded-2xl border bg-white p-3 shadow-sm sm:p-4 lg:p-6">
      <NotificacaoForm v-model="formData" />
    </div>
  </div>
</template>