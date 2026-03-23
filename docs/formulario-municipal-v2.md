# Formulário Municipal v2.1

## 1. Objetivo

Este documento define a especificação funcional do **registro municipal de notificações de violência e violação de direitos**.

Seu papel é descrever:
- o modelo de entrada do caso no sistema municipal;
- os blocos de informação do registro;
- as regras de exibição por perfil de usuário;
- as regras de derivação;
- as regras de classificação automática para uso municipal e para integração futura com CEMARIS e SINAN.

Este documento **não** define, campo a campo, a exportação para sistemas externos. Essa função pertence ao documento `mapeamento-cemaris-sinan.md`.

---

## 2. Relação com os demais documentos

### 2.1. Documento superior
`decisoes-arquiteturais.md`

### 2.2. Documento complementar de integração
`mapeamento-cemaris-sinan.md`

### 2.3. Função deste documento
Definir a estrutura funcional do **registro municipal**, priorizando:
- usabilidade para a ponta;
- base municipal consistente;
- redução de retrabalho;
- preparação para integrações futuras.

---

## 3. Premissas do registro municipal

1. A **notificação municipal** é a entidade central do sistema.
2. Cada notificação representa **um evento registrado para uma pessoa violada**.
3. Uma notificação pode conter **múltiplas violações**.
4. Uma notificação pode conter **múltiplos violadores**.
5. O sistema municipal possui **modelo próprio**.
6. O sistema não deve depender de **complementação manual obrigatória posterior** para que a notificação exista.
7. Toda notificação salva já deve ser válida, no mínimo, como **registro municipal**.
8. A exportação para CEMARIS e SINAN é **oportunista**, não obrigatória.
9. O sistema deve calcular automaticamente se a notificação está:
   - apta para CEMARIS;
   - apta para SINAN;
   - apta para ambos;
   - ou utilizável apenas como base municipal.
10. A experiência da ponta deve ser **mais simples** do que a experiência de gestão e integração.
11. Sempre que possível:
   - campos administrativos devem ser capturados automaticamente;
   - campos derivados devem ser calculados;
   - o usuário não deve repetir informação já preenchida.
12. O foco principal do sistema é gerar **base municipal útil para análise, gestão e articulação da rede**.

---

## 4. Conceitos fundamentais

### 4.1. Registro municipal
É o registro principal do caso dentro do sistema.

### 4.2. Porta de entrada
É a forma como um determinado perfil institucional acessa e preenche o registro municipal.

### 4.3. Aptidão para destino externo
É a classificação automática que indica se a notificação possui informação suficiente para uso em:
- CEMARIS;
- SINAN;
- ambos;
- ou somente base municipal.

### 4.4. Dado municipal x valor de exportação
O sistema deve distinguir o **dado real armazenado no banco municipal** do **valor convertido para exportação**, quando necessário.

Exemplo:
- no banco municipal: `nao_informado_pelo_orgao_notificante`
- na exportação para destino externo: `sem informação`, se o sistema de destino permitir.

---

## 5. Classificação dos campos

Os campos do registro municipal serão classificados em cinco categorias:

### 5.1. Campo nuclear
Campo essencial ao modelo municipal.

### 5.2. Campo condicional
Campo exibido apenas em certas situações, conforme regra de negócio.

### 5.3. Campo derivado
Campo calculado a partir de outro(s), preferencialmente sem digitação manual.

### 5.4. Campo administrativo
Campo preenchido automaticamente pelo sistema, usuário logado, vínculo institucional ou auditoria.

### 5.5. Campo de integração
Campo mantido para apoiar integração com sistemas externos, sem necessidade de compor o núcleo principal da experiência da ponta.

---

## 6. Estrutura geral do registro municipal

O registro municipal será organizado nos seguintes blocos:

1. **Registro e contexto da notificação**
2. **Pessoa violada**
3. **Violência / violação**
4. **Provável autor / violador**
5. **Encaminhamento e situação inicial do caso**
6. **Complementos técnicos e de integração**

