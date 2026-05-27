import { ref } from "vue";

import type { NotificacaoFormData } from "@/modules/notificacoes/types/notificacao.types";

function createInitialFormData(): NotificacaoFormData {
  return {
    data_notificacao: null,
    data_ocorrencia: null,
    hora_ocorrencia: null,
    unidade_notificadora: null,

    // TODO: VERIFICAR COMO INTEGRAR ISSO
    //responsavel_preenchimento: "",
    //unidade_responsavel_preenchimento: "",

    uf_ocorrencia: "CE",
    municipio_ocorrencia: "2303501",
    zona_ocorrencia: null,
    distrito_ocorrencia: "",
    bairro_ocorrencia: "",
    cep_ocorrencia: "",
    logradouro_ocorrencia: "",
    numero_ocorrencia: "",
    complemento_ocorrencia: "",
    ponto_referencia_ocorrencia: "",
    local_ocorrencia: null,

    violacoes: [],

    lesao_autoprovocada: null,
    ocorreu_outras_vezes: null,
    vitima_gestante: null,

    motivo_violencia: null,
    meio_agressao: null,

    violadores: [],

    encaminhamentos: [],

    status_acompanhamento: null,
    local_acompanhamento: null,
    data_encerramento_acompanhamento: null,
    servico_acompanhamento: null,

    situacao_ruptura_psr: null,
    outra_situacao_ruptura_psr: "",

    nome_unidade_notificadora: "",
    codigo_unidade_notificadora: "",
    unidade_saude: "",
    codigo_cnes: "",

    procedimentos_saude_realizados: [],

    violencia_relacionada_trabalho: null,
    cat_emitida: null,
    circunstancia_lesao_cid10: null,
    data_encerramento_saude: null,

    observacoes_finais: "",
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
