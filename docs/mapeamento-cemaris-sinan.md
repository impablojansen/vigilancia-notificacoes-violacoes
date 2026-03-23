# Mapeamento CEMARIS / SINAN

## 1. Objetivo

Este documento define a lógica de correspondência entre o **modelo municipal** do sistema de notificações de violência e violação de direitos e os instrumentos externos **CEMARIS** e **SINAN – Violência Interpessoal/Autoprovocada**.

Seu objetivo é orientar:
- integrações futuras;
- exportações;
- preenchimento assistido;
- validações por destino;
- identificação de lacunas, equivalências parciais e campos derivados;
- regras de aptidão automática para uso em CEMARIS e SINAN.

Este documento **não** define a estrutura principal do registro municipal. Essa função pertence ao `formulario-municipal-v2.1.md`.

---

## 2. Relação com os demais documentos

### 2.1. Documento superior
`decisoes-arquiteturais.md`

### 2.2. Documento funcional principal
`formulario-municipal.md`

### 2.3. Função deste documento
Traduzir o modelo municipal para os sistemas externos, sem subordinar a modelagem principal às fichas externas.

---

## 3. Premissas do mapeamento

1. O sistema municipal possui **modelo canônico próprio**.
2. CEMARIS e SINAN são **destinos de integração**, não a base da modelagem principal.
3. Nem todo campo municipal terá equivalente direto em ambos os sistemas.
4. Nem todo campo dos sistemas externos precisa existir como campo nuclear do município.
5. A exportação é **oportunista**, e não obrigatória.
6. A notificação municipal continua válida mesmo quando não estiver apta para exportação.
7. A aptidão para destino externo será calculada automaticamente pelo sistema.
8. Campos administrativos, derivados ou capturados automaticamente devem ser tratados de forma diferente de campos de digitação direta.
9. Quando houver divergência conceitual entre CEMARIS e SINAN, o sistema municipal preservará sua lógica própria e documentará a transformação necessária.
10. O sistema municipal deve distinguir:
   - o **dado municipal armazenado**;
   - do **valor convertido para exportação**, quando necessário.

---

## 4. Fontes de referência

### 4.1. Sistema municipal
- `decisoes-arquiteturais.md`
- `formulario-municipal.md`

### 4.2. Sistemas externos
- Manual do CEMARIS
- Manual do SINAN – Violência Interpessoal/Autoprovocada

---

## 5. Tipos de correspondência adotados

### 5.1. Correspondência direta
Quando o campo municipal tem equivalente suficientemente compatível no sistema externo.

### 5.2. Correspondência parcial
Quando existe equivalência conceitual incompleta, exigindo adaptação, perda de detalhe ou interpretação controlada.

### 5.3. Correspondência por transformação
Quando o valor exportado precisa ser calculado, convertido, agrupado ou desdobrado.

### 5.4. Correspondência por derivação
Quando o valor no destino não é armazenado diretamente no município, mas pode ser derivado a partir de outros campos.

### 5.5. Sem equivalente direto
Quando o campo municipal não possui correspondência clara no destino externo.

### 5.6. Campo apenas do destino
Quando o sistema externo exige ou utiliza informação que não precisa existir como campo nuclear municipal.

---

## 6. Domínios canônicos municipais

Para fins de integração, o modelo municipal será lido a partir dos seguintes domínios:

1. **Registro e contexto da notificação**
2. **Pessoa violada**
3. **Violência / violação**
4. **Provável autor / violador**
5. **Encaminhamento e situação inicial do caso**
6. **Complementos técnicos e de integração**

---

## 7. Regras gerais de integração por destino

### 7.1. Integração com CEMARIS
A integração com CEMARIS deve priorizar:
- estruturação municipal dos riscos pessoais e sociais;
- local de coleta;
- dados do violado;
- ciclo de vida conforme regra de transformação para o CEMARIS;
- dados do violador;
- tipos de violência/riscos no padrão do CEMARIS;
- status e local do acompanhamento, quando disponíveis;
- campos específicos da assistência, quando aplicáveis.

