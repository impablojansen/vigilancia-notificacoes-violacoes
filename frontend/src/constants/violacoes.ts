export const VIOLACOES = [
  {
    label: "Violações",
    simple: true,
    items: [
      { label: "Abandono", value: "abandono" },
      { label: "Ameaça de Morte", value: "ameaca_morte" },
      { label: "Assédio Moral", value: "assedio_moral" },
      { label: "Cárcere Privado", value: "carcere_privado" },
      { label: "Exploração Patrimonial", value: "exploracao_patrimonial" },
      {
        label: "Uso de Álcool e Outras Drogas (Risco Pessoal e Social)",
        value: "risco_alcool_drogas",
      },
      { label: "Racismo", value: "racismo" },
      { label: "Ruptura de Vínculos", value: "ruptura_vinculos" },
      { label: "Trabalho Análogo ao Escravo", value: "trabalho_escravo" },
      { label: "Trabalho Infantil", value: "trabalho_infantil" },
      { label: "Tráfico de Seres Humanos", value: "trafico_humano" },
      {
        label: "Violação por Identidade de Gênero / Orientação Sexual",
        value: "violation_genero_orientacao",
      },
    ],
  },
  {
    label: "Medida Socioeducativa em Meio Aberto",
    items: [
      { label: "Liberdade Assistida (L.A)", value: "mse_la" },
      { label: "Prestação de Serviços à Comunidade (P.S.C)", value: "mse_psc" },
    ],
  },
  {
    label: "Pessoa em Situação de Rua",
    items: [
      { label: "Residente", value: "psr_residente" },
      { label: "Imigrante", value: "psr_imigrante" },
    ],
  },
  {
    label: "Violência Doméstica",
    items: [
      { label: "Física", value: "vd_fisica" },
      { label: "Psicológica", value: "vd_psicologica" },
      { label: "Negligência", value: "vd_negligencia" },
    ],
  },
  {
    label: "Violência Sexual",
    items: [
      { label: "Abuso", value: "vs_abuso" },
      { label: "Exploração Sexual", value: "vs_exploracao" },
    ],
  },
] as const;
