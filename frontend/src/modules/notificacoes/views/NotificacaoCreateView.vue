<script setup lang="ts">
import { computed, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

import DadosNotificacaoForm from "@/modules/notificacoes/components/form/DadosNotificacaoForm.vue";
import ViolacaoForm from "@/modules/notificacoes/components/form/ViolacaoForm.vue";
import VioladorForm from "@/modules/notificacoes/components/form/VioladorForm.vue";
import AcompanhamentoForm from "@/modules/notificacoes/components/form/AcompanhamentoForm.vue";
import { useNotificacaoForm } from "@/modules/notificacoes/composables/useNotificacaoForm";
import { buscarPessoaPorId } from "@/modules/pessoas/mock/pessoas.mock";

const route = useRoute();
const router = useRouter();

const { formData } = useNotificacaoForm();

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
      <Stepper value="1" class="w-full">
        <div class="overflow-x-auto pb-2">
          <StepList class="min-w-max">
            <Step value="1">
              <span class="hidden sm:inline">Dados da Notificação</span>
              <span class="sm:hidden">Notificação</span>
            </Step>
            <Step value="2">
              <span class="hidden sm:inline">Violência/Violação</span>
              <span class="sm:hidden">Violação</span>
            </Step>
            <Step value="3">
              <span class="hidden sm:inline">Violador/Autor</span>
              <span class="sm:hidden">Violador</span>
            </Step>
            <Step value="4">
              <span class="hidden sm:inline">Acompanhamento</span>
              <span class="sm:hidden">Acomp.</span>
            </Step>
          </StepList>
        </div>

        <StepPanels class="mt-4">
          <StepPanel v-slot="{ activateCallback }" value="1">
            <DadosNotificacaoForm
              v-model="formData"
              @next="activateCallback('2')"
            />
          </StepPanel>

          <StepPanel v-slot="{ activateCallback }" value="2">
            <ViolacaoForm
              v-model="formData"
              @next="activateCallback('3')"
              @back="activateCallback('1')"
            />
          </StepPanel>

          <StepPanel v-slot="{ activateCallback }" value="3">
            <VioladorForm
              v-model="formData"
              @next="activateCallback('4')"
              @back="activateCallback('2')"
            />
          </StepPanel>

          <StepPanel v-slot="{ activateCallback }" value="4">
            <AcompanhamentoForm
              v-model="formData"
              @next="activateCallback('1')"
              @back="activateCallback('3')"
            />
          </StepPanel>

        </StepPanels>
      </Stepper>
    </div>
  </div>
</template>