### 7.2. Integração com SINAN
A integração com SINAN deve priorizar:
- lógica de notificação em saúde;
- campos obrigatórios, essenciais e chave do destino;
- qualificação do evento violento;
- provável autor;
- encaminhamentos;
- complementos técnicos da saúde.

### 7.3. Estratégia recomendada
A integração deve ocorrer por uma camada própria de transformação, preferencialmente com:
- validadores por destino;
- payloads específicos;
- logs de exportação;
- marcação de aptidão;
- indicação clara do que foi exportado automaticamente, do que foi preenchido assistidamente e do que permaneceu apenas na base municipal.

---

## 8. Mapeamento por domínio

# 8.1. Registro e contexto da notificação

| Campo canônico municipal | CEMARIS | SINAN | Tipo de correspondência | Observação |
|---|---|---|---|---|
| numero_registro | sem equivalente direto | número da ficha / identificador | parcial | id interno municipal |
| data_notificacao | sem equivalente central do instrumento | data da notificação | parcial | relevante sobretudo para SINAN |
| data_ocorrencia | data da ocorrência | data da ocorrência | direta | convergência forte |
| hora_ocorrencia | sem equivalente central | hora da ocorrência | parcial | útil sobretudo para saúde |
| usuario_preenchedor | responsável pelo preenchimento | notificador(a) / função / assinatura | parcial | dado administrativo |
| orgao_notificante | órgão | fonte notificadora / unidade | parcial | conceitos próximos, não idênticos |
| unidade_notificadora | parcialmente representada | unidade notificadora | parcial | exige compatibilização de catálogo |
| tipo_unidade_notificadora | sem equivalente central | unidade notificadora (tipo) | parcial | importante para SINAN |
| observacoes_iniciais | observação | observações complementares | parcial | texto livre |
| municipio_notificacao | município | município de notificação | direta | |
| municipio_ocorrencia | parcialmente dedutível pelo endereço | município da ocorrência | parcial | |
| uf_ocorrencia | sem equivalente central | UF da ocorrência | parcial | pode ser derivada |
| local_ocorrencia_tipificado | sem equivalente estruturado idêntico | local de ocorrência | parcial | catálogo municipal precisa ser transformado |
| logradouro_ocorrencia | logradouro | endereço da ocorrência | parcial | |
| numero_ocorrencia | número | número | parcial | |
| complemento_ocorrencia | complemento | complemento | parcial | |
| bairro_ocorrencia | bairro | bairro | parcial | |
| ponto_referencia_ocorrencia | sem equivalente claro | informação complementar | parcial | opcional |
| zona_ocorrencia | sem equivalente claro | zona | parcial | |
| local_coleta | local de coleta | sem equivalente direto | direta para CEMARIS / sem equivalente para SINAN | campo importante para CEMARIS |

---

# 8.2. Pessoa violada

## 8.2.1. Identificação básica

| Campo canônico municipal | CEMARIS | SINAN | Tipo de correspondência | Observação |
|---|---|---|---|---|
| nome_civil | nome completo | nome da vítima / atendido(a) | direta | |
| nome_social | nome social | nome social | direta | |
| nome_mae | nome da mãe | nome da mãe | direta | |
| data_nascimento | data de nascimento | data de nascimento / idade | direta | |
| idade_anos | não é o eixo principal | pode ser utilizada em conjunto com idade | derivada | preferir derivação municipal |
| ciclo_vida_municipal | ciclo de vida próprio do CEMARIS | ciclos com cortes próprios no SINAN | transformação | não exportar automaticamente sem regra |
| sexo | sexo | sexo | parcial | converter conforme catálogo do destino |
| estado_civil | estado civil | situação conjugal / estado civil | parcial | regras específicas no SINAN |
| raca_cor | raça/etnia | raça/cor | parcial | recomenda-se preservar base municipal |
| etnia | parcialmente embutido em raça/etnia | sem equivalente central padronizado | parcial / sem equivalente direto | |
| ocupacao | ocupação | ocupação | parcial | idealmente compatível com CBO |
| escolaridade | escolaridade | escolaridade | direta | |

