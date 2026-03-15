<script setup lang="ts">
import FormSection from "@/shared/components/form/FormSection.vue";
import FormGrid from "@/shared/components/form/FormGrid.vue";

import { STATUS_ACOMPANHAMENTO_OPTIONS } from "@/modules/notificacoes/constants/statusAcompanhamento";
import { LOCAIS_ACOMPANHAMENTO_OPTIONS } from "@/modules/notificacoes/constants/locaisAcompanhamento";
import { SERVICOS } from "@/modules/notificacoes/constants/servicos";

const modelValue = defineModel({ type: Object, required: true });
</script>

<template>
  <FormSection legend="Status do Acompanhamento">
    <FormGrid>
      <div class="col-span-12 md:col-span-4">
        <Select
          v-model="modelValue.status_acompanhamento"
          :options="STATUS_ACOMPANHAMENTO_OPTIONS"
          optionLabel="label"
          optionValue="value"
          placeholder="Acompanhamento do caso"
          showClear
          fluid
        />
      </div>

      <div class="col-span-12 md:col-span-8">
        <Select
          v-model="modelValue.local_acompanhamento"
          :options="LOCAIS_ACOMPANHAMENTO_OPTIONS"
          optionLabel="label"
          optionValue="value"
          placeholder="Local de acompanhamento do caso"
          showClear
          fluid
        />
      </div>

      <div class="col-span-12">
        <Select
          v-model="modelValue.servico_inserido"
          :options="SERVICOS"
          filter
          showClear
          fluid
          class="w-full min-h-[42px]"
        >
          <template #value="slotProps">
            <div class="truncate w-full text-left">
              <span v-if="slotProps.value">
                {{ slotProps.value }}
              </span>
              <span v-else class="text-gray-400">
                Caso o usuário esteja em acompanhamento, indique o serviço
              </span>
            </div>
          </template>

          <template #option="slotProps">
            <div class="whitespace-normal leading-tight py-1">
              {{ slotProps.option }}
            </div>
          </template>
        </Select>
      </div>

      <div class="col-span-12 md:col-span-4">
        <FloatLabel variant="on">
          <DatePicker
            id="data_encerramento"
            v-model="modelValue.data_encerramento"
            dateFormat="dd/mm/yy"
            showIcon
            showButtonBar
            fluid
          />
          <label for="data_encerramento">Data de encerramento</label>
        </FloatLabel>
      </div>
    </FormGrid>
  </FormSection>
</template>
