# Formulário Municipal v2

## Objetivo
Este documento descreve a proposta operacional do formulário municipal v2 do sistema de notificações de violência e violação de direitos.

Ele traduz o documento `mapeamento-cemaris-sinan.md` em uma estrutura pronta para implementação, servindo como ponte entre:
- frontend;
- backend;
- modelagem do banco;
- futura exportação para CEMARIS e SINAN.

## Princípios
1. O formulário municipal terá **modelo próprio**.
2. O formulário deve ser **mais enxuto que a soma literal** entre CEMARIS e SINAN.
3. O sistema terá um **núcleo municipal obrigatório** e **blocos condicionais**.
4. Os campos devem ser organizados para:
   - facilitar o preenchimento;
   - permitir relatórios e dashboards;
   - apoiar exportações futuras.

## Classificação dos campos
- **Núcleo**: campo do formulário principal municipal.
- **Condicional CEMARIS**: campo complementar mais ligado à assistência social.
- **Condicional SINAN**: campo complementar mais ligado à saúde.
- **Estratégico municipal**: campo importante para análise local, ainda que não seja central em ambos os sistemas.

---

## Estrutura geral do formulário

### Aba 1. Dados da Notificação
### Aba 2. Sujeito Violado
### Aba 3. Violência / Violação
### Aba 4. Violador / Provável Autor
### Aba 5. Encaminhamento e Acompanhamento
### Aba 6. Blocos Técnicos Condicionais

---

## Aba 1. Dados da Notificação

| Aba | Seção | Campo | Tipo de input | Obrigatório | Origem | Regra condicional | Entidade backend | Observações |
|---|---|---|---|---|---|---|---|---|
| Dados da Notificação | Identificação do registro | data_notificacao | date | sim | núcleo | não | Notificacao | data do registro no sistema |
| Dados da Notificação | Identificação do registro | data_ocorrencia | date | sim | núcleo | não | Notificacao | data do fato ocorrido |
| Dados da Notificação | Identificação do registro | hora_ocorrencia | time | não | condicional SINAN | exibir conforme necessidade | Notificacao | útil para saúde e análise temporal |
| Dados da Notificação | Identificação do registro | orgao_notificante | select | sim | núcleo | não | Notificacao | órgão responsável pela notificação |
| Dados da Notificação | Identificação do registro | unidade_notificadora | select/autocomplete | sim | núcleo | não | Notificacao | unidade que notificou |
| Dados da Notificação | Identificação do registro | tipo_unidade_notificadora | select | não | condicional SINAN | exibir conforme perfil/uso | Notificacao | classifica a unidade |
| Dados da Notificação | Identificação do registro | responsavel_preenchimento | text/select | sim | núcleo | não | Notificacao | importante para auditoria futura |
| Dados da Notificação | Identificação do registro | observacoes_iniciais | textarea | não | núcleo | não | Notificacao | observações introdutórias |

### Seção: Local da ocorrência / coleta

| Aba | Seção | Campo | Tipo de input | Obrigatório | Origem | Regra condicional | Entidade backend | Observações |
|---|---|---|---|---|---|---|---|---|
| Dados da Notificação | Local da ocorrência / coleta | local_coleta | select | não | condicional CEMARIS | exibir para fluxos da assistência/rede | Notificacao | rede socioassistencial e outros órgãos |
| Dados da Notificação | Local da ocorrência / coleta | local_ocorrencia | select | não | condicional SINAN | exibir quando aplicável | Notificacao | local tipificado da ocorrência |
| Dados da Notificação | Local da ocorrência / coleta | municipio_notificacao | select/autocomplete | sim | núcleo | não | Notificacao | territorialização |
| Dados da Notificação | Local da ocorrência / coleta | municipio_ocorrencia | select/autocomplete | não | núcleo | não | Notificacao | territorialização |
| Dados da Notificação | Local da ocorrência / coleta | endereco_ocorrencia | text | não | núcleo | não | Notificacao | endereço do fato |
| Dados da Notificação | Local da ocorrência / coleta | bairro_ocorrencia | text | não | núcleo | não | Notificacao | importante para dashboard |
| Dados da Notificação | Local da ocorrência / coleta | zona_ocorrencia | select | não | condicional SINAN | exibir quando aplicável | Notificacao | urbana/rural/periurbana |

---

## Aba 2. Sujeito Violado

### Seção: Identificação

