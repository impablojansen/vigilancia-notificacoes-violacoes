
import { reactive } from "vue";

import type {
  PessoaFormData,
} from "@/modules/pessoas/types/pessoa.types";

// Informações utilizadas na localização de pessoas
// e na identificação da pessoa na notificação.
export interface PessoaResumo {
  id: number;
  nome: string;
  nomeSocial: string | null;
  nome_mae: string | null;
  cpf: string | null;
  data_nascimento: string | null;
  bairro: string | null;
  telefone: string | null;
}

// Os registros criados pelo formulário também guardam
// uma cópia dos dados completos para testes futuros.
interface PessoaRegistroMock extends PessoaResumo {
  cadastroCompleto?: PessoaFormData;
}

export const pessoasMock = reactive<PessoaRegistroMock[]>([
  {
    id: 1,
    nome: "Maria da Silva",
    nomeSocial: null,
    nome_mae: "Ana da Silva",
    cpf: null,
    data_nascimento: "2012-04-18",
    bairro: "Centro",
    telefone: "(85) 99999-1111",
  },
  {
    id: 2,
    nome: "João Pereira",
    nomeSocial: null,
    nome_mae: "Cláudia Pereira",
    cpf: "123.456.789-00",
    data_nascimento: "2009-11-02",
    bairro: "Coqueiral",
    telefone: null,
  },
  {
    id: 3,
    nome: "Ana Souza",
    nomeSocial: "Ana",
    nome_mae: null,
    cpf: null,
    data_nascimento: null,
    bairro: "Guaribas",
    telefone: null,
  },
]);

function somenteNumeros(valor: string): string {
  return valor.replace(/\D/g, "");
}

// Converte a data para YYYY-MM-DD usando
// os componentes locais, sem conversão de fuso.
function formatarDataISO(data: Date | null): string | null {
  if (!data) return null;

  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");

  return `${ano}-${mes}-${dia}`;
}

// Consulta compartilhada pela localização
// e pela tela de criação de notificações.
export function buscarPessoaPorId(
  id: number
): PessoaResumo | null {
  return pessoasMock.find((pessoa) => pessoa.id === id) ?? null;
}

// A futura edição poderá recuperar o cadastro completo
// de pessoas criadas durante a simulação.
export function buscarCadastroCompletoMock(
  id: number
): PessoaFormData | null {
  return pessoasMock.find(
    (pessoa) => pessoa.id === id
  )?.cadastroCompleto ?? null;
}

export type ResultadoCadastroMock =
  | {
      ok: true;
      pessoa: PessoaResumo;
    }
  | {
      ok: false;
      motivo: "CPF_DUPLICADO";
      pessoaExistente: PessoaResumo;
    };

export function cadastrarPessoaMock(
  dados: PessoaFormData
): ResultadoCadastroMock {
  const cpf = somenteNumeros(dados.cpf);

  // O CPF é opcional, mas, quando informado,
  // não deve gerar um segundo cadastro idêntico.
  if (cpf) {
    const existente = pessoasMock.find(
      (pessoa) =>
        somenteNumeros(pessoa.cpf ?? "") === cpf
    );

    if (existente) {
      return {
        ok: false,
        motivo: "CPF_DUPLICADO",
        pessoaExistente: existente,
      };
    }
  }

  // Gera um identificador provisório.
  // O banco de dados será responsável por isso
  // quando o backend for implementado.
  const novoId =
    pessoasMock.reduce(
      (maior, pessoa) => Math.max(maior, pessoa.id),
      0
    ) + 1;

  // Copia os dados, sem compartilhar as referências
  // internas do formulário com o armazenamento mock.
  const cadastroCompleto: PessoaFormData = {
    ...dados,
    data_nascimento: dados.data_nascimento
      ? new Date(dados.data_nascimento)
      : null,
    condicoes: dados.condicoes.map(
      (condicao) => ({ ...condicao })
    ),
  };

  const novaPessoa: PessoaRegistroMock = {
    id: novoId,

    nome: dados.nome_pessoa.trim(),
    nomeSocial: dados.nome_social.trim() || null,
    nome_mae: dados.nome_mae.trim() || null,

    cpf: dados.cpf.trim() || null,
    data_nascimento: formatarDataISO(
      dados.data_nascimento
    ),

    bairro: dados.bairro.trim() || null,
    telefone: dados.telefone.trim() || null,

    cadastroCompleto,
  };

  pessoasMock.push(novaPessoa);

  return {
    ok: true,
    pessoa: novaPessoa,
  };
}
