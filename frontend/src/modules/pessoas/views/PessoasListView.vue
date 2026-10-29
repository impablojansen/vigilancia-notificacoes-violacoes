
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";

import Paginator from "primevue/paginator";

import { vNormalizeText } from "@/shared/utils/normalizarTexto";

import {
  pessoasMock,
  type PessoaResumo,
} from "@/modules/pessoas/mock/pessoas.mock";

type CriterioBusca = "nome" | "cpf";

const router = useRouter();

// Critérios de pesquisa
const criterios = [
  { label: "Nome", value: "nome" },
  { label: "CPF", value: "cpf" },
];

const criterioBusca = ref<CriterioBusca>("nome");
const termoBusca = ref("");

// Estado da pesquisa
const resultados = ref<PessoaResumo[]>([]);
const totalResultados = ref(0);
const buscaExecutada = ref(false);
const erroBusca = ref("");

// Paginação
const primeiroRegistro = ref(0);
const registrosPorPagina = 10;

const resultadosPaginados = computed(() =>
  resultados.value.slice(
    primeiroRegistro.value,
    primeiroRegistro.value + registrosPorPagina
  )
);

// Normalização utilizada na comparação dos nomes.
// Permite comparar nomes dos mocks independentemente
// de maiúsculas, minúsculas e acentos.
function normalizarNome(valor: string): string {
  return valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleUpperCase("pt-BR")
    .trim()
    .replace(/\s+/g, " ");
}

function somenteNumeros(valor: string): string {
  return valor.replace(/\D/g, "");
}

// Limpa os resultados da pesquisa anterior.
function limparResultados() {
  resultados.value = [];
  totalResultados.value = 0;
  primeiroRegistro.value = 0;
  buscaExecutada.value = false;
  erroBusca.value = "";
}

// Quando o usuário altera o critério,
// o termo também é limpo.
watch(criterioBusca, () => {
  termoBusca.value = "";
  limparResultados();
});

// Ao modificar o termo, os resultados anteriores
// deixam de corresponder à pesquisa atual.
watch(termoBusca, () => {
  limparResultados();
});

// Pesquisa provisória nos dados simulados.
// Futuramente será substituída por consulta à API.
function buscarPessoas() {
  limparResultados();

  const termo = termoBusca.value.trim();

  // Validação básica do termo pesquisado.
  if (criterioBusca.value === "nome") {
    if (normalizarNome(termo).length < 3) {
      erroBusca.value =
        "Digite pelo menos 3 caracteres do nome.";
      return;
    }
  } else {
    if (somenteNumeros(termo).length !== 11) {
      erroBusca.value =
        "Informe os 11 dígitos do CPF.";
      return;
    }
  }

  const encontrados = pessoasMock.filter((pessoa) => {
    // Pesquisa exata por CPF.
    if (criterioBusca.value === "cpf") {
      return (
        somenteNumeros(pessoa.cpf ?? "") ===
        somenteNumeros(termo)
      );
    }

    // Pesquisa por nome civil ou social.
    const nomePesquisado = normalizarNome(termo);

    const correspondeNome = normalizarNome(
      pessoa.nome
    ).includes(nomePesquisado);

    const correspondeNomeSocial = pessoa.nomeSocial
      ? normalizarNome(pessoa.nomeSocial).includes(
          nomePesquisado
        )
      : false;

    return correspondeNome || correspondeNomeSocial;
  });

  // Ordenação estável por nome e identificador.
  const ordenados = encontrados.sort(
    (a, b) =>
      a.nome.localeCompare(b.nome, "pt-BR") ||
      a.id - b.id
  );

  resultados.value = ordenados;
  totalResultados.value = ordenados.length;

  // Toda pesquisa começa na primeira página.
  primeiroRegistro.value = 0;
  buscaExecutada.value = true;
}

