<script setup lang="ts">
import { ref } from "vue";
import FormSection from "@/shared/components/form/FormSection.vue";
import FormGrid from "@/shared/components/form/FormGrid.vue";

const modelValue = defineModel({ type: Object, required: true });

const orgaos = ref([
  "Assistência Social",
  "Saúde",
  "Educação",
  "Conselho Tutelar",
  "Segurança Pública",
  "Poder Judiciário",
  "Ministério Público",
  "Defensoria Pública",
  "Outro",
]);

const unidades = ref([
  "Centro de Convivência",
  "Centro Especializado de Atendimento à Mulher/Casa da Mulher",
  "Centro de Referência e Atendimento à Mulher (Saúde)",
  "Centro POP",
  "Conselho Municipal de Assistência Social",
  "Conselho Municipal dos Direitos da Mulher",
  "Conselho Municipal dos Direitos do Idoso",
  "Conselho Tutelar",
  "CRAS",
  "CREAS",
  "DECECA",
  "Delegacia",
  "Delegacia da Mulher",
  "Disque 100",
  "Fórum",
  "Ministério Público",
  "Núcleo de Diversidade Sexual",
  "Poder Judiciário",
  "PSE - Proteção Social Especial",
  "Rede Municipal de Educação",
  "Secretaria de Assistência Social",
  "Secretaria de Saúde",
  "Unidade de Acolhimento Institucional - Lar Esperança",
  "Unidade de Saúde",
  "Unidade de Saúde Indígena",
  "Outros"
]);
</script>

<template>
  <FormSection legend="Identificação do Registro">
    <FormGrid>
      <div class="col-span-12 md:col-span-4">
        <FloatLabel variant="on">
          <DatePicker
            id="data_notificacao"
            v-model="modelValue.data_notificacao"
            dateFormat="dd/mm/yy"
            showIcon
            showButtonBar
            fluid
          />
          <label for="data_notificacao">Data da notificação</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-4">
        <FloatLabel variant="on">
          <DatePicker
            id="data_ocorrencia"
            v-model="modelValue.data_ocorrencia"
            dateFormat="dd/mm/yy"
            showIcon
            showButtonBar
            fluid
          />
          <label for="data_ocorrencia">Data da ocorrência</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-4">
        <FloatLabel variant="on">
          <InputText
            id="hora_ocorrencia"
            v-model="modelValue.hora_ocorrencia"
            placeholder="HH:MM"
            fluid
          />
          <label for="hora_ocorrencia">Hora da ocorrência</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-4">
        <Select
          v-model="modelValue.orgao_notificante"
          :options="orgaos"
          placeholder="Órgão notificante"
          showClear
          fluid
        />
      </div>

      <div class="col-span-12 md:col-span-4">
        <Select
          v-model="modelValue.unidade_notificadora"
          :options="unidades"
          placeholder="Unidade notificadora"
          filter
          showClear
          fluid
        />
      </div>

      <div class="col-span-12 md:col-span-4">
        <FloatLabel variant="on">
          <InputText
            id="responsavel_preenchimento"
            v-model="modelValue.responsavel_preenchimento"
            fluid
          />
          <label for="responsavel_preenchimento">
            Responsável pelo preenchimento
          </label>
        </FloatLabel>
      </div>
    </FormGrid>
  </FormSection>
</template>
