<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

interface PessoaResumo {
  id: number;
  nome: string;
  nomeSocial: string | null;
  dataNascimento: string | null;
  cpf: string | null;
  sexo: string | null;
  telefone: string | null;
  bairro: string | null;
  totalNotificacoes: number;
  ultimaNotificacaoEm: string | null;
}

const router = useRouter();
const termoBusca = ref("");

const pessoas = ref<PessoaResumo[]>([
  {
    id: 1,
    nome: "Maria da Silva",
    nomeSocial: null,
    dataNascimento: "2012-04-18",
    cpf: null,
    sexo: "FEMININO",
    telefone: "(85) 99999-1111",
    bairro: "Centro",
    totalNotificacoes: 2,
    ultimaNotificacaoEm: "2026-05-10",
  },
  {
    id: 2,
    nome: "João Pereira",
    nomeSocial: null,
    dataNascimento: "2009-11-02",
    cpf: "123.456.789-00",
    sexo: "MASCULINO",
    telefone: null,
    bairro: "Coqueiral",
    totalNotificacoes: 1,
    ultimaNotificacaoEm: "2026-04-22",
  },
  {
    id: 3,
    nome: "Ana Souza",
    nomeSocial: "Ana",
    dataNascimento: null,
    cpf: null,
    sexo: "FEMININO",
    telefone: null,
    bairro: "Guaribas",
    totalNotificacoes: 0,
    ultimaNotificacaoEm: null,
  },
]);

const pessoasFiltradas = computed(() => {
  const termo = termoBusca.value.trim().toLowerCase();

  if (!termo) return pessoas.value;

  return pessoas.value.filter((pessoa) => {
    return [
      pessoa.nome,
      pessoa.nomeSocial,
      pessoa.cpf,
      pessoa.bairro,
      pessoa.telefone,
    ]
      .filter(Boolean)
      .some((valor) => String(valor).toLowerCase().includes(termo));
  });
});

function irParaNovaPessoa() {
  router.push("/pessoas/nova");
}

function editarPessoa(id: number) {
  router.push(`/pessoas/${id}/editar`);
}

function novaNotificacaoParaPessoa(id: number) {
  router.push({
    path: "/notificacoes/nova",
    query: { pessoaId: String(id) },
  });
}

function formatarData(data: string | null) {
  if (!data) return "Não informado";

  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}
</script>

