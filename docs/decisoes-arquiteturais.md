# Decisões Arquiteturais

## Objetivo do sistema
Construir um sistema municipal de notificações de violência e violação de direitos, com foco em:
- registro operacional por múltiplos órgãos da rede de garantia de direitos;
- consolidação municipal dos dados;
- apoio à geração de relatórios, dashboards e exportações;
- suporte futuro ao preenchimento de sistemas como CEMARIS e SINAN.

## Decisões já assumidas

### 1. A notificação é a entidade central
O sistema é orientado ao registro de notificações.
Cada notificação representa um evento registrado em determinado contexto temporal e institucional.

### 2. Uma notificação corresponde a um indivíduo violado
O registro é feito por sujeito violado.
Se a mesma pessoa sofrer nova ocorrência em outra data, será gerada nova notificação.

### 3. Uma notificação pode conter múltiplas violações
Exemplo:
- violência doméstica física
- violência doméstica psicológica
- ameaça de morte

Todas podem existir dentro da mesma notificação.

### 4. Uma notificação pode conter múltiplos violadores
O sistema deve suportar mais de um violador por notificação.

### 5. O sistema terá modelo próprio
O banco de dados e o formulário não serão cópia literal do CEMARIS nem do SINAN.
O sistema municipal terá seu próprio modelo canônico, com posterior mapeamento para exportação.

### 6. Exportação será uma camada posterior
A exportação para CEMARIS e SINAN será tratada como camada de transformação posterior, e não como base da modelagem principal.

### 7. Login será por usuário, não por órgão
Cada servidor terá seu próprio acesso.
Órgão e unidade serão atributos do usuário e/ou do vínculo institucional.

### 8. Auditoria é requisito obrigatório
O sistema deverá futuramente registrar:
- quem criou;
- quem alterou;
- quando criou;
- quando alterou;
- histórico de mudanças relevantes.

### 9. O projeto deve nascer modular
Se o projeto for bem sucedido, poderá se tornar um módulo dentro de um sistema maior da Secretaria de Assistência Social.
Por isso, a arquitetura deve ser modular e desacoplada.

## Stack adotada
- Frontend: Vue 3 + Vite + PrimeVue
- Backend: Django + Django REST Framework
- Banco de dados: PostgreSQL
- Infraestrutura de desenvolvimento: Docker

## Diretrizes de crescimento
- preservar consistência entre frontend, backend e banco;
- priorizar usabilidade para quem preenche;
- manter base de dados adequada para análises futuras;
- evitar decisões que amarrem o sistema a um único sistema externo.