| Aba | Seção | Campo | Tipo de input | Obrigatório | Origem | Regra condicional | Entidade backend | Observações |
|---|---|---|---|---|---|---|---|---|
| Sujeito Violado | Identificação | nome | text | sim | núcleo | não | Violado | campo central |
| Sujeito Violado | Identificação | nome_social | text | não | núcleo | não | Violado | |
| Sujeito Violado | Identificação | nome_mae | text | não | núcleo | não | Violado | importante para identificação |
| Sujeito Violado | Identificação | data_nascimento | date | sim | núcleo | não | Violado | |
| Sujeito Violado | Identificação | idade | number/calculado | não | estratégico municipal | derivado da data_nascimento | Violado | preferencialmente calculado |
| Sujeito Violado | Identificação | sexo | select | sim | núcleo | não | Violado | |
| Sujeito Violado | Identificação | estado_civil | select | não | núcleo | não | Violado | situação conjugal/estado civil |
| Sujeito Violado | Identificação | raca_cor_etnia | select | sim | núcleo | não | Violado | importante para análise |
| Sujeito Violado | Identificação | ocupacao | text/autocomplete | não | núcleo | não | Violado | |
| Sujeito Violado | Identificação | escolaridade | select | não | núcleo | não | Violado | |
| Sujeito Violado | Identificação | ciclo_vida | select/calculado | não | núcleo | pode ser derivado | Violado | manter classificação padronizada |

### Seção: Documentação e cadastro

| Aba | Seção | Campo | Tipo de input | Obrigatório | Origem | Regra condicional | Entidade backend | Observações |
|---|---|---|---|---|---|---|---|---|
| Sujeito Violado | Documentação e cadastro | cpf | text/mask | não | condicional CEMARIS | exibir como opcional | Violado | dado sensível |
| Sujeito Violado | Documentação e cadastro | nis | text | não | condicional CEMARIS | opcional | Violado | |
| Sujeito Violado | Documentação e cadastro | pis_pasep | text | não | condicional CEMARIS | opcional | Violado | |
| Sujeito Violado | Documentação e cadastro | certidao_nascimento | text | não | condicional CEMARIS | opcional | Violado | |
| Sujeito Violado | Documentação e cadastro | cartao_sus | text | não | condicional SINAN | opcional | Violado | |
| Sujeito Violado | Documentação e cadastro | telefone | text/mask | não | núcleo | não | Violado | |
| Sujeito Violado | Documentação e cadastro | email | email | não | condicional CEMARIS | opcional | Violado | |

### Seção: Endereço e território

| Aba | Seção | Campo | Tipo de input | Obrigatório | Origem | Regra condicional | Entidade backend | Observações |
|---|---|---|---|---|---|---|---|---|
| Sujeito Violado | Endereço e território | cep | text/mask | não | núcleo | não | Violado | |
| Sujeito Violado | Endereço e território | logradouro | text | não | núcleo | não | Violado | |
| Sujeito Violado | Endereço e território | numero | text | não | núcleo | não | Violado | |
| Sujeito Violado | Endereço e território | distrito | text/select | não | condicional SINAN | opcional | Violado | |
| Sujeito Violado | Endereço e território | bairro | text | não | núcleo | não | Violado | |
| Sujeito Violado | Endereço e território | municipio_residencia | select/autocomplete | não | núcleo | não | Violado | |
| Sujeito Violado | Endereço e território | uf_residencia | select | não | núcleo | não | Violado | |
| Sujeito Violado | Endereço e território | complemento | text | não | núcleo | não | Violado | |
| Sujeito Violado | Endereço e território | ponto_referencia | text | não | condicional SINAN | opcional | Violado | |
| Sujeito Violado | Endereço e território | zona_residencia | select | não | condicional SINAN | opcional | Violado | |
| Sujeito Violado | Endereço e território | pais_residencia | select/autocomplete | não | condicional SINAN | exibir principalmente para migrantes | Violado | |

### Seção: Perfil social, identitário e condições específicas

| Aba | Seção | Campo | Tipo de input | Obrigatório | Origem | Regra condicional | Entidade backend | Observações |
|---|---|---|---|---|---|---|---|---|
| Sujeito Violado | Perfil social e identitário | migrante | boolean/select | não | núcleo | não | Violado | |
| Sujeito Violado | Perfil social e identitário | nacionalidade | select/autocomplete | não | núcleo | habilitar se migrante = sim | Violado | |
| Sujeito Violado | Perfil social e identitário | naturalidade | text/select | não | núcleo | habilitar se migrante = sim | Violado | |
| Sujeito Violado | Perfil social e identitário | segmento_lgbtqiapn | select/multiselect | não | núcleo | opcional | Violado | no CEMARIS aparece como segmento LGBTQIAPN+; no SINAN aparece com outra nomenclatura correlata |
| Sujeito Violado | Perfil social e identitário | identidade_genero | select | não | núcleo | opcional | Violado | |
| Sujeito Violado | Perfil social e identitário | gestante | select | não | condicional SINAN | exibir quando aplicável | Violado | estratégico |
| Sujeito Violado | Perfil social e identitário | pcd_deficiencia_transtorno | boolean/select | não | núcleo | não | Violado | |
| Sujeito Violado | Perfil social e identitário | tipo_deficiencia | select dependente | não | núcleo | habilitar se pcd_deficiencia_transtorno = sim | Violado | |
| Sujeito Violado | Perfil social e identitário | transtorno_mental_comportamento | select | não | condicional SINAN | exibir quando aplicável | Violado | |
| Sujeito Violado | Perfil social e identitário | grupo_populacional_gptes | multiselect | não | condicional CEMARIS | opcional | Violado | |
| Sujeito Violado | Perfil social e identitário | recebe_bpc | select | não | condicional CEMARIS | opcional | Violado | |
| Sujeito Violado | Perfil social e identitário | participa_transferencia_renda | select | não | condicional CEMARIS | opcional | Violado | |
| Sujeito Violado | Perfil social e identitário | medida_socioeducativa_meio_aberto | select | não | condicional CEMARIS | opcional | Violado | |