## 8.2.2. Documentação e contato

| Campo canônico municipal | CEMARIS | SINAN | Tipo de correspondência | Observação |
|---|---|---|---|---|
| cpf | presente | não central | parcial | dado sensível |
| nis | presente | sem equivalente | direta para CEMARIS / sem equivalente para SINAN | |
| pis_pasep | presente | sem equivalente | direta para CEMARIS / sem equivalente para SINAN | uso restrito |
| certidao_nascimento | presente | sem equivalente | direta para CEMARIS / sem equivalente para SINAN | |
| cartao_sus | sem centralidade | presente / útil à saúde | parcial | importante para saúde |
| telefone_principal | presente | contato em alguns fluxos | parcial | útil para ambos |
| telefone_secundario | sem equivalente claro | sem equivalente claro | sem equivalente direto | conveniência municipal |
| email | presente | sem equivalente central | parcial | utilidade maior no fluxo municipal |

## 8.2.3. Residência e território

| Campo canônico municipal | CEMARIS | SINAN | Tipo de correspondência | Observação |
|---|---|---|---|---|
| cep | presente no cadastro da notificação / residência | presente | parcial | conferir contexto do endereço no destino |
| logradouro_residencia | parcialmente presente | presente | parcial | |
| numero_residencia | parcialmente presente | presente | parcial | |
| complemento_residencia | parcialmente presente | presente | parcial | |
| bairro_residencia | presente | presente | parcial | |
| distrito_localidade_residencia | sem equivalente claro | distrito / localidade | parcial | |
| ponto_referencia_residencia | sem equivalente claro | ponto de referência | parcial | |
| municipio_residencia | parcialmente presente | município de residência | parcial | |
| uf_residencia | sem centralidade explícita | UF de residência | parcial | |
| pais_residencia | não estruturado como eixo central | país | parcial | relevante para casos internacionais |
| zona_residencia | sem equivalente claro | zona | parcial | |
| situacao_territorial_residencia | não equivalente diretamente | não equivalente diretamente | transformação | substitui o uso ambíguo de “migrante” |

---

# 8.3. Perfil social, identitário e condições específicas

| Campo canônico municipal | CEMARIS | SINAN | Tipo de correspondência | Observação |
|---|---|---|---|---|
| orientacao_sexual | não como campo central equivalente | orientação sexual | parcial | no SINAN há regra etária própria |
| identidade_genero | identidade de gênero | identidade de gênero | direta | converter por catálogo |
| segmento_lgbtqiapn_autodeclarado | segmento LGBTQIAPN+ | sem equivalente direto igual | parcial | não confundir com orientação sexual |
| gestante | sem equivalente central | gestante | direta para SINAN / sem equivalente para CEMARIS | |
| possui_deficiencia_ou_transtorno | PCD | deficiência/transtorno | parcial | |
| tipos_deficiencia_transtorno[] | detalhamento possível | detalhamento possível | parcial | exige catálogo municipal |
| grupo_populacional_gptes[] | povos originários / comunidades tradicionais / GPTEs | sem equivalente central | direta para CEMARIS / sem equivalente para SINAN | |
| recebe_bpc | presente | sem equivalente | direta para CEMARIS / sem equivalente para SINAN | |
| participa_transferencia_renda | presente | sem equivalente | direta para CEMARIS / sem equivalente para SINAN | |
| medida_socioeducativa_meio_aberto | presente | sem equivalente | direta para CEMARIS / sem equivalente para SINAN | |
| em_situacao_de_rua | fortemente relacionado ao instrumento | sem equivalente direto como bloco próprio | parcial | relevante para assistência |

---

# 8.4. Violência / violação

## 8.4.1. Lista principal de violações

| Campo canônico municipal | CEMARIS | SINAN | Tipo de correspondência | Observação |
|---|---|---|---|---|
| violacoes[] | tipos de violência / riscos sociais | tipos de violência | parcial | convergência temática, não equivalência total |

