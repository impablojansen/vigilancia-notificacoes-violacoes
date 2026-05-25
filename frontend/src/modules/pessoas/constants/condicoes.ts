// FIX INCLUIR OUTRAS OPÇÕES

export const STATUS_CONDICAO_OPTIONS = [
  { label: "Sim", value: "SIM" },
  { label: "Não", value: "NAO" },
  { label: "Sem informação", value: "SEM_INFORMACAO" },
] as const;

export const GRUPO_CONDICAO_OPTIONS = [
  { label: "Deficiência física", value: "FISICA" },
  { label: "Deficiência visual", value: "VISUAL" },
  { label: "Deficiência auditiva", value: "AUDITIVA" },
  { label: "Deficiência intelectual", value: "INTELECTUAL" },
  { label: "Transtorno do espectro autista (TEA)", value: "TEA" },
  { label: "Transtorno mental", value: "TRANSTORNO_MENTAL" },
  { label: "Transtorno de comportamento", value: "TRANSTORNO_COMPORTAMENTO" },
  { label: "Outra condição relevante", value: "OUTRA_CONDICAO" },
] as const;

export const SUBTIPOS_POR_GRUPO: Record<
  string,
  { label: string; value: string }[]
> = {
  FISICA: [
    { label: "Paraplegia", value: "PARAPLEGIA" },
    { label: "Tetraplegia", value: "TETRAPLEGIA" },
  ],
  VISUAL: [
    { label: "Cegueira", value: "CEGUEIRA" },
    { label: "Baixa visão", value: "BAIXA_VISAO" },
  ],
  AUDITIVA: [
    { label: "Surdez", value: "SURDEZ" },
    {
      label: "Deficiência auditiva parcial",
      value: "DEFICIENCIA_AUDITIVA_PARCIAL",
    },
  ],
  INTELECTUAL: [
    { label: "Deficiência intelectual", value: "DEFICIENCIA_INTELECTUAL" },
    { label: "Síndrome de Down", value: "SINDROME_DE_DOWN" },
  ],
  TEA: [
    { label: "Transtorno do espectro autista (TEA)", value: "TEA" },
  ],
  TRANSTORNO_MENTAL: [
    { label: "Depressão", value: "DEPRESSAO" },
    { label: "Ansiedade", value: "ANSIEDADE" },
    { label: "Esquizofrenia", value: "ESQUIZOFRENIA" },
    { label: "Bipolaridade", value: "BIPOLARIDADE" },
    { label: "Outro transtorno mental", value: "OUTRO_TRANSTORNO_MENTAL" },
  ],
  TRANSTORNO_COMPORTAMENTO: [
    { label: "TDAH", value: "TDAH" },
    { label: "Transtorno opositor desafiante", value: "TOD" },
    {
      label: "Outro transtorno de comportamento",
      value: "OUTRO_TRANSTORNO_COMPORTAMENTO",
    },
  ],
  OUTRA_CONDICAO: [
    { label: "Outra condição relevante", value: "OUTRA_CONDICAO_RELEVANTE" },
  ],
};