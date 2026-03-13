# Modelo de Dados

## Visão geral
O sistema é orientado a notificações.

Estrutura conceitual principal:

Notificação
- dados gerais
- sujeito violado
- violações
- violadores
- acompanhamento

## Entidades principais

### 1. Notificacao
Representa o evento central registrado no sistema.

Campos previstos:
- servidor
- data
- orgao
- unidade_notificadora
- motivo_violencia
- lesao_autoprovocada
- meio_agressao
- multipla_ocorrencia
- acompanhamento
- local_acompanhamento
- servico_inserido
- situacao_ruptura_psr
- outra_situacao
- created_at
- updated_at

### 2. Violado
Representa o sujeito violado vinculado à notificação.

Relação:
- 1 Notificacao -> 1 Violado

Campos previstos:
- nome
- nome_social
- nome_mae
- data_nasc
- cpf
- nis
- cartao_sus
- gestante
- is_migrante
- nacionalidade
- naturalidade
- estado_civil
- raca
- sexo
- segmento_lgbtqiapn
- identidade_genero
- is_pcd
- tipo_deficiencia
- deficiencia
- grau_instrucao
- ciclo_vida
- grupo_populacional

### 3. Violacao
Representa cada violação registrada dentro da notificação.

Relação:
- 1 Notificacao -> N Violacoes

Campos previstos:
- tipo

Observação:
O sistema deve permitir múltiplas violações em uma única notificação.

### 4. Violador
Representa cada violador relacionado à notificação.

Relação:
- 1 Notificacao -> N Violadores

Campos previstos:
- sexo
- raca_etnia
- parentesco
- ciclo_vida
- susp_alcool_drogas

## Considerações analíticas
O modelo deve permitir, futuramente:
- contagem de notificações por período;
- distribuição por tipo de violação;
- distribuição por unidade notificadora;
- distribuição por órgão;
- perfil do sujeito violado;
- perfil do violador;
- recorrência de notificações;
- relatórios por território e grupos populacionais.

## Princípios para evolução do modelo
- priorizar campos padronizados quando houver finalidade analítica;
- usar catálogos e listas controladas sempre que possível;
- evitar excesso de texto livre em campos críticos para relatórios;
- separar dado operacional, classificatório e derivado.
