
import { ref } from "vue";

import type {
  PessoaFormData,
} from "@/modules/pessoas/types/pessoa.types";

function createInitialFormData(): PessoaFormData {
  return {
    // Identificação
    nome_pessoa: "",
    nome_social: "",
    nome_mae: "",
    data_nascimento: null,

    // Documentação e contato
    cpf: "",
    nis: "",
    cartao_sus: "",
    certidao_nascimento: "",
    pis_pasep: "",
    telefone: "",
    email: "",

    // Residência
    pais_residencia: "BR",
    uf_residencia: "CE",
    municipio_residencia: "",

    distrito: "",
    bairro: "",
    logradouro: "",
    numero: "",
    complemento: "",
    ponto_referencia: "",
    cep: "",
    zona_residencia: null,

    // Caracterização social
    sexo: null,
    raca_cor_etnia: null,
    estado_civil: null,
    grau_instrucao: null,
    identidade_genero: null,
    orientacao_sexual: null,

    ocupacao: "",

    // Deficiência / transtorno
    possui_condicao_deficiencia_transtorno: null,
    condicoes: [],
  };
}

export function usePessoaForm() {
  const formData = ref<PessoaFormData>(
    createInitialFormData()
  );

  function resetForm() {
    formData.value = createInitialFormData();
  }

  return {
    formData,
    resetForm,
  };
}