---

## Aba 3. Violência / Violação

### Seção: Lista de violações

| Aba | Seção | Campo | Tipo de input | Obrigatório | Origem | Regra condicional | Entidade backend | Observações |
|---|---|---|---|---|---|---|---|---|
| Violência / Violação | Lista de violações | violacoes[] | lista dinâmica / select agrupado | sim | núcleo | múltiplos itens | Violacao | uma notificação pode conter múltiplas violações |

### Seção: Qualificação da violência

| Aba | Seção | Campo | Tipo de input | Obrigatório | Origem | Regra condicional | Entidade backend | Observações |
|---|---|---|---|---|---|---|---|---|
| Violência / Violação | Qualificação | motivacao_violencia | select | não | condicional SINAN | opcional | Notificacao | padronizar catálogo |
| Violência / Violação | Qualificação | ocorreu_outras_vezes | select | não | condicional SINAN | opcional | Notificacao | manter no núcleo operacional |
| Violência / Violação | Qualificação | lesao_autoprovocada | select | não | condicional SINAN | exibir quando aplicável | Notificacao | |
| Violência / Violação | Qualificação | meio_agressao | select | não | condicional SINAN | opcional | Notificacao | |
| Violência / Violação | Qualificação | local_ocorrencia_tipificado | select | não | condicional SINAN | opcional | Notificacao | |
| Violência / Violação | Qualificação | violencia_relacionada_ao_trabalho | select | não | condicional SINAN | opcional | Notificacao | |
| Violência / Violação | Qualificação | cat_acidente_trabalho | select | não | condicional SINAN | habilitar se violencia_relacionada_ao_trabalho = sim | Notificacao | |

### Seção: Bloco de violência sexual

| Aba | Seção | Campo | Tipo de input | Obrigatório | Origem | Regra condicional | Entidade backend | Observações |
|---|---|---|---|---|---|---|---|---|
| Violência / Violação | Violência sexual | houve_violencia_sexual | boolean/select | não | núcleo | pode ser derivado das violações | Notificacao | |
| Violência / Violação | Violência sexual | subtipo_violencia_sexual | multiselect | não | núcleo | habilitar se houve_violencia_sexual = sim | Notificacao | abuso / exploração / estupro / etc. |
| Violência / Violação | Violência sexual | procedimentos_saude_relacionados | multiselect | não | condicional SINAN | habilitar se houve_violencia_sexual = sim | Notificacao | bloco técnico |

---

## Aba 4. Violador / Provável Autor

### Seção: Resumo do envolvimento

| Aba | Seção | Campo | Tipo de input | Obrigatório | Origem | Regra condicional | Entidade backend | Observações |
|---|---|---|---|---|---|---|---|---|
| Violador / Provável Autor | Resumo | numero_envolvidos | number | não | condicional SINAN | opcional | Notificacao | |

### Seção: Lista de violadores

| Aba | Seção | Campo | Tipo de input | Obrigatório | Origem | Regra condicional | Entidade backend | Observações |
|---|---|---|---|---|---|---|---|---|
| Violador / Provável Autor | Lista de violadores | violadores[] | lista dinâmica | não | núcleo | múltiplos itens | Violador | uma notificação pode conter múltiplos violadores |

### Seção: Dados do violador

| Aba | Seção | Campo | Tipo de input | Obrigatório | Origem | Regra condicional | Entidade backend | Observações |
|---|---|---|---|---|---|---|---|---|
| Violador / Provável Autor | Dados do violador | sexo_violador | select | não | núcleo | por item da lista | Violador | |
| Violador / Provável Autor | Dados do violador | raca_etnia_violador | select | não | condicional CEMARIS | por item da lista | Violador | manter no modelo |
| Violador / Provável Autor | Dados do violador | idade_ciclo_vida_violador | select | não | núcleo | por item da lista | Violador | |
| Violador / Provável Autor | Dados do violador | parentesco_vinculo | select | não | núcleo | por item da lista | Violador | |
| Violador / Provável Autor | Dados do violador | suspeita_uso_alcool | select | não | condicional SINAN | por item da lista | Violador | |

