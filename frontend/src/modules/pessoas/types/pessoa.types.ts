export type SimNaoSemInformacao =
  | "SIM"
  | "NAO"
  | "SEM_INFORMACAO";

// Campo de seleção numérica ainda não respondido = null.
export type CodigoOpcao = number | null;

export type StatusCondicao = SimNaoSemInformacao | null;

// Identificação
export interface PessoaIdentificacaoData {
  nome_pessoa: string;
  nome_social: string;
  nome_mae: string;
  data_nascimento: Date | null;
}

// Documentação e contato
export interface PessoaDocumentosContatoData {
  cpf: string;
  nis: string;
  cartao_sus: string;
  certidao_nascimento: string;
  pis_pasep: string;
  telefone: string;
  email: string;
}

// Residência
export interface PessoaEnderecoData {
  pais_residencia: string;
  uf_residencia: string;
  municipio_residencia: string;

  distrito: string;
  bairro: string;
  logradouro: string;
  numero: string;
  complemento: string;
  ponto_referencia: string;
  cep: string;

  zona_residencia: string | null;
}

// Caracterização social
export interface PessoaPerfilSociodemograficoData {
  sexo: CodigoOpcao;
  raca_cor_etnia: CodigoOpcao;
  estado_civil: CodigoOpcao;
  grau_instrucao: CodigoOpcao;
  identidade_genero: CodigoOpcao;
  orientacao_sexual: CodigoOpcao;

  ocupacao: string;
}

// Deficiência, transtorno ou outra condição
export interface PessoaCondicaoItem {
  grupo: CodigoOpcao;
  subtipo: CodigoOpcao;
}

export interface PessoaCondicoesFormModel {
  possui_condicao_deficiencia_transtorno: StatusCondicao;
  condicoes: PessoaCondicaoItem[];
}

// Condições específicas e origem
export interface PessoaCondicoesEspecificasData {
  is_psr: boolean | null;

  nacionalidade: string;
  naturalidade: string;
}

// Marcadores sociais
export interface PessoaMarcadoresSociaisData {
  // null = informação não apurada
  // [] = nenhum pertencimento identificado
  // [1, 23] = pertencimentos identificados
  grupo_populacional_gptes: number[] | null;
}

// Formulário completo da pessoa
export interface PessoaFormData
  extends
    PessoaIdentificacaoData,
    PessoaDocumentosContatoData,
    PessoaEnderecoData,
    PessoaPerfilSociodemograficoData,
    PessoaCondicoesFormModel,
    PessoaCondicoesEspecificasData,
    PessoaMarcadoresSociaisData {}
