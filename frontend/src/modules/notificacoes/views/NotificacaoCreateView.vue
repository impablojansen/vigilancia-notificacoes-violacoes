<script setup lang="ts">
import DadosNotificacaoForm from "@/modules/notificacoes/components/form/DadosNotificacaoForm.vue";
import VioladoForm from "@/modules/notificacoes/components/form/VioladoForm.vue";
import ViolacaoForm from "@/modules/notificacoes/components/form/ViolacaoForm.vue";
import VioladorForm from "@/modules/notificacoes/components/form/VioladorForm.vue";
import AcompanhamentoForm from "@/modules/notificacoes/components/form/AcompanhamentoForm.vue";
import { useNotificacaoForm } from "@/modules/notificacoes/composables/useNotificacaoForm";

const { formData } = useNotificacaoForm();
</script>

<template>
  <div class="space-y-4">
    <div class="rounded-2xl border bg-white p-4 shadow-sm lg:p-6">
      <h1 class="text-lg font-semibold text-surface-900 lg:text-xl">
        Nova Notificação
      </h1>
      <p class="mt-1 text-sm text-surface-600">
        Preencha os dados da notificação de violência ou violação de direitos.
      </p>
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
              <span class="hidden sm:inline">Sujeito Violado</span>
              <span class="sm:hidden">Violado</span>
            </Step>
            <Step value="3">
              <span class="hidden sm:inline">Violência / Violação</span>
              <span class="sm:hidden">Violação</span>
            </Step>
            <Step value="4">
              <span class="hidden sm:inline">Violador / Autor</span>
              <span class="sm:hidden">Violador</span>
            </Step>
            <Step value="5">
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
            <VioladoForm
              v-model="formData"
              @next="activateCallback('3')"
              @back="activateCallback('1')"
            />
          </StepPanel>

          <StepPanel v-slot="{ activateCallback }" value="3">
            <ViolacaoForm
              v-model="formData"
              @next="activateCallback('4')"
              @back="activateCallback('2')"
            />
          </StepPanel>

          <StepPanel v-slot="{ activateCallback }" value="4">
            <VioladorForm
              v-model="formData"
              @next="activateCallback('5')"
              @back="activateCallback('3')"
            />
          </StepPanel>

          <StepPanel v-slot="{ activateCallback }" value="5">
            <AcompanhamentoForm
              v-model="formData"
              @next="activateCallback('1')"
              @back="activateCallback('4')"
            />
          </StepPanel>
        </StepPanels>
      </Stepper>
    </div>
  </div>
</template>