### Regra
O catálogo municipal de `violacoes[]` deve ser tratado como **catálogo canônico próprio**, com tabela de correspondência separada para:
- código municipal;
- equivalente CEMARIS;
- equivalente SINAN;
- tipo de equivalência.

### Exemplo
O município pode manter:
- `abandono`
- `negligência`

como itens distintos no catálogo municipal, e transformar ambos em um único valor de exportação para o SINAN quando necessário.

## 8.4.2. Qualificação do evento

| Campo canônico municipal | CEMARIS | SINAN | Tipo de correspondência | Observação |
|---|---|---|---|---|
| ocorreu_outras_vezes | sem equivalente central | ocorreu outras vezes | direta para SINAN / sem equivalente para CEMARIS | |
| motivacao_violencia | sem equivalente central estruturado | motivação da violência | direta para SINAN / sem equivalente para CEMARIS | |
| meio_agressao[] | sem equivalente central | meio de agressão | direta para SINAN / sem equivalente para CEMARIS | |
| lesao_autoprovocada | sem equivalente central | lesão autoprovocada | direta para SINAN / sem equivalente para CEMARIS | |
| violencia_relacionada_ao_trabalho | parcialmente tangenciado | campo próprio | parcial | exige regra de transformação |
| cat_acidente_trabalho | sem equivalente | campo próprio | direta para SINAN / sem equivalente para CEMARIS | |

## 8.4.3. Violência sexual

| Campo canônico municipal | CEMARIS | SINAN | Tipo de correspondência | Observação |
|---|---|---|---|---|
| houve_violencia_sexual | inferível a partir dos tipos de violência | violência sexual | transformação | pode ser derivado |
| subtipos_violencia_sexual[] | abuso / exploração etc. | violência sexual e detalhamentos correlatos | parcial | requer tabela de correspondência |
| procedimentos_saude_relacionados[] | sem equivalente | procedimentos realizados | direta para SINAN / sem equivalente para CEMARIS | |
| observacao_violencia_sexual | observação | observações | parcial | |

---

# 8.5. Provável autor / violador

| Campo canônico municipal | CEMARIS | SINAN | Tipo de correspondência | Observação |
|---|---|---|---|---|
| numero_envolvidos_informado | sem equivalente central | número de envolvidos | parcial | campo-resumo |
| violadores[] | dados do violador | provável autor da violência | parcial | granularidades diferentes |
| sexo_violador | presente | sexo do provável autor | direta | |
| idade_aproximada_violador | pode ser informada indiretamente | base para ciclo do provável autor | parcial | |
| ciclo_vida_violador | sem equivalência padronizada idêntica | ciclo de vida do provável autor | transformação | cuidado com cortes etários |
| raca_cor_violador | presente | não central | direta para CEMARIS / sem equivalente forte para SINAN | |
| parentesco_vinculo | presente | vínculo/grau de parentesco | direta | exige tabela de equivalência |
| parentesco_vinculo_outro | possível em categorias abertas | especificação complementar | parcial | útil para integração |
| suspeita_uso_alcool | sem equivalente central | suspeita de uso de álcool | direta para SINAN / sem equivalente para CEMARIS | |

---

# 8.6. Encaminhamento e situação inicial do caso

| Campo canônico municipal | CEMARIS | SINAN | Tipo de correspondência | Observação |
|---|---|---|---|---|
| encaminhamentos[] | não como bloco idêntico | encaminhamento | parcial | alta utilidade para SINAN |
| encaminhamento_outro | observação / outro | especificação complementar | parcial | |
| status_acompanhamento_inicial | status do acompanhamento | sem equivalente direto | direta para CEMARIS / sem equivalente para SINAN | |
| local_acompanhamento_inicial | local de acompanhamento | sem equivalente direto | direta para CEMARIS / sem equivalente para SINAN | |
| servicos_vinculados[] | parcialmente refletido | parcialmente refletido | parcial | bom campo municipal |
| data_encerramento | sem equivalente central claro | encerramento/evolução conforme fluxo | parcial | |
| observacoes_finais | observação | observações complementares | parcial | |
| situacao_ruptura_psr | bloco próprio da assistência | sem equivalente | direta para CEMARIS / sem equivalente para SINAN | |
| outra_situacao_psr | texto complementar | sem equivalente | direta para CEMARIS / sem equivalente para SINAN | |

