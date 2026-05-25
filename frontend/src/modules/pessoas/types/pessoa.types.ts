export type SimNaoSemInformacao = "SIM" | "NAO" | "SEM_INFORMACAO" | null;

export type StatusCondicao = SimNaoSemInformacao;

export interface PessoaCondicaoItem {
  grupo: string | null;
  subtipo: string | null;
}

export interface PessoaCondicoesFormModel {
  possui_condicao_deficiencia_transtorno: StatusCondicao;
  condicoes: PessoaCondicaoItem[];
}

export interface PessoaIdentificacaoData {
  nome: string;
  nome_social: string;
  nome_mae: string;
  data_nascimento: string | null;
}

export interface PessoaDocumentosContatoData {
  cpf: string;
  nis: string;
  cartao_sus: string;
  certidao_nascimento: string;
  pis_pasep: string;
  telefone: string;
  email: string;
}

export interface PessoaPerfilSociodemograficoData {
  sexo: string | null;
  raca_cor_etnia: string | null;
  estado_civil: string | null;
  grau_instrucao: string | null;
  identidade_genero: string | null;
  orientacao_sexual: string | null;
  ocupacao: string;
}

export interface PessoaEnderecoData {
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
  pais_residencia: string;
}

export interface PessoaMigracaoOrigemData {
  is_psr: boolean;
  is_migrante: boolean;
  nacionalidade: string;
  naturalidade: string;
}

export interface PessoaSaudeCondicoesData extends PessoaCondicoesFormModel {
  gestante: string | null;
}

export interface PessoaMarcadoresSociaisData {
  grupo_populacional_gptes: string[];
  recebe_bpc: string | null;
  participa_transferencia_renda: string | null;
}

export interface PessoaFormData
  extends PessoaIdentificacaoData,
    PessoaDocumentosContatoData,
    PessoaPerfilSociodemograficoData,
    PessoaEnderecoData,
    PessoaMigracaoOrigemData,
    PessoaSaudeCondicoesData,
    PessoaMarcadoresSociaisData {}