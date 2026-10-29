
import type { PessoaFormData } from "../types/pessoa.types";

import {
  SEXO_PESSOA_OPTIONS,
  RACA_COR_ETNIA_OPTIONS,
} from "../constants/perfilPessoa";

import {
  SUBTIPOS_POR_GRUPO,
} from "../constants/DeficienciaTranstorno";

export type ErrosPessoa = Partial<
  Record<keyof PessoaFormData, string>
>;

function cpfValido(cpf: string): boolean {
  const numeros = cpf.replace(/\D/g, "");

  if (numeros.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(numeros)) return false;

  for (let posicao = 9; posicao < 11; posicao++) {
    let soma = 0;

    for (let i = 0; i < posicao; i++) {
      soma +=
        Number(numeros[i]) * (posicao + 1 - i);
    }

    const resto = (soma * 10) % 11;
    const digito = resto === 10 ? 0 : resto;

    if (digito !== Number(numeros[posicao])) {
      return false;
    }
  }

  return true;
}

function opcaoValida(
  valor: number | null,
  opcoes: ReadonlyArray<{ value: number }>
): boolean {
  return (
    valor !== null &&
    opcoes.some((opcao) => opcao.value === valor)
  );
}

function validarCondicoes(
  dados: PessoaFormData,
  erros: ErrosPessoa
): void {
  const status =
    dados.possui_condicao_deficiencia_transtorno;

  if (
    status !== "SIM" &&
    status !== "NAO" &&
    status !== "SEM_INFORMACAO"
  ) {
    erros.possui_condicao_deficiencia_transtorno =
      "Informe se a pessoa possui alguma condição.";
    return;
  }

  if (status !== "SIM") {
    if (dados.condicoes.length > 0) {
      erros.condicoes =
        "Remova as condições incompatíveis com a resposta.";
    }
    return;
  }

  if (dados.condicoes.length === 0) {
    erros.condicoes =
      "Adicione pelo menos uma condição.";
    return;
  }

  const utilizados = new Map<number, Set<number>>();

  for (const item of dados.condicoes) {
    const { grupo, subtipo } = item;

    if (
      grupo === null ||
      subtipo === null ||
      !SUBTIPOS_POR_GRUPO[grupo]?.some(
        (opcao) => opcao.value === subtipo
      )
    ) {
      erros.condicoes =
        "Existe uma condição incompleta ou inválida.";
      return;
    }

    const subtipos = utilizados.get(grupo) ??
      new Set<number>();

    if (subtipos.has(subtipo)) {
      erros.condicoes =
        "A mesma condição foi registrada mais de uma vez.";
      return;
    }

    // Subtipo 0 = SEM INFORMAÇÃO.
    // Não pode coexistir com outros subtipos
    // conhecidos do mesmo grupo.
    if (
      (subtipo === 0 && subtipos.size > 0) ||
      (subtipo !== 0 && subtipos.has(0))
    ) {
      erros.condicoes =
        "Não combine 'Sem informação' com condições específicas do mesmo grupo.";
      return;
    }

    subtipos.add(subtipo);
    utilizados.set(grupo, subtipos);
  }
}

export function validarPessoa(
  dados: PessoaFormData
): ErrosPessoa {
  const erros: ErrosPessoa = {};

  // Identificação
  if (!dados.nome_pessoa.trim()) {
    erros.nome_pessoa = "Informe o nome completo.";
  }

  const nascimento = dados.data_nascimento;

  if (
    !(nascimento instanceof Date) ||
    Number.isNaN(nascimento.getTime())
  ) {
    erros.data_nascimento =
      "Informe uma data de nascimento válida.";
  } else {
    const hoje = new Date();

    const hojeSemHorario = new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      hoje.getDate()
    );

    const nascimentoSemHorario = new Date(
      nascimento.getFullYear(),
      nascimento.getMonth(),
      nascimento.getDate()
    );

    if (nascimentoSemHorario > hojeSemHorario) {
      erros.data_nascimento =
        "A data de nascimento não pode ser futura.";
    }
  }

  // Caracterização social
  if (!opcaoValida(dados.sexo, SEXO_PESSOA_OPTIONS)) {
    erros.sexo = "Selecione o sexo.";
  }

  if (
    !opcaoValida(
      dados.raca_cor_etnia,
      RACA_COR_ETNIA_OPTIONS
    )
  ) {
    erros.raca_cor_etnia =
      "Selecione a raça/cor.";
  }

  if (!dados.ocupacao.trim()) {
    erros.ocupacao = "Informe a ocupação.";
  }

  // Documentação: CPF opcional
  if (dados.cpf.trim() && !cpfValido(dados.cpf)) {
    erros.cpf = "Informe um CPF válido.";
  }

  // Residência
  if (!dados.pais_residencia.trim()) {
    erros.pais_residencia =
      "Selecione o país de residência.";
  } else if (dados.pais_residencia === "BR") {
    if (!dados.uf_residencia.trim()) {
      erros.uf_residencia =
        "Selecione a UF de residência.";
    }

    if (!dados.municipio_residencia.trim()) {
      erros.municipio_residencia =
        "Selecione o município de residência.";
    }
  }

  // Deficiência / transtorno
  validarCondicoes(dados, erros);

  return erros;
}