// Formatação das informações exibidas
function formatarData(data: string | null): string {
  if (!data) return "Não informada";

  const partes = data.split("-");

  if (partes.length !== 3) {
    return "Não informada";
  }

  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function cpfResumido(cpf: string | null): string {
  if (!cpf) return "CPF não informado";

  const numeros = somenteNumeros(cpf);

  if (numeros.length !== 11) {
    return "CPF não disponível";
  }

  return `CPF: ***.***.***-${numeros.slice(-2)}`;
}

// Navegação
function cadastrarPessoa() {
  router.push({ name: "pessoas-create" });
}

function novaNotificacao(id: number) {
  router.push({
    name: "notificacao-create",
    query: {
      pessoaId: String(id),
    },
  });
}
</script>

<template>
  <div class="mx-auto max-w-5xl space-y-6">
    <!-- Cabeçalho -->
    <header
      class="flex flex-col gap-4
             sm:flex-row sm:items-start
             sm:justify-between"
    >
      <div>
        <h1
          class="text-2xl font-semibold
                 tracking-tight text-surface-900"
        >
          Localizar pessoa
        </h1>

        <p class="mt-1 text-sm text-surface-600">
          Pesquise o cadastro antes de registrar
          uma nova notificação.
        </p>
      </div>

      <Button
        type="button"
        label="Cadastrar pessoa"
        icon="pi pi-user-plus"
        severity="secondary"
        outlined
        @click="cadastrarPessoa"
      />
    </header>

    <!-- Pesquisa -->
    <section
      class="rounded-xl border border-surface-200
             bg-white p-4 sm:p-6"
    >
      <form
        class="flex flex-col gap-4"
        @submit.prevent="buscarPessoas"
      >
        <h2
          class="text-base font-semibold text-surface-900"
        >
          Pesquisar cadastro
        </h2>

        <div
          class="grid grid-cols-1 items-end
                 gap-3 sm:grid-cols-12"
        >
          <!-- Critério de pesquisa -->
          <div class="sm:col-span-3">
            <label
              for="criterio_busca"
              class="mb-2 block text-sm font-medium"
            >
              Buscar por
            </label>

            <Select
              id="criterio_busca"
              v-model="criterioBusca"
              :options="criterios"
              optionLabel="label"
              optionValue="value"
              fluid
            />
          </div>

          <!-- Campo de pesquisa -->
          <div class="sm:col-span-6">
            <label
              for="termo_busca"
              class="mb-2 block text-sm font-medium"
            >
              {{
                criterioBusca === "cpf"
                  ? "CPF da pessoa"
                  : "Nome da pessoa"
              }}
            </label>

            <!-- Busca por nome -->
            <InputText
              v-if="criterioBusca === 'nome'"
              id="termo_busca"
              v-model="termoBusca"
              v-normalize-text="'ALPHA'"
              type="search"
              placeholder="Nome civil ou social"
              :invalid="!!erroBusca"
              :aria-describedby="
                erroBusca ? 'erro-busca' : undefined
              "
              autocomplete="off"
              fluid
            />

            <!-- Busca por CPF -->
            <InputMask
              v-else
              id="termo_busca"
              v-model="termoBusca"
              mask="999.999.999-99"
              placeholder="000.000.000-00"
              inputmode="numeric"
              :invalid="!!erroBusca"
              :aria-describedby="
                erroBusca ? 'erro-busca' : undefined
              "
              autocomplete="off"
              fluid
            />
          </div>

          <!-- Executar pesquisa -->
          <div class="sm:col-span-3">
            <Button
              type="submit"
              label="Buscar"
              icon="pi pi-search"
              fluid
            />
          </div>
        </div>

        <!-- Mensagem de validação da busca -->
        <small
          v-if="erroBusca"
          id="erro-busca"
          role="alert"
          class="text-sm text-red-600"
        >
          {{ erroBusca }}
        </small>
      </form>
    </section>

    <!-- Estado inicial -->
    <section
      v-if="!buscaExecutada && !erroBusca"
      class="rounded-xl bg-surface-100 p-6
             text-center text-sm text-surface-600"
    >
      <i
        class="pi pi-search mb-3 block
               text-xl text-surface-400"
      />

      Pesquise pelo nome ou CPF para localizar
      um cadastro existente.
    </section>

    <!-- Resultados -->
    <section
      v-if="buscaExecutada"
      class="overflow-hidden rounded-xl border
             border-surface-200 bg-white"
    >
      <!-- Cabeçalho dos resultados -->
      <div
        class="flex flex-wrap items-center
               justify-between gap-2
               border-b border-surface-200
               px-4 py-4 sm:px-6"
      >
        <h2 class="text-base font-semibold">
          Resultados da pesquisa
        </h2>

        <span class="text-sm text-surface-500">
          {{ totalResultados }}
          {{
            totalResultados === 1
              ? "pessoa encontrada"
              : "pessoas encontradas"
          }}
        </span>
      </div>

      <!-- Nenhum resultado encontrado -->
      <div
        v-if="resultados.length === 0"
        class="space-y-4 px-4 py-10 text-center"
      >
        <p class="font-medium text-surface-800">
          Nenhuma pessoa localizada
        </p>

        <p class="text-sm text-surface-600">
          Confira os dados pesquisados antes de
          criar um novo cadastro.
        </p>

        <Button
          type="button"
          label="Cadastrar pessoa"
          icon="pi pi-user-plus"
          outlined
          @click="cadastrarPessoa"
        />
      </div>

      <!-- Pessoas encontradas -->
      <div
        v-else
        class="divide-y divide-surface-200"
      >
        <article
          v-for="pessoa in resultadosPaginados"
          :key="pessoa.id"
          class="px-4 py-5 sm:px-6"
        >
          <div
            class="flex flex-col gap-4
                   sm:flex-row sm:items-start
                   sm:justify-between"
          >
            <div class="min-w-0 space-y-2">
              <h3
                class="text-base font-semibold
                       text-surface-900"
              >
                {{ pessoa.nome }}
              </h3>

              <p
                v-if="pessoa.nomeSocial"
                class="text-sm text-surface-600"
              >
                Nome social: {{ pessoa.nomeSocial }}
              </p>

              <div
                class="flex flex-wrap gap-x-4
                       gap-y-1 text-sm text-surface-600"
              >
                <span>
                  Nascimento:
                  {{ formatarData(pessoa.data_nascimento) }}
                </span>

                <span>
                  {{ cpfResumido(pessoa.cpf) }}
                </span>
              </div>
            </div>

            <!-- Iniciar notificação -->
            <Button
              type="button"
              label="Nova notificação"
              icon="pi pi-plus-circle"
              class="w-full sm:w-auto"
              @click="novaNotificacao(pessoa.id)"
            />
          </div>

          <!-- Informações complementares -->
          <details class="mt-4">
            <summary
              class="cursor-pointer text-sm font-medium
                     text-primary-700"
            >
              Conferir outros dados
            </summary>

            <dl
              class="mt-3 grid grid-cols-1
                     gap-3 rounded-lg bg-surface-50
                     p-4 text-sm sm:grid-cols-2"
            >
              <div>
                <dt class="text-surface-500">
                  Nome da mãe
                </dt>
                <dd class="mt-1 text-surface-800">
                  {{
                    pessoa.nome_mae || "Não informado"
                  }}
                </dd>
              </div>

              <div>
                <dt class="text-surface-500">
                  Bairro
                </dt>
                <dd class="mt-1 text-surface-800">
                  {{
                    pessoa.bairro || "Não informado"
                  }}
                </dd>
              </div>

              <div>
                <dt class="text-surface-500">
                  Telefone
                </dt>
                <dd class="mt-1 text-surface-800">
                  {{
                    pessoa.telefone || "Não informado"
                  }}
                </dd>
              </div>
            </dl>
          </details>
        </article>
      </div>

      <!-- Paginação -->
      <div
        v-if="totalResultados > registrosPorPagina"
        class="border-t border-surface-200
               px-2 py-2 sm:px-4"
      >
        <Paginator
          v-model:first="primeiroRegistro"
          :rows="registrosPorPagina"
          :totalRecords="totalResultados"
          template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="Página {currentPage} de {totalPages}"
        />
      </div>
    </section>
  </div>
</template>