---

## 7. Portas de entrada do MVP

O sistema municipal deve possuir, no mínimo, três portas de entrada sobre a mesma base.

### 7.1. Porta de entrada Saúde
Exibe:
- núcleo municipal;
- campos necessários ou úteis ao fluxo de saúde;
- campos comuns aproveitáveis para CEMARIS;
- complementos técnicos de saúde, quando aplicáveis.

Não deve exigir:
- detalhamento socioassistencial que o profissional da saúde não tenha como responder no ato do atendimento.

### 7.2. Porta de entrada Assistência Social
Exibe:
- núcleo municipal;
- campos necessários ou úteis ao fluxo socioassistencial;
- acompanhamento inicial;
- vínculo com serviços/equipamentos, quando aplicável;
- blocos relevantes para CEMARIS.

Não deve exigir:
- detalhamento técnico específico da saúde que não pertença ao escopo do profissional da assistência.

### 7.3. Porta de entrada Outros Órgãos
Exibe:
- núcleo municipal reduzido;
- dados básicos do caso;
- informações mínimas de território, violação e contexto;
- observações livres.

Seu objetivo é:
- capturar o caso;
- reduzir perda de informação;
- permitir aproveitamento municipal posterior.

---

## 8. Especificação por bloco

# Bloco 1. Registro e contexto da notificação

## 8.1. Seção: Identificação do registro

| Campo | Tipo de input | Natureza | Obrigatório | Regra / observação |
|---|---|---|---|---|
| numero_registro | system / readonly | administrativo | sim | identificador interno do sistema |
| data_notificacao | date | nuclear | sim | data do registro |
| data_ocorrencia | date | nuclear | sim | data do fato ocorrido |
| hora_ocorrencia | time | condicional | não | útil para análise temporal e integração com saúde |
| usuario_preenchedor | system / readonly | administrativo | sim | capturado automaticamente |
| orgao_notificante | system / select restrito | administrativo + nuclear | sim | herdado do vínculo do usuário, sempre que possível |
| unidade_notificadora | system / select restrito | administrativo + nuclear | sim | herdado do vínculo do usuário, sempre que possível |
| tipo_unidade_notificadora | select | integração | não | útil principalmente para integração |
| observacoes_iniciais | textarea | nuclear | não | contexto livre inicial |

### Diretriz
Campos administrativos não devem ser digitados em texto livre, salvo exceções de implantação inicial.

---

## 8.2. Seção: Local e contexto da ocorrência

| Campo | Tipo de input | Natureza | Obrigatório | Regra / observação |
|---|---|---|---|---|
| municipio_notificacao | system / readonly / select | administrativo + nuclear | sim | preferencialmente derivado da unidade notificadora |
| municipio_ocorrencia | autocomplete/select | nuclear | não | município do fato |
| uf_ocorrencia | select | derivado / nuclear | não | derivável do município |
| local_ocorrencia_tipificado | select | condicional | não | residência, via pública, escola, unidade institucional etc. |
| logradouro_ocorrencia | text | nuclear | não | |
| numero_ocorrencia | text | nuclear | não | |
| complemento_ocorrencia | text | nuclear | não | |
| bairro_ocorrencia | text | nuclear | não | importante para análise territorial |
| ponto_referencia_ocorrencia | text | condicional | não | |
| zona_ocorrencia | select | condicional | não | urbana, rural, periurbana etc. |
| local_coleta | select | integração | não | importante sobretudo para lógica do CEMARIS |

### Diretriz
Não fundir:
- local da ocorrência;
- residência da pessoa violada;
- local de coleta.

---

# Bloco 2. Pessoa violada

## 9.1. Seção: Identificação básica

