<script setup lang="ts">
import { ref } from "vue";
import FormSection from "@/shared/components/form/FormSection.vue";
import FormGrid from "@/shared/components/form/FormGrid.vue";

const modelValue = defineModel({ type: Object, required: true });

const locaisColeta = ref([
  "CRAS",
  "CREAS",
  "Conselho Tutelar",
  "Unidade de Saúde",
  "Hospital",
  "Escola",
  "Delegacia",
  "Poder Judiciário",
  "Outro",
]);

const locaisOcorrencia = ref([
  "Residência",
  "Habitação coletiva",
  "Escola",
  "Local de prática esportiva",
  "Bar ou similar",
  "Via pública",
  "Comércio/serviços",
  "Indústrias/construção",
  "Outro",
]);

const zonas = ref(["Urbana", "Rural", "Periurbana"]);
</script>

<template>
  <FormSection legend="Local da Ocorrência e Coleta">
    <FormGrid>
      <div class="col-span-12 md:col-span-4">
        <Select
          v-model="modelValue.local_coleta"
          :options="locaisColeta"
          placeholder="Local de coleta"
          filter
          showClear
          fluid
        />
      </div>

      <div class="col-span-12 md:col-span-4">
        <Select
          v-model="modelValue.local_ocorrencia"
          :options="locaisOcorrencia"
          placeholder="Local da ocorrência"
          showClear
          fluid
        />
      </div>

      <div class="col-span-12 md:col-span-4">
        <Select
          v-model="modelValue.zona_ocorrencia"
          :options="zonas"
          placeholder="Zona da ocorrência"
          showClear
          fluid
        />
      </div>

      <div class="col-span-12 md:col-span-4">
        <FloatLabel variant="on">
          <InputText
            id="municipio_notificacao"
            v-model="modelValue.municipio_notificacao"
            fluid
          />
          <label for="municipio_notificacao">Município da notificação</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-4">
        <FloatLabel variant="on">
          <InputText
            id="municipio_ocorrencia"
            v-model="modelValue.municipio_ocorrencia"
            fluid
          />
          <label for="municipio_ocorrencia">Município da ocorrência</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-4">
        <FloatLabel variant="on">
          <InputText
            id="bairro_ocorrencia"
            v-model="modelValue.bairro_ocorrencia"
            fluid
          />
          <label for="bairro_ocorrencia">Bairro da ocorrência</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-8">
        <FloatLabel variant="on">
          <InputText
            id="endereco_ocorrencia"
            v-model="modelValue.endereco_ocorrencia"
            fluid
          />
          <label for="endereco_ocorrencia">Endereço da ocorrência</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-4">
        <FloatLabel variant="on">
          <InputText
            id="distrito_ocorrencia"
            v-model="modelValue.distrito_ocorrencia"
            fluid
          />
          <label for="distrito_ocorrencia">Distrito</label>
        </FloatLabel>
      </div>
    </FormGrid>
  </FormSection>
</template>