---

## Aba 5. Encaminhamento e Acompanhamento

### Seção: Encaminhamentos

| Aba | Seção | Campo | Tipo de input | Obrigatório | Origem | Regra condicional | Entidade backend | Observações |
|---|---|---|---|---|---|---|---|---|
| Encaminhamento e Acompanhamento | Encaminhamentos | encaminhamentos[] | multiselect/checklist | não | condicional SINAN | opcional | Notificacao | manter como bloco municipal importante |

### Seção: Acompanhamento do caso

| Aba | Seção | Campo | Tipo de input | Obrigatório | Origem | Regra condicional | Entidade backend | Observações |
|---|---|---|---|---|---|---|---|---|
| Encaminhamento e Acompanhamento | Acompanhamento | status_acompanhamento | select | não | condicional CEMARIS | opcional | Notificacao | importante para assistência |
| Encaminhamento e Acompanhamento | Acompanhamento | local_acompanhamento | select | não | condicional CEMARIS | opcional | Notificacao | |
| Encaminhamento e Acompanhamento | Acompanhamento | servico_inserido | select/autocomplete | não | condicional CEMARIS | opcional | Notificacao | |
| Encaminhamento e Acompanhamento | Acompanhamento | situacao_ruptura_psr | select | não | condicional CEMARIS | exibir quando aplicável | Notificacao | |
| Encaminhamento e Acompanhamento | Acompanhamento | outra_situacao | text | não | condicional CEMARIS | habilitar se situacao_ruptura_psr = outro | Notificacao | |
| Encaminhamento e Acompanhamento | Acompanhamento | data_encerramento | date | não | condicional SINAN | opcional | Notificacao | |

### Seção: Observações finais

| Aba | Seção | Campo | Tipo de input | Obrigatório | Origem | Regra condicional | Entidade backend | Observações |
|---|---|---|---|---|---|---|---|---|
| Encaminhamento e Acompanhamento | Observações finais | observacoes_finais | textarea | não | estratégico municipal | opcional | Notificacao | texto livre complementar |

---

## Aba 6. Blocos Técnicos Condicionais

### Subbloco SINAN

| Aba | Seção | Campo | Tipo de input | Obrigatório | Origem | Regra condicional | Entidade backend | Observações |
|---|---|---|---|---|---|---|---|---|
| Blocos Técnicos Condicionais | SINAN | cid10 | autocomplete/select | não | condicional SINAN | exibir por perfil/necessidade | Notificacao | bloco técnico |
| Blocos Técnicos Condicionais | SINAN | circunstancia_lesao | select | não | condicional SINAN | exibir por perfil/necessidade | Notificacao | |
| Blocos Técnicos Condicionais | SINAN | notificador_funcao_assinatura | text | não | condicional SINAN | exibir por perfil/necessidade | Notificacao | dado administrativo |

### Subbloco CEMARIS

| Aba | Seção | Campo | Tipo de input | Obrigatório | Origem | Regra condicional | Entidade backend | Observações |
|---|---|---|---|---|---|---|---|---|
| Blocos Técnicos Condicionais | CEMARIS | psr_sem_documentacao | bloco específico | não | condicional CEMARIS | exibir quando aplicável | Notificacao | tratar como bloco especial |

---

## MVP recomendado

### Campos mínimos do MVP
- data_notificacao
- data_ocorrencia
- orgao_notificante
- unidade_notificadora
- nome
- data_nascimento
- sexo
- raca_cor_etnia
- violacoes[]
- violadores[]
- status_acompanhamento ou encaminhamentos[]
- observacoes_finais

### Campos importantes para entrar cedo
- nome_social
- nome_mae
- endereco/residência
- migrante / nacionalidade / naturalidade
- identidade_genero
- pcd / tipo_deficiencia
- meio_agressao
- ocorreu_outras_vezes
- parentesco_vinculo
- servico_inserido

---

## Observações de implementação

### Frontend
- usar campos condicionais para reduzir o peso visual do formulário;
- organizar campos por seções e fieldsets;
- manter consistência dos nomes de chave do `formData`;
- priorizar selects padronizados para campos analíticos.

### Backend
- manter `Notificacao` como entidade central;
- usar relações para `Violacao` e `Violador`;
- manter `Violado` vinculado diretamente à notificação;
- preparar o modelo para futura exportação e auditoria.

### Banco de dados
- priorizar campos estruturados em vez de texto livre;
- permitir derivação de indicadores;
- manter espaço para futura trilha de auditoria.
