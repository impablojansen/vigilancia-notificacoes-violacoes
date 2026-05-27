<script setup lang="ts">
import FormSection from "@/shared/components/form/FormSection.vue";
import FormGrid from "@/shared/components/form/FormGrid.vue";

import { SIM_NAO_SEM_INFO_OPTIONS } from "@/modules/notificacoes/constants/respostasPadrao";

const modelValue = defineModel<{
    lesao_autoprovocada?: string | null;
    ocorreu_outras_vezes?: string | null;
    vitima_gestante?: string | null;
}>({ required: true })

</script>

<template>
    <FormSection legend="Dados da Violação">
        <FormGrid>
            <div class="col-span-12 md:col-span-4">
                <FloatLabel variant="on">
                    <Select id="lesao_autoprovocada" v-model="modelValue.lesao_autoprovocada"
                        :options="SIM_NAO_SEM_INFO_OPTIONS" optionLabel="label" optionValue="value" fluid />
                    <label for="lesao_autoprovocada">A lesão foi autoprovocada?</label>
                </FloatLabel>
            </div>

            <div class="col-span-12 md:col-span-4">
                <FloatLabel variant="on">
                    <Select id="ocorreu_outras_vezes" v-model="modelValue.ocorreu_outras_vezes"
                        :options="SIM_NAO_SEM_INFO_OPTIONS" optionLabel="label" optionValue="value" fluid />
                    <label for="ocorreu_outras_vezes">Ocorreu outras vezes?</label>
                </FloatLabel>
            </div>

            <div class="col-span-12 md:col-span-4">
                <FloatLabel variant="on">
                    <Select id="vitima_gestante" v-model="modelValue.vitima_gestante"
                        :options="SIM_NAO_SEM_INFO_OPTIONS" optionLabel="label" optionValue="value" fluid />
                    <label for="vitima_gestante">A vítima se encontra gestante?</label>
                </FloatLabel>
            </div>
        </FormGrid>
    </FormSection>
</template>