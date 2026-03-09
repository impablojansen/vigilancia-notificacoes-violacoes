<script setup lang="ts">
import { ref } from 'vue'

const nome = ref('')
const nasc = ref<Date | null>(null)
</script>

<template>
    <div class="card flex justify-center">
        <Stepper value="1" class="w-full md:w-30rem">
            <StepList>
                <Step value="1">Identificação</Step>
                <Step value="2">Violação</Step>
                <Step value="3">Encaminhamento</Step>
            </StepList>

            <StepPanels>
                <StepPanel v-slot="{ activateCallback }" value="1">
                    <div class="flex flex-col gap-4">
                        <h3 class="text-lg">Dados do Notificado</h3>

                        <FloatLabel variant="on">
                            <InputText id="nome" v-model="nome" fluid />
                            <label for="nome">Nome Completo</label>
                        </FloatLabel>

                        <div class="flex gap-2">
                            <DatePicker v-model="nasc" placeholder="Data de Nascimento" fluid />
                        </div>
                    </div>

                    <div class="flex pt-6 justify-end">
                        <Button
                            label="Próximo"
                            icon="pi pi-arrow-right"
                            iconPos="right"
                            @click="activateCallback('2')"
                        />
                    </div>
                </StepPanel>
            </StepPanels>
        </Stepper>
    </div>
</template>
