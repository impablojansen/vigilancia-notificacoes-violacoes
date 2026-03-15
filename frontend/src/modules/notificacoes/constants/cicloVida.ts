export const CICLO_VIDA_OPTIONS = [
  { label: "00 a 06 anos", value: "FAIXA_00_06" },
  { label: "06 a 12 anos", value: "FAIXA_06_12" },
  { label: "12 a 17 anos", value: "FAIXA_12_17" },
  { label: "18 a 29 anos", value: "FAIXA_18_29" },
  { label: "30 a 59 anos", value: "FAIXA_30_59" },
  { label: "60 anos ou mais", value: "FAIXA_60_OU_MAIS" },
] as const;

export const CICLO_VIDA_COM_SEM_INFO_OPTIONS = [
  ...CICLO_VIDA_OPTIONS,
  { label: "Sem informação", value: "SEM_INFORMACAO" },
] as const;
