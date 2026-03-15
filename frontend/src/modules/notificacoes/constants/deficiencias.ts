// FIX INCLUIR OUTRAS OPÇÕES

export const TIPO_DEFICIENCIA_OPTIONS = [
  { label: "Física", value: "FISICA" },
  { label: "Visual", value: "VISUAL" },
  { label: "Auditiva", value: "AUDITIVA" },
  { label: "Intelectual", value: "INTELECTUAL" },
];

export const DEFICIENCIAS_POR_TIPO: Record<
  string,
  { label: string; value: string }[]
> = {
  FISICA: [
    { label: "Paraplegia", value: "PARAPLEGIA" },
    { label: "Tetraplegia", value: "TETRAPLEGIA" },
  ],
  VISUAL: [
    { label: "Cegueira", value: "CEGUEIRA" },
    { label: "Baixa Visão", value: "BAIXA_VISAO" },
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
};
