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
        { label: "PARAPLEGIA", value: 1 },
        { label: "PARAPARESIA", value: 2 },
        { label: "MONOPLEGIA", value: 2 },
        { label: "MONOPARESIA", value: 2 },
        { label: "TETRAPLEGIA", value: 2 },
        { label: "TETRAPARESIA", value: 2 },
        { label: "TRIPLEGIA", value: 2 },
        { label: "TRIPARESIA", value: 2 },
        { label: "HEMIPLEGIA", value: 2 },
        { label: "HEMIPARESIA", value: 2 },
        { label: "OSTOMIA", value: 2 },
        { label: "AUSENCIA DE UM MEMBRO", value: 2 },
        { label: "NANISMO", value: 2 },
        { label: "PARALISIA CEREBRAL", value: 2 },
        { label: "MEMBROS COM DEFORMIDADE ADQUIRIDA OU CONGENITA", value: 2 },
    ],
    2: [
        { label: "SEM INFORMACAO", value: 2 },
        { label: "CEGUEIRA", value: 1 },
        { label: "BAIXA VISAO", value: 2 },
        { label: "VISAO MONOCULAR", value: 2 },
    ],
    3: [
        { label: "SEM INFORMACAO", value: 2 },
        { label: "PERDA DE AUDICAO BILATERAL", value: 1 },
        { label: "PERDA DE AUDICAO PARCIAL", value: 2 },
        { label: "PERDA DE AUDICAO TOTAL", value: 2 },
    ],
    4: [
        { label: "SEM INFORMACAO", value: 2 },
        { label: "SINDROME DO X FRAGIL", value: 2 },
        { label: "SINDROME DE DOWN", value: 2 },
        { label: "SINDROME DE RETT", value: 2 },
        { label: "DISCALCULIA", value: 2 },
        { label: "SINDROME DO ALCOOL FETAL", value: 2 },
        { label: "ERROS INATOS DO METABOLISMO", value: 2 },

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
        { label: "Outro transtorno de comportamento", value: 4 },
    ],
    8: [
        { label: "Outra condição relevante", value: 1 },
    ],
};