| Campo | Tipo de input | Natureza | Obrigatório | Regra / observação |
|---|---|---|---|---|
| nome_civil | text | nuclear | sim | |
| nome_social | text | nuclear | não | |
| nome_mae | text | nuclear | não | importante para identificação |
| data_nascimento | date | nuclear | sim | preferencialmente informada quando conhecida |
| idade_anos | number / readonly | derivado | não | calculada a partir da data de nascimento |
| ciclo_vida_municipal | readonly / derivado | derivado | não | calculado conforme regra municipal própria |
| sexo | select | nuclear | sim | |
| estado_civil | select | nuclear | não | |
| raca_cor | select | nuclear | sim | campo analítico prioritário |
| etnia | text / select | condicional | não | manter separado de raça/cor quando fizer sentido |
| ocupacao | autocomplete/text | nuclear | não | |
| escolaridade | select | nuclear | não | |

### Diretriz
A base municipal deve priorizar `data_nascimento` como fonte principal para derivação de faixas e ciclos.

---

## 9.2. Seção: Documentação e contato

| Campo | Tipo de input | Natureza | Obrigatório | Regra / observação |
|---|---|---|---|---|
| cpf | text/mask | condicional | não | dado sensível |
| nis | text | condicional | não | útil para assistência |
| pis_pasep | text | integração | não | uso restrito |
| certidao_nascimento | text | integração | não | não priorizar no MVP |
| cartao_sus | text | integração | não | útil para saúde |
| telefone_principal | text/mask | nuclear | não | |
| telefone_secundario | text/mask | condicional | não | |
| email | email | condicional | não | |

### Diretriz
Documentos não devem bloquear o registro municipal.

---

## 9.3. Seção: Residência e território

| Campo | Tipo de input | Natureza | Obrigatório | Regra / observação |
|---|---|---|---|---|
| cep | text/mask | nuclear | não | |
| logradouro_residencia | text | nuclear | não | |
| numero_residencia | text | nuclear | não | |
| complemento_residencia | text | nuclear | não | |
| bairro_residencia | text | nuclear | não | |
| distrito_localidade_residencia | text/select | condicional | não | |
| ponto_referencia_residencia | text | condicional | não | |
| municipio_residencia | autocomplete/select | nuclear | não | |
| uf_residencia | select | derivado / nuclear | não | |
| pais_residencia | autocomplete/select | condicional | não | |
| zona_residencia | select | condicional | não | |
| situacao_territorial_residencia | select | nuclear | não | substitui o uso ambíguo de “migrante” |

### Catálogo recomendado para `situacao_territorial_residencia`
- reside no mesmo município da notificação;
- reside em outro município do mesmo estado;
- reside em outro estado;
- reside em outro país;
- em situação de rua / sem residência fixa;
- não informado.

---

## 9.4. Seção: Perfil social, identitário e condições específicas

| Campo | Tipo de input | Natureza | Obrigatório | Regra / observação |
|---|---|---|---|---|
| orientacao_sexual | select | condicional | não | exibir conforme contexto e regras do perfil |
| identidade_genero | select | condicional | não | |
| segmento_lgbtqiapn_autodeclarado | select | condicional | não | não inferir automaticamente |
| gestante | select | condicional | não | exibir quando aplicável |
| possui_deficiencia_ou_transtorno | select | nuclear | não | sim / não / não informado |
| tipos_deficiencia_transtorno[] | multiselect | condicional | não | habilitar se houver deficiência/transtorno |
| grupo_populacional_gptes[] | multiselect | condicional | não | útil sobretudo para assistência |
| recebe_bpc | select | condicional | não | |
| participa_transferencia_renda | select | condicional | não | |
| medida_socioeducativa_meio_aberto | select | condicional | não | |
| em_situacao_de_rua | select | condicional | não | importante para regras específicas da assistência |

### Diretriz
Campos identitários devem permanecer separados:
- orientação sexual;
- identidade de gênero;
- segmento LGBTQIAPN+ autodeclarado.

---

