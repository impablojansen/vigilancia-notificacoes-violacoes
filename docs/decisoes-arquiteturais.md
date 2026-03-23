# Decisões Arquiteturais

## 1. Objetivo do sistema

Construir um sistema municipal de notificações de violência e violação de direitos, com foco em:

- registro operacional por múltiplos órgãos da rede de garantia de direitos;
- consolidação municipal dos dados;
- apoio à geração de relatórios, dashboards e análises;
- redução de retrabalho entre setores;
- aproveitamento dos dados para integração futura com sistemas como CEMARIS e SINAN.

---

## 2. Princípio central do projeto

O sistema tem como finalidade principal servir ao **município**.

CEMARIS e SINAN são referências importantes e destinos de integração relevantes, mas **não** devem definir a arquitetura central do sistema.

O sistema municipal deve:
- produzir uma base própria e utilizável;
- apoiar a articulação intersetorial;
- permitir reaproveitamento inteligente dos dados já registrados;
- e exportar/apoiar lançamentos externos quando houver suficiência de informação.

---

## 3. Decisões já assumidas

### 3.1. A notificação municipal é a entidade central
O sistema é orientado ao registro de notificações.

Cada notificação representa um evento registrado em determinado contexto temporal e institucional.

---

### 3.2. Uma notificação corresponde a uma pessoa violada em um evento
O registro é feito por sujeito violado.

Se a mesma pessoa sofrer nova ocorrência em outra data, será gerada nova notificação.

---

### 3.3. Uma notificação pode conter múltiplas violações
Exemplo:
- violência doméstica física;
- violência doméstica psicológica;
- ameaça de morte.

Todas podem coexistir dentro da mesma notificação.

---

### 3.4. Uma notificação pode conter múltiplos violadores
O sistema deve suportar:
- nenhum violador identificado;
- um violador;
- múltiplos violadores.

---

### 3.5. O sistema terá modelo próprio
O banco de dados, os catálogos e o registro municipal não serão cópia literal do CEMARIS nem do SINAN.

O sistema municipal terá seu próprio modelo, com posterior mapeamento para integração e exportação.

---

### 3.6. Exportação será uma camada posterior
A exportação para CEMARIS e SINAN será tratada como camada de transformação posterior, e não como base da modelagem principal.

---

### 3.7. O sistema não dependerá de qualificação manual obrigatória posterior
Toda notificação salva já deve existir como **registro municipal válido**.

O funcionamento do sistema não pode depender de uma rotina permanente de revisão manual por parte da vigilância ou da gestão para que os registros tenham utilidade.

---

### 3.8. A exportação será oportunista, não obrigatória
Sempre que uma notificação possuir informação suficiente, ela poderá ser considerada apta para uso em CEMARIS e/ou SINAN.

Quando não houver suficiência de informação para sistemas externos, a notificação continuará válida para a base municipal.

---

### 3.9. A aptidão para sistemas externos será calculada automaticamente
O sistema deverá classificar automaticamente cada notificação em uma destas situações:

- base municipal somente;
- apta para CEMARIS;
- apta para SINAN;
- apta para ambos.

Essa classificação não deve depender de avaliação manual obrigatória caso a caso.

---

### 3.10. O sistema distinguirá dado municipal de valor de exportação
A informação armazenada no banco municipal pode ser diferente do valor convertido para exportação.

Exemplo:
- no banco municipal: `nao_conhecido_pelo_orgao_notificante`;
- na exportação: `sem informação`, quando o sistema de destino permitir.

---

### 3.11. O sistema aceitará assimetria entre setores
Saúde, assistência social e outros órgãos não possuem as mesmas condições de responder às mesmas perguntas no momento do registro.

Essa assimetria deve ser aceita como característica real do processo de trabalho, e não tratada como erro do usuário.

---

### 3.12. A experiência da ponta será diferente da experiência de gestão
Quem registra o caso na ponta deve ter uma experiência:
- mais simples;
- mais rápida;
- menos carregada de tecnicalidades.

Já as camadas de gestão, análise e integração poderão acessar informações adicionais e classificações derivadas.

---

### 3.13. O sistema terá portas de entrada por perfil
A mesma base municipal deverá suportar diferentes portas de entrada, no mínimo:

- saúde;
- assistência social;
- outros órgãos.

Cada porta de entrada exibirá os blocos e campos mais compatíveis com o contexto de trabalho daquele perfil.

---

### 3.14. Login será por usuário, não por órgão
Cada servidor terá seu próprio acesso.

Órgão, unidade e perfil de entrada serão atributos do usuário e/ou do vínculo institucional.

---

### 3.15. Auditoria é requisito obrigatório
O sistema deverá registrar, progressivamente:
- quem criou;
- quem alterou;
- quando criou;
- quando alterou;
- histórico de mudanças relevantes;
- logs de exportação, quando houver.

