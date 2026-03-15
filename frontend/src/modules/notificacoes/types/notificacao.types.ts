export type OpcaoValor = string | null;

export type ViolacaoRegistro = {
  tipo: string;
};

export type VioladorRegistro = {
  sexo: OpcaoValor;
  raca_etnia: OpcaoValor;
  parentesco: OpcaoValor;
  ciclo_vida: OpcaoValor;
  suspeita_uso_alcool: OpcaoValor;
};

export type NotificacaoFormData = {
  // Dados da notificação
  data_notificacao: Date | null;
  data_ocorrencia: Date | null;
  hora_ocorrencia: string | null;
  orgao_notificante: string;
  unidade_notificadora: string | null;
  responsavel_preenchimento: string;
  observacoes_iniciais: string;

  local_coleta: string | null;
  local_ocorrencia: string | null;
  zona_ocorrencia: string | null;
  municipio_notificacao: string;
  municipio_ocorrencia: string;
  bairro_ocorrencia: string;
  endereco_ocorrencia: string;
  distrito_ocorrencia: string;

  // Sujeito violado
  nome: string;
  nome_social: string;
  nome_mae: string;
  data_nascimento: Date | null;
  sexo: OpcaoValor;
  estado_civil: OpcaoValor;
  raca_cor_etnia: OpcaoValor;
  ocupacao: string;
  grau_instrucao: OpcaoValor;
  ciclo_vida: OpcaoValor;

  cpf: string;
  nis: string;
  pis_pasep: string;
  certidao_nascimento: string;
  cartao_sus: string;
  telefone: string;
  email: string;

  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  municipio_residencia: string;
  uf_residencia: string;
  complemento: string;
  distrito: string;
  ponto_referencia: string;
  zona_residencia: OpcaoValor;
  pais_residencia: string;

  is_migrante: boolean;
  nacionalidade: string;
  naturalidade: string;
  segmento_lgbtqiapn: OpcaoValor;
  identidade_genero: OpcaoValor;
  gestante: OpcaoValor;

  is_pcd: boolean;
  tipo_deficiencia: OpcaoValor;
  deficiencia: OpcaoValor;
  transtorno_mental_comportamento: OpcaoValor;
  grupo_populacional_gptes: string[];
  recebe_bpc: OpcaoValor;
  participa_transferencia_renda: OpcaoValor;
  medida_socioeducativa_meio_aberto: OpcaoValor;

  // Violência / violação
  violacoes: ViolacaoRegistro[];
  motivacao_violencia: OpcaoValor;
  ocorreu_outras_vezes: OpcaoValor;
  lesao_autoprovocada: OpcaoValor;
  meio_agressao: OpcaoValor;
  local_ocorrencia_tipificado: OpcaoValor;
  violencia_relacionada_ao_trabalho: OpcaoValor;
  cat_acidente_trabalho: OpcaoValor;
  houve_violencia_sexual: OpcaoValor;
  subtipo_violencia_sexual: string[];
  procedimentos_saude_relacionados: string[];

  // Violador
  numero_envolvidos: number | null;
  violadores: VioladorRegistro[];

  // Encaminhamento e acompanhamento
  encaminhamentos: string[];
  status_acompanhamento: OpcaoValor;
  local_acompanhamento: OpcaoValor;
  servico_inserido: OpcaoValor;
  situacao_ruptura_psr: OpcaoValor;
  outra_situacao: string;
  data_encerramento: Date | null;
  observacoes_finais: string;

  // Blocos técnicos condicionais
  cid10: OpcaoValor;
  circunstancia_lesao: OpcaoValor;
  notificador_funcao_assinatura: string;
  psr_sem_documentacao: OpcaoValor;
};