# Bloco 3. Violência / violação

## 10.1. Seção: Lista principal de violações

| Campo | Tipo de input | Natureza | Obrigatório | Regra / observação |
|---|---|---|---|---|
| violacoes[] | lista dinâmica / multiselect estruturado | nuclear | sim | uma notificação pode conter múltiplas violações |

### Diretriz
O catálogo municipal deve guardar o máximo de detalhe útil.  
A exportação pode consolidar categorias quando o destino externo exigir.

Exemplo:
- `abandono`
- `negligência`

podem permanecer separados na base municipal e serem transformados para um único valor em determinado destino.

---

## 10.2. Seção: Qualificação do evento

| Campo | Tipo de input | Natureza | Obrigatório | Regra / observação |
|---|---|---|---|---|
| ocorreu_outras_vezes | select | nuclear | não | informação relevante para análise |
| motivacao_violencia | select | condicional | não | catálogo padronizado |
| meio_agressao[] | multiselect | condicional | não | permitir múltiplos meios |
| lesao_autoprovocada | select | condicional | não | importante para alguns fluxos |
| violencia_relacionada_ao_trabalho | select | condicional | não | |
| cat_acidente_trabalho | select | condicional | não | habilitar se violência relacionada ao trabalho = sim |

---

## 10.3. Seção: Violência sexual

| Campo | Tipo de input | Natureza | Obrigatório | Regra / observação |
|---|---|---|---|---|
| houve_violencia_sexual | boolean/select / readonly assistido | derivado + assistido | não | inferível a partir das violações |
| subtipos_violencia_sexual[] | multiselect | condicional | não | habilitar se houver violência sexual |
| procedimentos_saude_relacionados[] | multiselect | integração | não | bloco útil para saúde |
| observacao_violencia_sexual | textarea | condicional | não | contextualização complementar |

---

# Bloco 4. Provável autor / violador

## 11.1. Seção: Resumo do envolvimento

| Campo | Tipo de input | Natureza | Obrigatório | Regra / observação |
|---|---|---|---|---|
| numero_envolvidos_informado | number | integração | não | campo-resumo opcional |

---

## 11.2. Seção: Lista de violadores

| Campo | Tipo de input | Natureza | Obrigatório | Regra / observação |
|---|---|---|---|---|
| violadores[] | lista dinâmica | nuclear | não | zero, um ou vários violadores |

---

## 11.3. Seção: Campos por item de violador

| Campo | Tipo de input | Natureza | Obrigatório | Regra / observação |
|---|---|---|---|---|
| sexo_violador | select | nuclear | não | |
| idade_aproximada_violador | number | condicional | não | quando não houver idade precisa |
| ciclo_vida_violador | readonly / derivado assistido | derivado | não | derivado da idade aproximada |
| raca_cor_violador | select | condicional | não | |
| parentesco_vinculo | select | nuclear | não | catálogo padronizado |
| parentesco_vinculo_outro | text | condicional | não | habilitar quando necessário |
| suspeita_uso_alcool | select | condicional | não | |

### Diretriz
O sistema municipal pode manter detalhamento maior do que o sistema de destino.

---

# Bloco 5. Encaminhamento e situação inicial do caso

## 12.1. Seção: Encaminhamentos realizados

| Campo | Tipo de input | Natureza | Obrigatório | Regra / observação |
|---|---|---|---|---|
| encaminhamentos[] | multiselect / checklist | nuclear | não | importante para gestão da rede |
| encaminhamento_outro | text | condicional | não | habilitar quando necessário |

---

## 12.2. Seção: Situação inicial do caso

| Campo | Tipo de input | Natureza | Obrigatório | Regra / observação |
|---|---|---|---|---|
| status_acompanhamento_inicial | select | nuclear | não | estado resumido do caso no momento do registro |
| local_acompanhamento_inicial | select | condicional | não | |
| servicos_vinculados[] | multiselect | condicional | não | serviços/equipamentos conhecidos naquele momento |
| data_encerramento | date | condicional | não | quando houver encerramento formal |
| observacoes_finais | textarea | nuclear | não | observações complementares |

