import { ref } from "vue";
import type { PessoaFormData } from "@/modules/pessoas/types/pessoa.types";

function createInitialFormData(): PessoaFormData {
  return {
    nome: "",
    nome_social: "",
    nome_mae: "",
    data_nascimento: null,

    cpf: "",
    nis: "",
    cartao_sus: "",
    certidao_nascimento: "",
    pis_pasep: "",
    telefone: "",
    email: "",

    sexo: null,
    raca_cor_etnia: null,
    estado_civil: null,
    grau_instrucao: null,
    identidade_genero: null,
    orientacao_sexual: null,
    ocupacao: "",

    uf_residencia: "",
    municipio_residencia: "",
    distrito: "",
    bairro: "",
    logradouro: "",
    numero: "",
    complemento: "",
    ponto_referencia: "",
    cep: "",
    zona_residencia: null,
    pais_residencia: "",

    is_psr: false,
    is_migrante: false,
    nacionalidade: "",
    naturalidade: "",

    gestante: null,
    possui_condicao_deficiencia_transtorno: null,
    condicoes: [],

    grupo_populacional_gptes: [],
    recebe_bpc: null,
    participa_transferencia_renda: null,
  };
}

export function usePessoaForm() {
  const formData = ref<PessoaFormData>(createInitialFormData());

  function resetForm() {
    formData.value = createInitialFormData();
  }

  return {
    formData,
    resetForm,
  };
}