<script setup lang="ts">
import { ref } from "vue";
import FormSection from "@/shared/components/form/FormSection.vue";
import FormGrid from "@/shared/components/form/FormGrid.vue";

const modelValue = defineModel({ type: Object, required: true });

</script>

<template>
    <FormSection legend="Campo exclusivo para Unidades de Saúde">
        <FormGrid>
            <div class="col-span-12 md:col-span-4">
                <FloatLabel variant="on">
                    <InputText id="responsavel_preenchimento" v-model="modelValue.responsavel_preenchimento" fluid />
                    <label for="responsavel_preenchimento">
                        Nome da Unidade Notificadora
                    </label>
                </FloatLabel>
            </div>

            <div class="col-span-12 md:col-span-4">
                <FloatLabel variant="on">
                    <InputText id="responsavel_preenchimento" v-model="modelValue.responsavel_preenchimento" fluid />
                    <label for="responsavel_preenchimento">
                        Código da Unidade
                    </label>
                </FloatLabel>
            </div>

            <div class="col-span-12 md:col-span-4">
                <FloatLabel variant="on">
                    <InputText id="responsavel_preenchimento" v-model="modelValue.responsavel_preenchimento" fluid />
                    <label for="responsavel_preenchimento">
                        Unidade de Saúde
                    </label>
                </FloatLabel>
            </div>

            <div class="col-span-12 md:col-span-4">
                <FloatLabel variant="on">
                    <InputText id="responsavel_preenchimento" v-model="modelValue.responsavel_preenchimento" fluid />
                    <label for="responsavel_preenchimento">
                        Código (CNES)
                    </label>
                </FloatLabel>
            </div>
        </FormGrid>
    </FormSection>
</template>