
export type OpcaoCondicao = {
  label: string;
  value: number;
};

export const STATUS_CONDICAO_OPTIONS = [
  { label: "SIM", value: "SIM" },
  { label: "NÃO", value: "NAO" },
  { label: "SEM INFORMAÇÃO", value: "SEM_INFORMACAO" },
];

export const GRUPO_CONDICAO_OPTIONS: OpcaoCondicao[] = [
  { label: "DEFICIÊNCIA FÍSICA", value: 1 },
  { label: "DEFICIÊNCIA VISUAL", value: 2 },
  { label: "DEFICIÊNCIA AUDITIVA", value: 3 },
  { label: "DEFICIÊNCIA INTELECTUAL", value: 4 },
  { label: "TRANSTORNO DO ESPECTRO AUTISTA (TEA)", value: 5 },
  { label: "TRANSTORNO MENTAL", value: 6 },
  { label: "TRANSTORNO DE COMPORTAMENTO", value: 7 },
  { label: "OUTRA CONDIÇÃO RELEVANTE", value: 8 },
];

// Os códigos dos subtipos são exclusivos dentro de cada grupo.
// Código 0 significa que o grupo é conhecido,
// mas o subtipo não foi informado.

export const SUBTIPOS_POR_GRUPO: Record<
  number,
  OpcaoCondicao[]
> = {
  1: [
    { label: "SEM INFORMAÇÃO", value: 0 },
    { label: "PARAPLEGIA", value: 1 },
    { label: "PARAPARESIA", value: 2 },
    { label: "MONOPLEGIA", value: 3 },
    { label: "MONOPARESIA", value: 4 },
    { label: "TETRAPLEGIA", value: 5 },
    { label: "TETRAPARESIA", value: 6 },
    { label: "TRIPLEGIA", value: 7 },
    { label: "TRIPARESIA", value: 8 },
    { label: "HEMIPLEGIA", value: 9 },
    { label: "HEMIPARESIA", value: 10 },
    { label: "OSTOMIA", value: 11 },
    { label: "AUSÊNCIA DE UM MEMBRO", value: 12 },
    { label: "NANISMO", value: 13 },
    { label: "PARALISIA CEREBRAL", value: 14 },
    {
      label: "MEMBROS COM DEFORMIDADE ADQUIRIDA OU CONGÊNITA",
      value: 15,
    },
  ],

  2: [
    { label: "SEM INFORMAÇÃO", value: 0 },
    { label: "CEGUEIRA", value: 1 },
    { label: "BAIXA VISÃO", value: 2 },
    { label: "VISÃO MONOCULAR", value: 3 },
  ],

  3: [
    { label: "SEM INFORMAÇÃO", value: 0 },
    { label: "PERDA DE AUDIÇÃO BILATERAL", value: 1 },
    { label: "PERDA DE AUDIÇÃO PARCIAL", value: 2 },
    { label: "PERDA DE AUDIÇÃO TOTAL", value: 3 },
  ],

  4: [
    { label: "SEM INFORMAÇÃO", value: 0 },
    { label: "SÍNDROME DO X FRÁGIL", value: 1 },
    { label: "SÍNDROME DE DOWN", value: 2 },
    { label: "SÍNDROME DE RETT", value: 3 },
    { label: "DISCALCULIA", value: 4 },
    { label: "SÍNDROME DO ÁLCOOL FETAL", value: 5 },
    { label: "ERROS INATOS DO METABOLISMO", value: 6 },
  ],

  5: [
    {
      label: "TRANSTORNO DO ESPECTRO AUTISTA (TEA)",
      value: 1,
    },
  ],

  6: [
    { label: "SEM INFORMAÇÃO", value: 0 },
    { label: "DEPRESSÃO", value: 1 },
    { label: "ANSIEDADE", value: 2 },
    { label: "ESQUIZOFRENIA", value: 3 },
    { label: "BIPOLARIDADE", value: 4 },
    { label: "OUTRO TRANSTORNO MENTAL", value: 5 },
  ],

  7: [
    { label: "TDAH", value: 1 },
    { label: "TRANSTORNO OPOSITOR DESAFIANTE", value: 2 },
    { label: "OUTRO TRANSTORNO DE COMPORTAMENTO", value: 3 },
  ],

  8: [
    { label: "OUTRA CONDIÇÃO RELEVANTE", value: 1 },
  ],
};
