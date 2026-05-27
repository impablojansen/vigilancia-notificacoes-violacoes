export type SimNaoSemInformacao = "SIM" | "NAO" | "SEM_INFORMACAO";

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
  nome_pessoa: string;
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
  sexo: string;
  raca_cor_etnia: string;
  estado_civil: string;
  grau_instrucao: string ;
  identidade_genero: string;
  orientacao_sexual: string;
  ocupacao: string;
}

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

export interface PessoaMigracaoOrigemData {
  is_psr: boolean;
  is_migrante: boolean;
  nacionalidade: string;
  naturalidade: string;
}


export interface PessoaMarcadoresSociaisData {
  grupo_populacional_gptes: string;
  recebe_bpc: SimNaoSemInformacao;
  participa_transferencia_renda: SimNaoSemInformacao;
}

export interface PessoaFormData
  extends PessoaIdentificacaoData,
    PessoaDocumentosContatoData,
    PessoaPerfilSociodemograficoData,
    PessoaEnderecoData,
    PessoaMigracaoOrigemData,
    PessoaCondicoesFormModel,
    PessoaMarcadoresSociaisData {}