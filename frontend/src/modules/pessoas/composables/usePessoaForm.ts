import { ref } from "vue";
import type { PessoaFormData } from "@/modules/pessoas/types/pessoa.types";

function createInitialFormData(): PessoaFormData {
  return {
    nome_pessoa: "",
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

    pais_residencia: "BR",
    uf_residencia: "CE",
    municipio_residencia: "2303501",
    distrito: "",
    bairro: "",
    logradouro: "",
    numero: "",
    complemento: "",
    ponto_referencia: "",
    cep: "",
    zona_residencia: null,
    
    sexo: "",
    raca_cor_etnia: "",
    estado_civil: "",
    grau_instrucao: "",
    identidade_genero: "",
    orientacao_sexual: "",
    ocupacao: "",

    is_psr: false,
    is_migrante: false,
    nacionalidade: "",
    naturalidade: "",

    possui_condicao_deficiencia_transtorno: "NAO",
    condicoes: [],

    grupo_populacional_gptes: "",
    recebe_bpc: "NAO",
    participa_transferencia_renda: "NAO",
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