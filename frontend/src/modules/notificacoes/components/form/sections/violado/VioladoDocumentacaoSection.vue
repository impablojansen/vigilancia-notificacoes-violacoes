<script setup lang="ts">
import FormSection from "@/shared/components/form/FormSection.vue";
import FormGrid from "@/shared/components/form/FormGrid.vue";

const modelValue = defineModel({ type: Object, required: true });
</script>

<template>
  <FormSection legend="Documentação">
    <FormGrid>
      <div class="col-span-12 md:col-span-3">
        <InputMask
          v-model="modelValue.cpf"
          mask="999.999.999-99"
          placeholder="CPF"
          fluid
        />
      </div>

      <div class="col-span-12 md:col-span-3">
        <InputMask
          v-model="modelValue.nis"
          mask="999.99999.99-9"
          placeholder="NIS"
          fluid
        />
      </div>

      <div class="col-span-12 md:col-span-3">
        <InputMask
          v-model="modelValue.cartao_sus"
          mask="999 9999 9999 9999"
          placeholder="Cartão do SUS"
          fluid
        />
      </div>

      <div class="col-span-12 md:col-span-3">
        <FloatLabel variant="on">
          <InputText
            id="certidao_nascimento"
            v-model="modelValue.certidao_nascimento"
            fluid
          />
          <label for="certidao_nascimento">Certidão de Nascimento</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-3">
        <FloatLabel variant="on">
          <InputText id="pis_pasep" v-model="modelValue.pis_pasep" fluid />
          <label for="pis_pasep">PIS/PASEP</label>
        </FloatLabel>
      </div>

      <div class="col-span-12 md:col-span-3">
        <InputMask
          v-model="modelValue.telefone"
          mask="(99) 99999-9999"
          placeholder="Telefone"
          fluid
        />
      </div>

      <div class="col-span-12 md:col-span-6">
        <FloatLabel variant="on">
          <InputText id="email" v-model="modelValue.email" fluid />
          <label for="email">E-mail</label>
        </FloatLabel>
      </div>
    </FormGrid>
  </FormSection>
</template>
