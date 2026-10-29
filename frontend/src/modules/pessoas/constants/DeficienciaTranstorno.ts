// FIX INCLUIR OUTRAS OPÇÕES

export const STATUS_CONDICAO_OPTIONS = [
    { label: "Sim", value: "SIM" },
    { label: "Não", value: "NAO" },
    { label: "Sem informação", value: "SEM_INFORMACAO" },
] as const;

export const GRUPO_CONDICAO_OPTIONS = [
    { label: "DEFICIENCIA FISICA", value: 1 },
    { label: "DEFICIENCIA VISUAL", value: 2 },
    { label: "DEFICIENCIA AUDITIVA", value: 3 },
    { label: "DEFICIENCIA INTELECTUAL", value: 4 },
    { label: "TRANSTORNO DO ESPECTRO AUTISTA (TEA)", value: 5 },
    { label: "TRANSTORNO MENTAL", value: 6 },
    { label: "TRANSTORNO DE COMPORTAMENTO", value: 7 },
    { label: "OUTRA CONDICAO RELEVANTE", value: 8 },
];

export const SUBTIPOS_POR_GRUPO: Record<number, { label: string; value: number }[]> = {
    1: [
        { label: "SEM INFORMACAO", value: 1 },
        { label: "PARAPLEGIA", value: 2 },
        { label: "PARAPARESIA", value: 3 },
        { label: "MONOPLEGIA", value: 4 },
        { label: "MONOPARESIA", value: 5 },
        { label: "TETRAPLEGIA", value: 6 },
        { label: "TETRAPARESIA", value: 7 },
        { label: "TRIPLEGIA", value: 8 },
        { label: "TRIPARESIA", value: 9 },
        { label: "HEMIPLEGIA", value: 10 },
        { label: "HEMIPARESIA", value: 11 },
        { label: "OSTOMIA", value: 12 },
        { label: "AUSENCIA DE UM MEMBRO", value: 13 },
        { label: "NANISMO", value: 14 },
        { label: "PARALISIA CEREBRAL", value: 15 },
        { label: "MEMBROS COM DEFORMIDADE ADQUIRIDA OU CONGENITA", value: 16 },
    ],
    2: [
        { label: "SEM INFORMACAO", value: 1 },
        { label: "CEGUEIRA", value: 2 },
        { label: "BAIXA VISAO", value: 3 },
        { label: "VISAO MONOCULAR", value: 4 },
    ],
    3: [
        { label: "SEM INFORMACAO", value: 1 },
        { label: "PERDA DE AUDICAO BILATERAL", value: 2 },
        { label: "PERDA DE AUDICAO PARCIAL", value: 3 },
        { label: "PERDA DE AUDICAO TOTAL", value: 4 },
    ],
    4: [
        { label: "SEM INFORMACAO", value: 1 },
        { label: "SINDROME DO X FRAGIL", value: 2 },
        { label: "SINDROME DE DOWN", value: 3 },
        { label: "SINDROME DE RETT", value: 4 },
        { label: "DISCALCULIA", value: 5 },
        { label: "SINDROME DO ALCOOL FETAL", value: 6 },
        { label: "ERROS INATOS DO METABOLISMO", value: 7 },

    ],
    5: [
        { label: "TRANSTORNO DO ESPECTRO AUTISTA (TEA)", value: 1 },
    ],
    6: [
        { label: "SEM INFORMACAO", value: 1 },
        { label: "DEPRESSAO", value: 2 },
        { label: "ANSIEDADE", value: 3 },
        { label: "ESQUIZOFRENIA", value: 4 },
        { label: "BIPOLARIDADE", value: 5 },
        { label: "OUTRO TRANSTORNO MENTAL", value: 6 },
    ],
    7: [
        { label: "TDAH", value: 1 },
        { label: "Transtorno opositor desafiante", value: 2 },
        { label: "Outro transtorno de comportamento", value: 3 },
    ],
    8: [
        { label: "Outra condição relevante", value: 1 },
    ],
};