---

# 8.7. Complementos técnicos e de integração

| Campo canônico municipal | CEMARIS | SINAN | Tipo de correspondência | Observação |
|---|---|---|---|---|
| cid10 | sem equivalente | CID-10 / agravo | direta para SINAN / sem equivalente para CEMARIS | |
| circunstancia_lesao | sem equivalente | circunstância da lesão | direta para SINAN / sem equivalente para CEMARIS | |
| notificador_funcao_assinatura | responsável / órgão em outra lógica | função/assinatura do notificador | parcial | administrativo |
| psr_sem_documentacao | pessoas em situação de rua sem documentação | sem equivalente | direta para CEMARIS / sem equivalente para SINAN | |
| observacoes_integracao | sem equivalente direto | sem equivalente direto | sem equivalente direto | campo interno de apoio |

---

## 9. Aptidão automática por destino

### 9.1. Princípio geral
A aptidão automática não significa que a notificação está “perfeita”.  
Significa que ela possui **suficiência mínima operacional** para determinado destino, conforme as regras do sistema.

### 9.2. Saídas possíveis
Toda notificação deve ser classificada automaticamente em uma das seguintes situações:
- `base_municipal_somente`
- `apta_cemaris`
- `apta_sinan`
- `apta_cemaris_e_sinan`

---

## 10. Regra de aptidão para CEMARIS

### 10.1. Natureza da regra
Como o manual do CEMARIS não trabalha, no texto extraído, com a mesma tipologia explícita de “campo obrigatório / essencial / chave” do SINAN, a aptidão para CEMARIS deve ser definida no sistema como **mínimo operacional recomendado**, coerente com os blocos do instrumento.

### 10.2. Campos mínimos recomendados para `apta_cemaris`
A notificação poderá ser considerada `apta_cemaris` quando possuir, no mínimo:

#### Registro e contexto
- `data_ocorrencia`
- `local_coleta` **ou** informação suficiente para derivá-lo do órgão/unidade notificadora
- informação territorial mínima da ocorrência, preferencialmente:
  - `bairro_ocorrencia`, ou
  - `logradouro_ocorrencia`, ou
  - `cep`

#### Pessoa violada
- `nome_civil`
- `data_nascimento` **ou** base suficiente para derivar ciclo de vida
- `sexo`
- `raca_cor` ou equivalente municipal transformável

#### Violência / violação
- pelo menos um item em `violacoes[]` com correspondência para CEMARIS

#### Situação do caso
- quando o campo existir no instrumento de destino, aceitar:
  - `status_acompanhamento_inicial`, se conhecido;
  - ou valor convertível equivalente, quando o destino permitir.

### 10.3. Observação importante
Campos da assistência que o órgão notificante não conhece no momento do registro **não devem impedir o registro municipal**.  
Eles só impedem a exportação quando forem realmente indispensáveis para o destino e não houver valor conversível aceito.

---

## 11. Regra de aptidão para SINAN

### 11.1. Natureza da regra
No SINAN, a aptidão deve respeitar explicitamente os campos classificados pelo manual como obrigatórios, essenciais ou chave, com atenção especial aos obrigatórios condicionais.

### 11.2. Campos mínimos recomendados para `apta_sinan`
A notificação poderá ser considerada `apta_sinan` quando possuir, no mínimo:

#### Dados gerais e identificação da notificação
- `data_notificacao`
- `uf_notificacao` ou equivalente derivável
- `municipio_notificacao`
- `tipo_unidade_notificadora`
- `unidade_notificadora`
- `nome_unidade_notificadora` ou valor equivalente derivável
- `unidade_saude_referencia` / valor equivalente quando o fluxo exigir
- `data_ocorrencia`

