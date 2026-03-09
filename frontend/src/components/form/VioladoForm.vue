<script setup lang="ts">
import { computed, watch } from 'vue'
const modelValue = defineModel({ type: Object, required: true });
defineEmits(['next', 'back']);

const opcoesDeficiencia: Record<string, string[]> = {
    'Física': [
        'Paraplegia',
        'Tetraplegia'
    ],
    'Visual': [
        'Cegueira',
        'Baixa Visão'
    ],
    'Auditiva': [
        'Surdez',
        'Deficiência auditiva parcial'
    ],
    'Intelectual': [
        'Deficiência intelectual',
        'Síndrome de Down'
    ]
}

const opcoesDeficienciaSelecionada = computed(() => {
    return opcoesDeficiencia[modelValue.value.tipo_deficiencia] || []
})

watch(() => modelValue.value.is_migrante, (val) => {
  if (!val) {
    modelValue.value.nacionalidade = ''
    modelValue.value.naturalidade = ''
  }
})

watch(() => modelValue.value.is_pcd, () => {
   modelValue.value.tipo_deficiencia = null
  modelValue.value.deficiencia = null
})
</script>

<template>

  <div class="flex flex-col gap-6">
    <h3 class="text-lg font-semibold text-surface-700">
      Dados da Pessoa Violada
    </h3>
    <Fieldset legend="Identificação">
        <div class="grid grid-cols-12 gap-4">
            <!-- nome -->
            <div class="col-span-12 md:col-span-3">
                <FloatLabel variant="on">
                    <InputText id="nome" v-model="modelValue.nome" fluid />
                    <label for="nome">Nome Completo</label>
                </FloatLabel>
            </div>

            <!-- nome social -->
            <div class="col-span-12 md:col-span-3">
                <FloatLabel variant="on">
                <InputText id="nome_social" v-model="modelValue.nome_social" fluid />
                <label for="nome_social">Nome Social</label>
                </FloatLabel>
            </div>

            <!-- nascimento -->
            <div class="col-span-12 md:col-span-3">
                <DatePicker
                v-model="modelValue.data_nasc"
                placeholder="Data de Nascimento"
                dateFormat="dd/mm/yy"
                showIcon
                showButtonBar
                fluid
                />
            </div>

            <!-- nome da mãe -->
            <div class="col-span-12 md:col-span-3">
                <FloatLabel variant="on">
                    <InputText id="nome_mae" v-model="modelValue.nome_mae" fluid />
                    <label for="nome_mae">Nome da Mãe</label>
                </FloatLabel>
            </div>

        </div>
    </Fieldset>

    <Fieldset legend="Documentação">
        <div class="grid grid-cols-12 gap-4">
            <!-- cpf -->
            <div class="col-span-12 md:col-span-3">
                <InputMask
                v-model="modelValue.cpf"
                mask="999.999.999-99"
                placeholder="CPF"
                fluid
                />
            </div>

            <!-- nis -->
            <div class="col-span-12 md:col-span-3">
                <InputMask
                v-model="modelValue.nis"
                mask="999.99999.99-9"
                placeholder="NIS"
                fluid
                />
            </div>

            <!-- cartão do SUS -->
            <div class="col-span-12 md:col-span-3">
                <InputMask
                v-model="modelValue.cartao_sus"
                mask="999 9999 9999 9999"
                placeholder="Cartão do SUS"
                fluid
                />
            </div>

            <!-- certidão de nascimento -->
            <div class="col-span-12 md:col-span-3">
                <FloatLabel variant="on">
                    <InputText id="certidao_nasc" v-model="modelValue.certidao_nasc" fluid />
                    <label for="certidao_nasc">Certidão de Nascimento</label>
                </FloatLabel>
            </div>
        </div>
    </Fieldset>

    <Fieldset legend="Caracterização Social">
        <div class="grid grid-cols-12 gap-4">

            <!-- sexo -->
            <div class="col-span-12 md:col-span-3">
                <Select
                v-model="modelValue.sexo"
                :options="['Masculino','Feminino', 'Sem Informação']"
                placeholder="Sexo"
                fluid
                />
            </div>

            <!-- ciclo de vida -->
            <div class="col-span-12 md:col-span-3">
                <Select
                v-model="modelValue.ciclo_vida"
                :options="['00 a 06 anos','06 a 12 anos','12 a 17 anos','18 a 29 anos','30 a 59 anos','60 anos ou mais']"
                placeholder="Ciclo de Vida"
                fluid
                />
            </div>

            <!-- raça -->
            <div class="col-span-12 md:col-span-3">
                <Select
                v-model="modelValue.raca"
                :options="['Branco','Negro','Pardo','Indígena','Amarelo','Sem Informação']"
                placeholder="Raça/Etnia"
                fluid
                />
            </div>

            <!-- estado civil -->
            <div class="col-span-12 md:col-span-3">
                <Select
                v-model="modelValue.estado_civil"
                :options="['Solteiro(a)','Casado(a)','Separado(a)','Divorciado(a)','União Estável','Viúvo(a)', 'Sem informação']"
                placeholder="Estado Civil"
                fluid
                />
            </div>

            <!-- grau de instrução -->
            <div class="col-span-12 md:col-span-4">
                <Select
                v-model="modelValue.grau_instrucao"
                :options="[
                    'Sem instrução',
                    'Analfabeto',
                    'Alfabetizado',
                    'Fundamental - Incompleto',
                    'Fundamental - Completo',
                    'Médio - Incompleto',
                    'Médio - Completo',
                    'Superior - Incompleto',
                    'Superior - Completo',
                    'Pós graduação',
                    'Mestrado',
                    'Doutorado',
                    'Sem informação'
                    ]"
                placeholder="Grau de Instrução"
                fluid
                />
            </div>

            <!-- segmento lgbtqiapn -->
            <div class="col-span-12 md:col-span-4">
                <Select
                v-model="modelValue.segmento_lgbt"
                :options="['LGBTQIAPN+', 'Não LGBTQIAPN+', 'Sem informação']"
                placeholder="Segmento LGBTQIAP+"
                fluid
                />
            </div>

            <!-- identidade de genero -->
            <div class="col-span-12 md:col-span-4">
                <Select
                v-model="modelValue.identidade_genero"
                :options="[
                    'Agênero',
                    'Bigênero',
                    'Gênero-fluido',
                    'Gênero não-binário',
                    'Gênero neutro',
                    'Homem cisgênero',
                    'Homem transexual',
                    'Homem transgênero',
                    'Mulher cisgênero',
                    'Mulher transexual',
                    'Mulher transgênero',
                    'Poligênero',
                    'Sem informação'
                    ]"
                placeholder="Identidade de Gênero"
                fluid
                />
            </div>

        </div>

    </Fieldset>

    <Fieldset legend="Segmento PCD">
        <div class="grid grid-cols-12 gap-4">
            <!-- pcd -->
            <div class="col-span-12 md:col-span-3 flex items-center gap-2">
                <Checkbox v-model="modelValue.is_pcd" binary />
                <label>É PCD?</label>
            </div>

            <!-- tipo de deficiencia -->
            <div class="col-span-12 md:col-span-3">
                <Select
                v-model="modelValue.tipo_deficiencia"
                placeholder="Tipo de Deficiência"
                :options = "['Física', 'Visual', 'Auditiva', 'Intelectual']"
                :disabled="!modelValue.is_pcd"
                :class="{ 'opacity-50': !modelValue.is_pcd }"
                showClear
                fluid
                />
            </div>

            <!-- deficiencia -->
            <div class="col-span-12 md:col-span-6">
                <Select
                v-model="modelValue.deficiencia"
                :options="opcoesDeficienciaSelecionada"
                placeholder="Deficiência"
                :disabled="!modelValue.tipo_deficiencia"
                :class="{ 'opacity-50': !modelValue.tipo_deficiencia }"
                filter
                showClear
                fluid
                />
            </div>

        </div>
    </Fieldset>

    <Fieldset legend="Situações específicas (melhorar esse título)">
        <div class="grid grid-cols-12 gap-4">

            <!-- migrante -->
            <div class="col-span-12 md:col-span-4 flex items-center gap-2">
                <Checkbox v-model="modelValue.is_migrante" binary />
                <label>É migrante?</label>
            </div>

            <!-- nacionalidade -->
            <div class="col-span-12 md:col-span-4">
            <InputText
                v-model="modelValue.nacionalidade"
                placeholder="País de origem"
                :disabled="!modelValue.is_migrante"
                :class="{ 'opacity-50': !modelValue.is_migrante }"
                fluid
            />
            </div>

            <!-- naturalidade -->
            <div class="col-span-12 md:col-span-4">
            <InputText
                v-model="modelValue.naturalidade"
                placeholder="Município/Estado"
                :disabled="!modelValue.is_migrante"
                :class="{ 'opacity-50': !modelValue.is_migrante }"
                fluid
            />
            </div>

            <!-- gestante -->
            <div class="col-span-12 md:col-span-4">
                <Select
                v-model="modelValue.gestante"
                :options="['Sim', 'Não', 'Sem informação']"
                placeholder="A vítima encontra-se gestante?"
                fluid
                />
            </div>

            <!-- povos originais e gpte -->
            <div class="col-span-12 md:col-span-8">
                <Select
                v-model="modelValue.gpte"
                :options="[
                    'Agricultores familiares',
                    'Catadores de materiais recicláveis',
                    'Ciganos',
                    'Cipozeiros',
                    'Extrativistas',
                    'Família acampada',
                    'Família de presos do sistema carcerário',
                    'Indígenas',
                    'Pescadores Artesanais',
                    'Pessoas em situação de rua',
                    'Povos de Terreiro',
                    'Quilombolas'
                    ]"
                placeholder="Povos Originários e Grupos Populacionais Tradicionais ou Especificos"
                filter
                showClear
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
