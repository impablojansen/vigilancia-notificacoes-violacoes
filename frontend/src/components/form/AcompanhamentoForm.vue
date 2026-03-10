<script setup lang="ts">
import { computed, watch } from "vue";
import { SERVICOS } from "@/constants/servicos";
const modelValue = defineModel({ type: Object, required: true });

watch(
  () => modelValue.value?.situacao_ruptura_psr,
  (val) => {
    if (val !== "Outro") {
      modelValue.value.outra_situacao = "";
    }
  },
);

defineEmits(["next", "back"]);
</script>

<template>
  <div class="flex flex-col gap-6">
    <h3 class="text-lg font-semibold text-surface-700">
      Dados do Acompanhamento
    </h3>
    <Fieldset legend="Status do Acompanhamento">
      <div class="grid grid-cols-12 gap-4">
        <!-- acompanhamento do caso -->
        <div class="col-span-12 md:col-span-4">
          <Select
            v-model="modelValue.acompanhamento"
            :options="[
              'Caso concluído',
              'Caso em acompanhamento',
              'Caso não acompanhado',
              'Sem informação',
            ]"
            placeholder="Acompanhamento do caso"
            showClear
            fluid
          />
        </div>

        <!-- local de acompanhamento -->
        <div class="col-span-12 md:col-span-8">
          <Select
            v-model="modelValue.local_acompanhamento"
            :options="[
              'Centro de Convivência',
              'Centro Dia',
              'Centro Pop',
              'CRAS',
              'CREAS',
              'Família Acolhedora',
              'Órgão Gestor da Assistência Social',
              'Outra Unidade para oferta do SCFV',
              'Unidade de Acolhimento',
            ]"
            placeholder="Local de Acompanhamento do caso"
            showClear
            fluid
          />
        </div>

        <!-- serviço inserido -->
        <div class="col-span-12 md:col-span-12">
          <Select
            v-model="modelValue.servico_inserido"
            :options="SERVICOS"
            filter
            showClear
            fluid
            class="w-full min-h-[42px]"
          >
            <!-- valor selecionado -->
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

            <!-- opções -->
            <template #option="slotProps">
              <div class="whitespace-normal leading-tight py-1">
                {{ slotProps.option }}
              </div>
            </template>
          </Select>
        </div>
      </div>
    </Fieldset>
    <Fieldset
      legend="Em casos de RUPTURA DE VÍNCULOS e PESSOA EM SITUAÇÃO DE RUA, de acordo com o caso, pode-se selecionar os itens abaixo caso a notificação esteja com status de CASO EM ACOMPANHAMENTO ou CASO CONCLUÍDO:"
    >
      <div class="grid grid-cols-12 gap-4">
        <!-- situação em ruptura de vinculos ou PSR -->
        <div class="col-span-12 md:col-span-6">
          <Select
            v-model="modelValue.situacao_ruptura_psr"
            :options="[
              'Houve acolhimento',
              'Houve reinserção na família',
              'Em situação de rua',
              'Outro',
            ]"
            placeholder="Situação do caso (Ruptura ou PSR)"
            showClear
            fluid
          />
        </div>
        <div class="col-span-12 md:col-span-6">
          <InputText
            v-model="modelValue.outra_situacao"
            placeholder="Especificar a situação"
            :disabled="modelValue.situacao_ruptura_psr !== 'Outro'"
            :class="{
              'opacity-50': modelValue.situacao_ruptura_psr !== 'Outro',
            }"
            fluid
          />
        </div>
      </div>
    </Fieldset>
  </div>
  <div class="flex pt-6 justify-between">
    <Button label="Voltar" severity="secondary" @click="$emit('back')" />
    <Button label="Próximo" @click="$emit('next')" />
  </div>
</template>