No MVP, o mínimo obrigatório é:
- usuário criador;
- data/hora de criação;
- usuário da última alteração;
- data/hora da última alteração.

---

### 3.16. O projeto deve nascer modular
Se o projeto for bem-sucedido, poderá se tornar um módulo dentro de um sistema maior da Secretaria de Assistência Social.

Por isso, a arquitetura deve ser modular, desacoplada e preparada para crescimento.

---

## 4. Decisões de modelagem

### 4.1. O município guardará o dado mais detalhado possível
Sempre que fizer sentido, o modelo municipal deve armazenar o maior nível útil de detalhe.

Exemplo:
- `abandono`
- `negligência`

podem permanecer separados no modelo municipal, ainda que determinado sistema externo os consolide em um único campo.

---

### 4.2. A exportação poderá consolidar, transformar ou derivar
Na integração com sistemas externos, o sistema poderá:
- consolidar valores;
- derivar classificações;
- transformar catálogos;
- preencher equivalentes aceitos pelo destino;
- ou bloquear exportação quando a suficiência mínima não for atingida.

---

### 4.3. Faixas etárias e ciclos de vida serão derivados
O sistema deve armazenar, como base principal:
- data de nascimento;
- idade aproximada, quando necessário.

Classificações como faixa etária, ciclo de vida municipal, ciclo de vida do CEMARIS e ciclo de vida do SINAN devem ser derivadas em regra de negócio.

---

### 4.4. Catálogos serão canônicos, versionáveis e estáveis
Os catálogos do sistema municipal devem possuir:
- código estável;
- rótulo de exibição;
- agrupamento;
- ordem;
- situação de uso;
- e, quando necessário, correspondências com CEMARIS e SINAN.

---

### 4.5. O sistema deve priorizar campos estruturados
Sempre que possível, o registro deve usar:
- selects;
- multiselects;
- checklists;
- catálogos padronizados;
- campos derivados.

Textos livres devem ser usados apenas quando agregarem contexto indispensável.

---

## 5. Decisões operacionais do MVP

### 5.1. O MVP deve provar valor municipal antes de integração perfeita
O objetivo inicial não é reproduzir integralmente CEMARIS e SINAN dentro do sistema.

O objetivo inicial é:
- permitir registro municipal consistente;
- reduzir retrabalho;
- gerar base utilizável;
- e aproveitar automaticamente o que já estiver suficiente para integração.

---

### 5.2. O MVP deve reduzir fricção para a ponta
O preenchimento deve ser orientado por:
- simplicidade;
- clareza;
- contexto do usuário;
- e reaproveitamento máximo de dados já informados.

---

### 5.3. O MVP não criará fila estrutural de pendências para as vigilâncias
Não se deve presumir que as vigilâncias municipais terão tempo ou equipe para completar sistematicamente os casos após o registro inicial.

O desenho do sistema deve respeitar essa limitação real.

---

### 5.4. O sistema deve continuar útil mesmo sem exportação
Ainda que nenhum caso seja exportado em determinado período, o sistema deve continuar produzindo valor municipal por meio de:
- consultas;
- filtros;
- relatórios;
- contagens;
- territorialização;
- e análise básica de padrões.

---

### 5.5. O sistema deve permitir expansão futura
Funcionalidades como:
- exportação assistida;
- histórico de acompanhamento;
- módulos de análise avançada;
- dashboards gerenciais;
- e auditoria ampliada

devem ser previstas arquiteturalmente, mas não precisam estar completas no MVP.

---

## 6. Stack adotada

- Frontend: Vue 3 + TypeScript + Vite + PrimeVue
- Backend: Django + Django REST Framework
- Banco de dados: PostgreSQL
- Infraestrutura de desenvolvimento: Docker

---

## 7. Diretrizes de crescimento

- preservar consistência entre frontend, backend e banco;
- priorizar usabilidade para quem preenche;
- manter base de dados adequada para análises futuras;
- evitar retrabalho desnecessário entre setores;
- evitar decisões que amarrem o sistema a um único sistema externo;
- permitir evolução gradual sem reescrita completa da arquitetura.

---

## 8. Síntese final

O sistema municipal de notificações deve ser entendido como uma infraestrutura de registro e inteligência municipal, e não como mera reprodução de instrumentos externos.

Sua arquitetura precisa:
- respeitar a realidade operacional do município;
- aceitar assimetrias entre setores;
- evitar dependência de rotinas inviáveis de complementação manual;
- preservar um modelo canônico próprio;
- e aproveitar, de forma automática e estratégica, os dados que puderem subsidiar CEMARIS e SINAN.

O centro do projeto é o município.
As integrações externas são importantes, mas subordinadas à utilidade municipal do sistema.