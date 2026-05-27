<script setup lang="ts">
import FormSection from "@/shared/components/form/FormSection.vue";
import FormGrid from "@/shared/components/form/FormGrid.vue";

import { vNormalizeText } from "@/shared/utils/normalizarTexto";

const modelValue = defineModel({ type: Object, required: true });
</script>

<template>
  <FormSection legend="Documentação e Contato">
    <FormGrid>
      <div class="col-span-12 md:col-span-3">
        <FloatLabel variant="on">
          <InputMask id="cpf" v-model="modelValue.cpf" mask="999.999.999-99" fluid />
          <label for="cpf">CPF</label>
        </FloatLabel>

      </div>

      <div class="col-span-12 md:col-span-3">
        <FloatLabel variant="on">
          <InputMask id="nis" v-model="modelValue.nis" mask="999.99999.99-9" fluid />
          <label for="nis">NIS</label>
        </FloatLabel>

      </div>

      <div class="col-span-12 md:col-span-3">
        <FloatLabel variant="on">
          <InputMask id="cartao_sus" v-model="modelValue.cartao_sus" mask="999 9999 9999 9999" fluid />
          <label for="cartao_sus">Cartão do SUS</label>
        </FloatLabel>

      </div>

      <div class="col-span-12 md:col-span-3">
        <FloatLabel variant="on">
          <InputText id="certidao_nascimento" v-model="modelValue.certidao_nascimento" v-normalize-text="'ALPHANUM'" fluid />
          <label for="certidao_nascimento">Certidão de Nascimento</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-3">
        <FloatLabel variant="on">
          <InputText id="pis_pasep" v-model="modelValue.pis_pasep" mask="999.99999.99-9" fluid />
          <label for="pis_pasep">PIS/PASEP</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-3">
        <FloatLabel variant="on">
          <InputMask id="telefone" v-model="modelValue.telefone" mask="(99) 99999-9999" fluid />
          <label for="telefone">Telefone</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-6">
        <FloatLabel variant="on">
          <InputText id="email" v-model="modelValue.email" v-normalize-text="'FREE'" fluid />
          <label for="email">E-mail</label>
        </FloatLabel>
      </div>
    </FormGrid>
  </FormSection>
</template>
