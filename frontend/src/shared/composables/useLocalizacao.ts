import { ref } from "vue";

import paisesOptions from "@/shared/data/localizacao/paises.json";
import ufsBrasilOptions from "@/shared/data/localizacao/estados.json";

export type LocalizacaoOption = {
  label: string;
  value: string;
};

type MunicipioModule = {
  default: LocalizacaoOption[];
};

const municipioModules = import.meta.glob<MunicipioModule>(
  "@/shared/data/localizacao/municipios/*.json"
);

export function useLocalizacao(codigoBrasil = "BR") {
  const municipiosDisponiveis = ref<LocalizacaoOption[]>([]);
  const carregandoMunicipios = ref(false);

  function isBrasil(pais: string | null | undefined) {
    return pais === codigoBrasil;
  }

  async function carregarMunicipiosDaUf(uf: string | null | undefined) {
    if (!uf) {
      municipiosDisponiveis.value = [];
      return;
    }

    const caminho = `/src/shared/data/localizacao/municipios/${uf}.json`;

    const loader =
      municipioModules[caminho] ||
      municipioModules[`/src/shared/data/localizacao/municipios/${uf}.json`] ||
      municipioModules[`/@fs/${uf}.json`];

    if (!loader) {
      console.error(`Arquivo de municípios não encontrado para a UF: ${uf}`);
      municipiosDisponiveis.value = [];
      return;
    }

    carregandoMunicipios.value = true;

    try {
      const modulo = await loader();
      municipiosDisponiveis.value = modulo.default ?? [];
    } catch (error) {
      console.error(`Erro ao carregar municípios da UF ${uf}:`, error);
      municipiosDisponiveis.value = [];
    } finally {
      carregandoMunicipios.value = false;
    }
  }

  function limparMunicipios() {
    municipiosDisponiveis.value = [];
  }

  function limparUfEMunicipio(
    model: {
      uf_residencia?: string;
      municipio_residencia?: string;
      uf_ocorrencia?: string;
      municipio_ocorrencia?: string;
    },
    tipo: "residencia" | "ocorrencia"
  ) {
    if (tipo === "residencia") {
      if ("uf_residencia" in model) model.uf_residencia = "";
      if ("municipio_residencia" in model) model.municipio_residencia = "";
    }

    if (tipo === "ocorrencia") {
      if ("uf_ocorrencia" in model) model.uf_ocorrencia = "";
      if ("municipio_ocorrencia" in model) model.municipio_ocorrencia = "";
    }

    limparMunicipios();
  }

  function limparMunicipio(
    model: {
      municipio_residencia?: string;
      municipio_ocorrencia?: string;
    },
    tipo: "residencia" | "ocorrencia"
  ) {
    if (tipo === "residencia" && "municipio_residencia" in model) {
      model.municipio_residencia = "";
    }

    if (tipo === "ocorrencia" && "municipio_ocorrencia" in model) {
      model.municipio_ocorrencia = "";
    }
  }

  return {
    paisesOptions: paisesOptions as LocalizacaoOption[],
    ufsBrasilOptions: ufsBrasilOptions as LocalizacaoOption[],
    municipiosDisponiveis,
    carregandoMunicipios,
    isBrasil,
    carregarMunicipiosDaUf,
    limparMunicipios,
    limparUfEMunicipio,
    limparMunicipio,
    codigoBrasil,
  };
}