### Diretriz
Esta seção representa a **situação inicial conhecida no momento do registro**, e não um histórico completo de acompanhamento.

---

## 12.3. Seção: Regras específicas da assistência

| Campo | Tipo de input | Natureza | Obrigatório | Regra / observação |
|---|---|---|---|---|
| situacao_ruptura_psr | select | condicional | não | habilitar quando aplicável |
| outra_situacao_psr | text | condicional | não | habilitar quando necessário |

---

# Bloco 6. Complementos técnicos e de integração

Este bloco deve ser secundário na experiência da ponta e aparecer conforme:
- perfil de usuário;
- necessidade do fluxo;
- tipologia do caso;
- lógica de integração.

## 13.1. Subbloco: Complementos técnicos de saúde

| Campo | Tipo de input | Natureza | Obrigatório | Regra / observação |
|---|---|---|---|---|
| cid10 | autocomplete/select | integração | não | útil para saúde |
| circunstancia_lesao | select | integração | não | |
| notificador_funcao_assinatura | text | integração | não | dado administrativo complementar |

## 13.2. Subbloco: Complementos técnicos da assistência

| Campo | Tipo de input | Natureza | Obrigatório | Regra / observação |
|---|---|---|---|---|
| psr_sem_documentacao | bloco específico | integração | não | relevante para lógica da assistência |
| observacoes_integracao | textarea | integração | não | apoio à exportação e conferência |

---

## 14. Regras de derivação

### 14.1. Idade
`idade_anos` deve ser calculada preferencialmente com base em:
1. `data_ocorrencia`, quando disponível;
2. `data_notificacao`, quando necessário.

### 14.2. Ciclo de vida municipal
`ciclo_vida_municipal` deve ser derivado de `idade_anos`, usando classificação municipal própria.

### 14.3. Ciclos de vida por destino
As classificações etárias exigidas por CEMARIS e SINAN devem ser derivadas em camada de integração, sem substituir a base municipal.

### 14.4. Ciclo de vida do violador
`ciclo_vida_violador` deve ser derivado de `idade_aproximada_violador`, quando houver.

### 14.5. Violência sexual
`houve_violencia_sexual` deve ser sugerido automaticamente quando houver violação sexual na lista principal.

### 14.6. Campos administrativos
Campos administrativos devem ser preenchidos automaticamente sempre que possível.

---

## 15. Regras de exibição condicional

### 15.1. Exibir bloco de deficiência/transtorno quando
`possui_deficiencia_ou_transtorno = sim`

### 15.2. Exibir bloco de violência sexual quando
- houver item sexual em `violacoes[]`; ou
- `houve_violencia_sexual = sim`

### 15.3. Exibir bloco relacionado ao trabalho quando
`violencia_relacionada_ao_trabalho = sim`

### 15.4. Exibir bloco PSR quando
`em_situacao_de_rua = sim`

### 15.5. Exibir campos de saúde quando
- o perfil de entrada for saúde; ou
- o caso exigir detalhamento técnico de saúde.

### 15.6. Exibir campos da assistência quando
- o perfil de entrada for assistência; ou
- o caso exigir detalhamento socioassistencial disponível naquele momento.

---

## 16. Classificação automática da notificação

Ao salvar a notificação, o sistema deve classificá-la automaticamente em uma das seguintes situações:

- **base_municipal_somente**
- **apta_cemaris**
- **apta_sinan**
- **apta_cemaris_e_sinan**

### Diretriz
Essa classificação deve ocorrer automaticamente, sem depender de complementação manual obrigatória pela vigilância ou gestão.

### Observação
Os critérios detalhados de aptidão por destino devem ser definidos em regra própria e documentados em conjunto com o `mapeamento-cemaris-sinan.md`.

