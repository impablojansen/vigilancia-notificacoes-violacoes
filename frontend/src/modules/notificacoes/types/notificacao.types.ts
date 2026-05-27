export type OpcaoValor = string | null;

export type ViolacaoRegistro = {
  tipo: string | null;
};

export type VioladorRegistro = {
  sexo_violador: OpcaoValor;
  raca_etnia_violador: OpcaoValor;
  parentesco_violador: OpcaoValor;
  ciclo_vida_violador: OpcaoValor;
  suspeita_uso_alcool_violador: OpcaoValor;
};

export type NotificacaoFormData = {
  data_notificacao: Date | null;
  data_ocorrencia: Date | null;
  hora_ocorrencia: OpcaoValor;
  unidade_notificadora: OpcaoValor;

  uf_ocorrencia: OpcaoValor;
  municipio_ocorrencia: OpcaoValor;
  zona_ocorrencia: OpcaoValor;
  distrito_ocorrencia: OpcaoValor;
  bairro_ocorrencia: OpcaoValor;
  cep_ocorrencia: OpcaoValor;
  logradouro_ocorrencia: OpcaoValor;
  numero_ocorrencia: OpcaoValor;
  complemento_ocorrencia: OpcaoValor;
  ponto_referencia_ocorrencia: OpcaoValor;
  local_ocorrencia: OpcaoValor;

  violacoes: ViolacaoRegistro[];
  lesao_autoprovocada: OpcaoValor;
  ocorreu_outras_vezes: OpcaoValor;
  vitima_gestante: OpcaoValor; // ou tipo próprio, se você tiver
  motivo_violencia: OpcaoValor;
  meio_agressao: OpcaoValor;

  violadores: VioladorRegistro[];

  encaminhamentos: string[];

  status_acompanhamento: OpcaoValor;
  local_acompanhamento: OpcaoValor;
  data_encerramento_acompanhamento: Date | null;
  servico_acompanhamento: OpcaoValor;

  situacao_ruptura_psr: OpcaoValor;
  outra_situacao_ruptura_psr: OpcaoValor;

  nome_unidade_notificadora: OpcaoValor;
  codigo_unidade_notificadora: OpcaoValor;
  unidade_saude: OpcaoValor;
  codigo_cnes: OpcaoValor;

  procedimentos_saude_realizados: string[];

  violencia_relacionada_trabalho: OpcaoValor;
  cat_emitida: OpcaoValor;
  circunstancia_lesao_cid10: OpcaoValor;
  data_encerramento_saude: Date | null;

  observacoes_finais: OpcaoValor;
};