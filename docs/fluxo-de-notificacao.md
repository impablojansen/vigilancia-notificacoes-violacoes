# Fluxo de Notificação

## Objetivo
Descrever o fluxo funcional básico do registro de uma notificação no sistema.

## Fluxo principal

### 1. Acesso ao sistema
O usuário autenticado acessa o sistema com seu perfil individual.

### 2. Início do registro
O usuário inicia uma nova notificação.

### 3. Preenchimento dos dados gerais
São preenchidos:
- servidor responsável;
- data;
- órgão;
- unidade notificadora.

### 4. Preenchimento dos dados do sujeito violado
São informados os dados da pessoa violada.

### 5. Registro das violações
O usuário seleciona uma ou mais violações relacionadas à notificação.

### 6. Registro dos violadores
O usuário adiciona um ou mais violadores, quando houver essa informação.

### 7. Preenchimento dos dados de acompanhamento
São informados os dados sobre acompanhamento, serviço e situação do caso.

### 8. Salvamento da notificação
A notificação é enviada ao backend e persistida no banco.

### 9. Uso posterior da base
Posteriormente, os dados poderão ser utilizados para:
- relatórios;
- dashboards;
- exportações para CEMARIS;
- exportações para SINAN;
- análises territoriais e temáticas.

## Regras funcionais já assumidas
- cada notificação corresponde a um indivíduo violado;
- a mesma pessoa pode ter múltiplas notificações em datas diferentes;
- uma notificação pode conter múltiplas violações;
- uma notificação pode conter múltiplos violadores.

## Futuras extensões do fluxo
- edição de notificação;
- autenticação e controle de perfil;
- auditoria;
- exportações;
- dashboards;
- filtros e relatórios.