---

## 17. Tratamento de ausência de informação

O sistema municipal deve distinguir, sempre que possível:
- `nao_informado`
- `nao_conhecido_pelo_orgao_notificante`
- `nao_se_aplica`

### Diretriz
Na exportação para sistemas externos, esses valores podem ser convertidos para:
- `sem informação`
- `ignorado`
- ou equivalente

somente quando a regra do destino permitir.

---

## 18. Catálogos padronizados

O sistema deve utilizar catálogos padronizados, versionáveis e com códigos estáveis.

### Catálogos prioritários
- órgãos;
- unidades notificadoras;
- municípios;
- UF;
- local da ocorrência;
- zona;
- sexo;
- estado civil;
- raça/cor;
- escolaridade;
- orientação sexual;
- identidade de gênero;
- segmento LGBTQIAPN+ autodeclarado;
- tipos de deficiência/transtorno;
- grupos populacionais / GPTEs;
- violações;
- motivações da violência;
- meios de agressão;
- parentesco/vínculo do violador;
- encaminhamentos;
- status de acompanhamento;
- serviços/equipamentos.

---

## 19. MVP recomendado

## 19.1. Campos mínimos do MVP

### Registro e contexto
- data_notificacao
- data_ocorrencia
- orgao_notificante
- unidade_notificadora
- municipio_notificacao

### Pessoa violada
- nome_civil
- data_nascimento
- sexo
- raca_cor

### Violência / violação
- violacoes[]
- ocorreu_outras_vezes

### Provável autor / violador
- violadores[]
- parentesco_vinculo

### Encaminhamento e situação inicial
- encaminhamentos[] ou status_acompanhamento_inicial
- observacoes_finais

### Classificação automática
- base municipal somente
- apta para CEMARIS
- apta para SINAN
- apta para ambos

---

## 19.2. Campos recomendados para entrar cedo

- nome_social
- nome_mae
- telefone_principal
- endereço de residência
- bairro_residencia
- situacao_territorial_residencia
- identidade_genero
- orientacao_sexual
- possui_deficiencia_ou_transtorno
- tipos_deficiencia_transtorno[]
- meio_agressao[]
- motivacao_violencia
- local_ocorrencia_tipificado
- servicos_vinculados[]

---

## 20. Diretrizes de implementação

## 20.1. Frontend
- organizar a experiência por perfil de entrada;
- usar exibição condicional para reduzir peso visual;
- destacar campos automáticos, editáveis e derivados;
- evitar pedir ao usuário informação que ele não tem como saber;
- reaproveitar tudo o que já foi informado;
- manter consistência dos nomes das chaves no `formData`.

## 20.2. Backend
- manter `Notificacao` como entidade central;
- manter relações estruturadas para `Violacao` e `Violador`;
- vincular diretamente a pessoa violada à notificação;
- calcular automaticamente a aptidão por destino;
- separar valor municipal de valor de exportação, quando necessário;
- evitar armazenar como verdade canônica aquilo que deve ser derivado.

## 20.3. Banco de dados
- priorizar campos estruturados;
- manter catálogos estáveis;
- permitir derivação de indicadores e filtros;
- não acoplar a modelagem principal a um sistema externo;
- prever crescimento para histórico e auditoria sem exigir isso no MVP.

---

## 21. Síntese final

O Formulário Municipal v2.1 deve ser entendido como a especificação do **registro municipal canônico de notificações**, e não como simples reprodução de fichas externas.

Seu objetivo é:
- permitir entrada rápida e usável por diferentes perfis;
- reduzir retrabalho;
- gerar base municipal consistente;
- derivar e transformar informações quando necessário;
- e aproveitar automaticamente os dados para CEMARIS e SINAN quando houver suficiência.

O centro do sistema é o município.  
A integração com sistemas externos é importante, mas subordinada à utilidade municipal do registro.