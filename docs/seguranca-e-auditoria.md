# Segurança e Auditoria

## Contexto
O sistema lida com notificações de violência e violação de direitos, contendo dados pessoais e potencialmente sensíveis.
Por isso, segurança e auditoria são requisitos obrigatórios.

## Decisões já assumidas
- login será por usuário;
- órgão e unidade serão atributos institucionais;
- auditoria será obrigatória;
- o sistema deve suportar rastreabilidade de ações.

## Requisitos futuros de segurança

### Autenticação
- login individual por servidor;
- possibilidade de recuperação/troca de senha;
- proteção de endpoints da API;
- sessões/token de autenticação.

### Autorização
- perfis de acesso por tipo de usuário;
- vinculação por órgão e unidade;
- restrição de ações conforme perfil;
- controle de visualização e edição.

### Proteção de dados
- cuidado com exposição desnecessária de dados sensíveis;
- atenção a exportações;
- atenção a logs;
- evitar armazenamento local desnecessário no frontend.

### Backend
- validação no servidor;
- não confiar apenas em restrições visuais do frontend;
- controle de permissões por endpoint;
- tratamento de erros sem expor informações sensíveis.

### Frontend
- interface adaptada ao perfil do usuário;
- não mostrar ações não permitidas;
- cuidado com persistência em localStorage/sessionStorage;
- evitar cache indevido de dados sensíveis.

## Requisitos futuros de auditoria

### Campos mínimos por registro
- created_at
- updated_at
- created_by
- updated_by

### Eventos relevantes a registrar
- criação de notificação;
- edição de notificação;
- exclusão ou inativação;
- exportação de dados;
- autenticação e falhas relevantes.

### Histórico de alterações
O sistema deverá futuramente suportar histórico de mudanças relevantes, especialmente na entidade Notificacao.

## Observações importantes
- deleção deve ser tratada com cautela;
- considerar exclusão lógica em vez de exclusão física para registros críticos;
- auditoria deve ser pensada como camada transversal do sistema.