<template>
  <div class="space-y-6">
    <section
      class="rounded-2xl border border-surface-200 bg-white p-4 shadow-sm lg:p-6"
    >
      <div
        class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between"
      >
        <div class="min-w-0">
          <h1 class="text-xl font-semibold text-surface-900 lg:text-2xl">
            Pessoas
          </h1>
          <p class="mt-1 text-sm text-surface-600">
            Cadastre e consulte pessoas vinculadas às notificações municipais.
          </p>
        </div>

        <Button
          label="Cadastrar pessoa"
          icon="pi pi-plus"
          @click="irParaNovaPessoa"
        />
      </div>

      <div class="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div class="rounded-xl border border-surface-200 bg-surface-50 p-4">
          <div class="text-sm text-surface-500">Total de pessoas</div>
          <div class="mt-1 text-2xl font-semibold">{{ pessoas.length }}</div>
        </div>

        <div class="rounded-xl border border-surface-200 bg-surface-50 p-4">
          <div class="text-sm text-surface-500">Com notificações</div>
          <div class="mt-1 text-2xl font-semibold">
            {{ pessoas.filter((p) => p.totalNotificacoes > 0).length }}
          </div>
        </div>

        <div class="rounded-xl border border-surface-200 bg-surface-50 p-4">
          <div class="text-sm text-surface-500">Sem notificações</div>
          <div class="mt-1 text-2xl font-semibold">
            {{ pessoas.filter((p) => p.totalNotificacoes === 0).length }}
          </div>
        </div>
      </div>
    </section>

    <section
      class="rounded-2xl border border-surface-200 bg-white p-4 shadow-sm lg:p-6"
    >
      <div class="flex flex-col gap-3 md:flex-row md:items-center">
        <div class="w-full md:max-w-md">
          <label class="mb-2 block text-sm font-medium text-surface-700">
            Buscar pessoa
          </label>
          <InputText
            v-model="termoBusca"
            placeholder="Nome, CPF, telefone, bairro..."
            class="w-full"
          />
        </div>
      </div>

      <div class="mt-5">
        <div
          v-if="!pessoasFiltradas.length"
          class="rounded-xl border border-dashed border-surface-300 p-8 text-center"
        >
          <div class="text-base font-medium text-surface-700">
            Nenhuma pessoa encontrada
          </div>
          <p class="mt-2 text-sm text-surface-500">
            Ajuste a busca ou cadastre uma nova pessoa.
          </p>

          <div class="mt-4">
            <Button
              label="Cadastrar pessoa"
              icon="pi pi-plus"
              outlined
              @click="irParaNovaPessoa"
            />
          </div>
        </div>

        <div
          v-else
          class="grid grid-cols-1 gap-4 xl:grid-cols-2"
        >
          <article
            v-for="pessoa in pessoasFiltradas"
            :key="pessoa.id"
            class="rounded-2xl border border-surface-200 bg-white p-4 shadow-sm transition hover:border-primary-200 hover:shadow-md"
          >
            <div
              class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between"
            >
              <div class="min-w-0">
                <div class="flex flex-wrap items-center gap-2">
                  <h2 class="text-base font-semibold text-surface-900">
                    {{ pessoa.nome }}
                  </h2>

                  <Tag
                    v-if="pessoa.totalNotificacoes > 0"
                    severity="warn"
                    :value="`${pessoa.totalNotificacoes} notif.`"
                  />
                  <Tag
                    v-else
                    severity="secondary"
                    value="Sem notificações"
                  />
                </div>

                <p
                  v-if="pessoa.nomeSocial"
                  class="mt-1 text-sm text-surface-500"
                >
                  Nome social: {{ pessoa.nomeSocial }}
                </p>
              </div>

              <div class="flex gap-2">
                <Button
                  icon="pi pi-pencil"
                  severity="secondary"
                  outlined
                  aria-label="Editar pessoa"
                  @click="editarPessoa(pessoa.id)"
                />
                <Button
                  label="Nova notificação"
                  icon="pi pi-plus-circle"
                  @click="novaNotificacaoParaPessoa(pessoa.id)"
                />
              </div>
            </div>

            <div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <div class="text-xs uppercase tracking-wide text-surface-500">
                  Data de nascimento
                </div>
                <div class="mt-1 text-sm text-surface-800">
                  {{ formatarData(pessoa.dataNascimento) }}
                </div>
              </div>

              <div>
                <div class="text-xs uppercase tracking-wide text-surface-500">
                  CPF
                </div>
                <div class="mt-1 text-sm text-surface-800">
                  {{ pessoa.cpf || "Não informado" }}
                </div>
              </div>

              <div>
                <div class="text-xs uppercase tracking-wide text-surface-500">
                  Sexo
                </div>
                <div class="mt-1 text-sm text-surface-800">
                  {{ pessoa.sexo || "Não informado" }}
                </div>
              </div>

              <div>
                <div class="text-xs uppercase tracking-wide text-surface-500">
                  Bairro
                </div>
                <div class="mt-1 text-sm text-surface-800">
                  {{ pessoa.bairro || "Não informado" }}
                </div>
              </div>

              <div>
                <div class="text-xs uppercase tracking-wide text-surface-500">
                  Telefone
                </div>
                <div class="mt-1 text-sm text-surface-800">
                  {{ pessoa.telefone || "Não informado" }}
                </div>
              </div>

              <div>
                <div class="text-xs uppercase tracking-wide text-surface-500">
                  Última notificação
                </div>
                <div class="mt-1 text-sm text-surface-800">
                  {{ formatarData(pessoa.ultimaNotificacaoEm) }}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>