#### Pessoa violada
- campos básicos da vítima conforme estrutura do registro municipal
- `orientacao_sexual`, quando a vítima for maior ou igual a 10 anos, admitindo:
  - valor declarado;
  - `nao_se_aplica`, quando a regra do destino permitir;
  - `ignorado`, quando a regra do destino permitir
- `identidade_genero`, quando a vítima for maior ou igual a 10 anos, admitindo:
  - valor declarado;
  - `nao_se_aplica`, quando a regra do destino permitir;
  - `ignorado`, quando a regra do destino permitir

#### Violência
- `motivacao_violencia`
- pelo menos uma violação municipal transformável para natureza/tipologia do SINAN

#### Provável autor
- `parentesco_vinculo` ou equivalente transformável

### 11.3. Observação
O sistema deve considerar também obrigatoriedades condicionais do SINAN, inclusive aquelas que dependem:
- da idade;
- da natureza da violência;
- da existência de violência sexual;
- da existência de lesão autoprovocada;
- da vinculação com trabalho.

---

## 12. Campos bloqueantes por destino

### 12.1. Conceito
Campo bloqueante é o campo cuja ausência impede classificar a notificação como apta para determinado destino.

### 12.2. Bloqueantes recomendados para CEMARIS
No MVP, recomenda-se tratar como bloqueantes para `apta_cemaris`:
- ausência de `data_ocorrencia`;
- ausência de identificação mínima da pessoa violada;
- ausência de item em `violacoes[]` mapeável para CEMARIS;
- ausência total de base territorial mínima da ocorrência;
- ausência de `local_coleta`, quando ele não puder ser derivado do órgão/unidade.

### 12.3. Bloqueantes recomendados para SINAN
No MVP, recomenda-se tratar como bloqueantes para `apta_sinan`:
- ausência de `data_notificacao`;
- ausência de `uf_notificacao`;
- ausência de `municipio_notificacao`;
- ausência de `tipo_unidade_notificadora`;
- ausência de `nome_unidade_notificadora` ou equivalente;
- ausência de `data_ocorrencia`;
- ausência de `motivacao_violencia`;
- ausência de `parentesco_vinculo` ou equivalente;
- ausência de `orientacao_sexual` quando exigida pela regra etária do destino e não houver valor aceito de conversão;
- ausência de `identidade_genero` quando exigida pela regra etária do destino e não houver valor aceito de conversão.

---

## 13. Campos convertíveis para “sem informação”, “ignorado” ou equivalente

### 13.1. Princípio
O sistema municipal deve distinguir:
- ausência real de informação no banco municipal;
- do valor formal aceito pelo sistema de destino.

### 13.2. Regra
Um campo só poderá ser convertido para:
- `sem informação`,
- `ignorado`,
- `não se aplica`,
- ou equivalente

quando houver uma das seguintes condições:
1. o sistema de destino possuir código ou opção explícita para isso; e
2. a regra de negócio do destino permitir esse uso naquele contexto.

### 13.3. Aplicação recomendada
No banco municipal, recomenda-se armazenar valores como:
- `nao_informado`
- `nao_conhecido_pelo_orgao_notificante`
- `nao_se_aplica`

Na camada de integração, esses valores podem virar:
- `ignorado`
- `não se aplica`
- `sem informação`
- ou outra codificação do destino

somente quando validado pela regra do sistema externo.

### 13.4. Cautela específica para CEMARIS
Como parte das opções do CEMARIS pode estar representada em imagem no material consultado, toda conversão automática para rótulos como `caso sem informação` deve ser validada manualmente na implementação final.

---

## 14. Ambiguidades conceituais relevantes

### 14.1. Migrante
O sistema municipal **não deve** adotar um booleano simples `migrante` como verdade canônica principal.

#### Diretriz
Manter:
- `situacao_territorial_residencia`
- `pais_residencia`
- `municipio_residencia`
- `em_situacao_de_rua`, quando aplicável

e derivar o comportamento necessário por destino.

---

### 14.2. Ciclo de vida
O sistema municipal **não deve** tratar os ciclos de vida de CEMARIS e SINAN como equivalentes.

