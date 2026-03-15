import { ref } from "vue";
import type { NotificacaoFormData } from "@/modules/notificacoes/types/notificacao.types";

function createInitialFormData(): NotificacaoFormData {
  return {
    // Dados da notificação
    data_notificacao: null,
    data_ocorrencia: null,
    hora_ocorrencia: null,
    orgao_notificante: "",
    unidade_notificadora: null,
    responsavel_preenchimento: "",
    observacoes_iniciais: "",

    local_coleta: null,
    local_ocorrencia: null,
    zona_ocorrencia: null,
    municipio_notificacao: "",
    municipio_ocorrencia: "",
    bairro_ocorrencia: "",
    endereco_ocorrencia: "",
    distrito_ocorrencia: "",

    // Sujeito violado
    nome: "",
    nome_social: "",
    nome_mae: "",
    data_nascimento: null,
    sexo: null,
    estado_civil: null,
    raca_cor_etnia: null,
    ocupacao: "",
    grau_instrucao: null,
    ciclo_vida: null,

    cpf: "",
    nis: "",
    pis_pasep: "",
    certidao_nascimento: "",
    cartao_sus: "",
    telefone: "",
    email: "",

    cep: "",
    logradouro: "",
    numero: "",
    bairro: "",
    municipio_residencia: "",
    uf_residencia: "",
    complemento: "",
    distrito: "",
    ponto_referencia: "",
    zona_residencia: null,
    pais_residencia: "",

    is_migrante: false,
    nacionalidade: "",
    naturalidade: "",
    segmento_lgbtqiapn: null,
    identidade_genero: null,
    gestante: null,

    is_pcd: false,
    tipo_deficiencia: null,
    deficiencia: null,
    transtorno_mental_comportamento: null,
    grupo_populacional_gptes: [],
    recebe_bpc: null,
    participa_transferencia_renda: null,
    medida_socioeducativa_meio_aberto: null,

    // Violência / violação
    violacoes: [],
    motivacao_violencia: null,
    ocorreu_outras_vezes: null,
    lesao_autoprovocada: null,
    meio_agressao: null,
    local_ocorrencia_tipificado: null,
    violencia_relacionada_ao_trabalho: null,
    cat_acidente_trabalho: null,
    houve_violencia_sexual: null,
    subtipo_violencia_sexual: [],
    procedimentos_saude_relacionados: [],

    // Violador
    numero_envolvidos: null,
    violadores: [],

    // Encaminhamento e acompanhamento
    encaminhamentos: [],
    status_acompanhamento: null,
    local_acompanhamento: null,
    servico_inserido: null,
    situacao_ruptura_psr: null,
    outra_situacao: "",
    data_encerramento: null,
    observacoes_finais: "",

    // Blocos técnicos condicionais
    cid10: null,
    circunstancia_lesao: null,
    notificador_funcao_assinatura: "",
    psr_sem_documentacao: null,
  };
}

export function useNotificacaoForm() {
  const formData = ref<NotificacaoFormData>(createInitialFormData());

  function resetForm() {
    formData.value = createInitialFormData();
  }

  return {
    formData,
    resetForm,
  };
}
