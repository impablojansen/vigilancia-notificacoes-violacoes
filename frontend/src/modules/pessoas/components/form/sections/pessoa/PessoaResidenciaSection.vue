<script setup lang="ts">
import { ref } from "vue";

import FormSection from "@/shared/components/form/FormSection.vue";
import FormGrid from "@/shared/components/form/FormGrid.vue";

const modelValue = defineModel({ type: Object, required: true });
const zonas = ref(["Urbana", "Rural", "Periurbana"]);
</script>

<template>
  <FormSection legend="Endereço">
    <FormGrid>
      <div class="col-span-12 md:col-span-3">
        <FloatLabel variant="on">
          <InputText id="uf_residencia" v-model="modelValue.uf_residencia" fluid />
          <label for="uf_residencia">UF</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-3">
        <FloatLabel variant="on">
          <InputText id="municipio_residencia" v-model="modelValue.municipio_residencia" fluid />
          <label for="municipio_residencia">Município de Residência</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-3">
        <FloatLabel variant="on">
          <InputText id="distrito" v-model="modelValue.distrito" fluid />
          <label for="distrito">Distrito</label>
        </FloatLabel>
      </div>
      
      <div class="col-span-12 md:col-span-3">
        <FloatLabel variant="on">
          <InputText id="bairro" v-model="modelValue.bairro" fluid />
          <label for="bairro">Bairro/Localidade</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-6">
        <FloatLabel variant="on">
          <InputText id="logradouro" v-model="modelValue.logradouro" fluid />
          <label for="logradouro">Logradouro</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-3">
        <FloatLabel variant="on">
          <InputText id="numero" v-model="modelValue.numero" fluid />
          <label for="numero">Número</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-3">
        <FloatLabel variant="on">
          <InputText id="complemento" v-model="modelValue.complemento" fluid />
          <label for="complemento">Complemento</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-6">
        <FloatLabel variant="on">
          <InputText id="ponto_referencia" v-model="modelValue.ponto_referencia" fluid />
          <label for="ponto_referencia">Ponto de Referência</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-3">
        <FloatLabel variant="on">
          <InputText id="cep_residencia" v-model="modelValue.cep" fluid />
          <label for="cep_residencia">CEP</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-3">
        <Select v-model="modelValue.zona_ocorrencia" :options="zonas" placeholder="Zona da residência" showClear fluid />
      </div>

    </FormGrid>
  </FormSection>
</template>
