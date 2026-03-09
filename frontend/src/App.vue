<script setup lang="ts">
import { ref } from "vue";
import DadosGerais from "./components/form/DadosGerais.vue";
import VioladoForm from "./components/form/VioladoForm.vue";
import ViolacaoForm from "./components/form/ViolacaoForm.vue";

// Estado centralizado: Adicione aqui as chaves conforme for criando os componentes
const formData = ref({
  // Dados Gerais
  servidor: "",
  data: null,
  orgao: "",
  unidade_notificadora: null,

  // Sujeito Violado
  nome: "",
  nome_social: "",
  data_nasc: null,
  cpf: "",
  is_migrante: false,
  nacionalidade: "",
  naturalidade: "",
  raca: null,
  ciclo_vida: null,

  violacoes: [],
});
</script>

<template>
  <div class="card flex justify-center p-4">
    <Stepper value="1" class="w-full max-w-7xl">
      <StepList>
        <Step value="1">Dados Gerais</Step>
        <Step value="2">Violado</Step>
        <Step value="3">Violação</Step>
        <Step value="4">Violador</Step>
        <Step value="5">Acompanhamento</Step>
      </StepList>

      <StepPanels>
        <StepPanel v-slot="{ activateCallback }" value="1">
          <DadosGerais v-model="formData" @next="activateCallback('2')" />
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
      </StepPanels>
    </Stepper>
  </div>
</template>