#### Diretriz
Manter como base:
- `data_nascimento`
- `idade_anos`
- `idade_aproximada_violador`

e derivar:
- `ciclo_vida_municipal`
- `ciclo_vida_cemaris`
- `ciclo_vida_sinan`

---

### 14.3. Orientação sexual, identidade de gênero e segmento LGBTQIAPN+
Esses campos não devem ser fundidos.

#### Diretriz
No município:
- `orientacao_sexual`
- `identidade_genero`
- `segmento_lgbtqiapn_autodeclarado`

devem permanecer distintos.

---

### 14.4. Local da ocorrência, residência e local de coleta
Esses conceitos devem permanecer separados.

---

### 14.5. Múltiplos violadores
O sistema municipal deve manter estrutura própria para múltiplos violadores, ainda que o destino resuma parte dessas informações.

---

## 15. Campos sem equivalente direto relevante

Os seguintes campos podem permanecer estritamente municipais ou operacionais:
- numero_registro municipal;
- telefone_secundario;
- observacoes_integracao;
- refinamentos locais de territorialidade;
- conveniências de UX do formulário;
- classificações internas de gestão.

---

## 16. Campos que devem ser preferencialmente derivados

Não devem ser tratados como verdade canônica digitada manualmente:
- idade_anos;
- ciclo_vida_municipal;
- ciclo_vida_cemaris;
- ciclo_vida_sinan;
- ciclo_vida_violador;
- houve_violencia_sexual;
- UF derivada do município;
- parte dos campos administrativos.

---

## 17. Tabelas auxiliares recomendadas

### 17.1. Catálogo de violações
- código municipal
- descrição municipal
- código CEMARIS
- descrição CEMARIS
- código SINAN
- descrição SINAN
- tipo de equivalência
- observações

### 17.2. Catálogo de parentesco/vínculo
- código municipal
- equivalente CEMARIS
- equivalente SINAN
- observações

### 17.3. Catálogo de encaminhamentos
- código municipal
- agrupamento para CEMARIS
- agrupamento para SINAN
- observações

### 17.4. Catálogo de identidade/orientação/segmento
- código municipal
- correspondência por destino
- restrições de exportação
- observações

### 17.5. Regras etárias
- faixa municipal
- faixa CEMARIS
- faixa SINAN
- regra de transformação

### 17.6. Regras de aptidão
- destino
- campo
- natureza da exigência
- aceita conversão?
- valor de conversão permitido
- bloqueia exportação?
- observações

---

## 18. Estratégia de exportação recomendada

### 18.1. Exportação assistida
O melhor caminho é uma exportação assistida ou semiassistida, e não exportação cega.

### 18.2. Etapas sugeridas
1. validar o registro municipal;
2. calcular a aptidão por destino;
3. aplicar regras de transformação;
4. converter valores aceitos;
5. bloquear o que não cumprir suficiência mínima;
6. gerar visualização de exportação;
7. registrar log da operação.

### 18.3. Log mínimo recomendado
- id da notificação municipal;
- destino;
- data/hora;
- usuário responsável;
- status;
- campos transformados;
- campos convertidos;
- bloqueios;
- mensagem de retorno.

---

## 19. Síntese final

Este documento assume que:

1. O sistema municipal deve preservar sua **autonomia conceitual**.
2. CEMARIS e SINAN têm **lógicas próprias e não equivalentes entre si**.
3. O papel do mapeamento não é deformar o modelo municipal para caber nos instrumentos externos.
4. O papel do mapeamento é criar uma **camada de tradução controlada**, rastreável e operacionalmente viável.
5. A integração bem-sucedida dependerá de:
   - bons catálogos;
   - regras explícitas;
   - derivação correta;
   - aptidão automática por destino;
   - conversões permitidas e rastreáveis;
   - bloqueios claros quando a suficiência mínima não for atingida.

O centro do sistema continua sendo o município.  
A exportação existe para aproveitar o que já estiver suficiente, sem criar dependência estrutural de retrabalho manual.