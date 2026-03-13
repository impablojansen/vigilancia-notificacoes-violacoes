# Mapeamento CEMARIS / SINAN

## Objetivo
Este documento tem como finalidade mapear os campos do sistema municipal de notificações de violência e violação de direitos com os campos presentes nos instrumentais atualizados do CEMARIS e do SINAN (Violência Interpessoal/Autoprovocada).

O objetivo do sistema municipal não é reproduzir literalmente nenhum dos dois instrumentos, mas manter um **modelo próprio**, capaz de:
- concentrar dados da rede municipal;
- gerar relatórios e dashboards;
- apoiar exportações futuras;
- facilitar o preenchimento do CEMARIS e do SINAN.

## Princípio adotado
O sistema municipal terá um **modelo canônico próprio**.
O CEMARIS e o SINAN serão tratados como **destinos de mapeamento/exportação**, e não como base da modelagem principal.

---

## Fontes analisadas
- Instrumental atualizado do CEMARIS
- Instrumental atualizado do SINAN – Violência Interpessoal/Autoprovocada

---

## Estrutura analítica proposta
Os campos foram classificados em quatro grupos:

1. **Núcleo comum**  
   Campos presentes, total ou parcialmente, em ambos os instrumentos e que devem compor o núcleo do sistema municipal.

2. **Predominantemente CEMARIS**  
   Campos próprios ou mais relevantes à política de assistência social.

3. **Predominantemente SINAN**  
   Campos próprios ou mais relevantes à política de saúde.

4. **Campos municipais estratégicos**  
   Campos que, mesmo não sendo centrais nos dois instrumentos, são úteis para análise local, relatórios e dashboards.

---

## Mapeamento por blocos

### 1. Dados da notificação

| Campo municipal | CEMARIS | SINAN | Classificação | Observação |
|---|---|---|---|---|
| data_notificacao | indireto/organizacional | sim | núcleo comum | importante para gestão do registro |
| data_ocorrencia | sim | sim | núcleo comum | campo central |
| hora_ocorrencia | não identificado claramente | sim | predominantemente SINAN | útil para saúde e análise temporal |
| orgao_notificante | sim | parcialmente | núcleo comum | importante para governança municipal |
| unidade_notificadora | sim | sim | núcleo comum | campo central |
| tipo_unidade_notificadora | não | sim | predominantemente SINAN | classifica o tipo de unidade |
| responsavel_preenchimento | sim | sim | núcleo comum | importante para auditoria futura |
| observacoes_iniciais | sim | sim | núcleo comum | texto livre complementar |

### 2. Local da ocorrência / coleta

| Campo municipal | CEMARIS | SINAN | Classificação | Observação |
|---|---|---|---|---|
| local_coleta | sim | parcialmente | predominantemente CEMARIS | rede socioassistencial e outros órgãos |
| local_ocorrencia | não estruturado igual | sim | predominantemente SINAN | campo relevante para análise |
| municipio_notificacao | sim | sim | núcleo comum | territorialização |
| municipio_ocorrencia | parcialmente | sim | núcleo comum | territorialização |
| endereco_ocorrencia | parcialmente | sim | núcleo comum | importante para análise local |
| bairro_ocorrencia | parcialmente | sim | núcleo comum | importante para dashboards |
| zona_ocorrencia | não claro | sim | predominantemente SINAN | urbana/rural/periurbana |

### 3. Sujeito violado – identificação

| Campo municipal | CEMARIS | SINAN | Classificação | Observação |
|---|---|---|---|---|
| nome | sim | sim | núcleo comum | essencial |
| nome_social | sim | sim | núcleo comum | importante |
| nome_mae | sim | não claramente destacado no recorte lido | predominantemente CEMARIS | manter no modelo municipal |
| data_nascimento | sim | sim | núcleo comum | essencial |
| idade | derivável | derivável | municipal estratégico | pode ser derivada |
| sexo | sim | sim | núcleo comum | essencial |
| estado_civil / situacao_conjugal | sim | sim | núcleo comum | importante |
| raca_cor_etnia | sim | sim | núcleo comum | essencial para análises |
| ocupacao | não claramente estruturado no CEMARIS | sim | predominantemente SINAN | manter no modelo municipal |
| escolaridade / grau_instrucao | sim | sim | núcleo comum | importante |
| ciclo_vida | sim | sim | núcleo comum | melhor derivar e/ou classificar |

### 4. Sujeito violado – documentação e cadastro

| Campo municipal | CEMARIS | SINAN | Classificação | Observação |
|---|---|---|---|---|
| cpf | sim | não central | predominantemente CEMARIS | dado sensível |
| nis | sim | não | predominantemente CEMARIS | assistência |
| pis_pasep | sim | não | predominantemente CEMARIS | assistência |
| certidao_nascimento | sim | não | predominantemente CEMARIS | assistência |
| cartao_sus | não central | sim | predominantemente SINAN | saúde |
| telefone | sim | sim | núcleo comum | útil para rede |
| email | sim | não central | predominantemente CEMARIS | manter opcional |

### 5. Sujeito violado – endereço e território

| Campo municipal | CEMARIS | SINAN | Classificação | Observação |
|---|---|---|---|---|
| cep | sim | sim | núcleo comum | importante |
| logradouro | sim | sim | núcleo comum | importante |
| numero | sim | sim | núcleo comum | importante |
| bairro | sim | sim | núcleo comum | importante |
| municipio_residencia | sim | sim | núcleo comum | territorialização |
| uf_residencia | parcialmente | sim | núcleo comum | territorialização |
| complemento | parcialmente | sim | núcleo comum | útil |
| ponto_referencia | não claramente | sim | predominantemente SINAN | manter opcional |
| zona_residencia | não claramente | sim | predominantemente SINAN | manter opcional |
| pais_residencia | parcialmente | sim | predominantemente SINAN | importante para migrantes |

### 6. Perfil social, identitário e condições específicas

| Campo municipal | CEMARIS | SINAN | Classificação | Observação |
|---|---|---|---|---|
| migrante | sim | parcialmente | núcleo comum | importante |
| nacionalidade | sim | parcialmente | núcleo comum | importante |
| naturalidade | sim | parcialmente | núcleo comum | importante |
| orientacao_sexual | indireto via segmento/violação | sim | predominantemente SINAN | manter no núcleo |
| identidade_genero | sim | sim | núcleo comum | importante |
| segmento_lgbtqiapn | sim | não como campo equivalente | predominantemente CEMARIS | manter opcional |
| gestante | sim | não evidente no recorte lido | predominantemente CEMARIS | pode ser útil para ambos |
| pcd / deficiencia_transtorno | sim | sim | núcleo comum | essencial |
| tipo_deficiencia | sim | sim | núcleo comum | importante |
| transtorno_mental/comportamento | não estruturado igual | sim | predominantemente SINAN | bloco condicional |
| grupo_populacional / povos tradicionais / GPTEs | sim | não | predominantemente CEMARIS | importante para assistência |
| recebe_bpc | sim | não | predominantemente CEMARIS | assistência |
| participa_transferencia_renda | sim | não | predominantly CEMARIS | assistência |
| medida_socioeducativa_meio_aberto | sim | não | predominantemente CEMARIS | assistência |

### 7. Violência / violação

| Campo municipal | CEMARIS | SINAN | Classificação | Observação |
|---|---|---|---|---|
| violacoes[] | sim | sim | núcleo comum | múltiplas violações por notificação |
| motivacao_violencia | parcialmente | sim | núcleo comum | padronizar catálogo |
| ocorreu_outras_vezes | não evidente no recorte do CEMARIS | sim | predominantemente SINAN | manter no núcleo |
| lesao_autoprovocada | não evidenciado | sim | predominantemente SINAN | manter bloco de saúde/condicional |
| meio_agressao | parcialmente | sim | núcleo comum | relevante para análise |
| local_ocorrencia_tipificado | não | sim | predominantemente SINAN | útil para dashboard |
| violencia_relacionada_ao_trabalho | não | sim | predominantemente SINAN | bloco condicional |
| cat | não | sim | predominantemente SINAN | bloco condicional |

### 8. Violência sexual

| Campo municipal | CEMARIS | SINAN | Classificação | Observação |
|---|---|---|---|---|
| houve_violencia_sexual | sim | sim | núcleo comum | importante |
| subtipo_violencia_sexual | sim | sim | núcleo comum | abuso / exploração / estupro / etc. |
| procedimentos_saude_relacionados | não | sim | predominantemente SINAN | bloco técnico condicional |

### 9. Violador / provável autor

| Campo municipal | CEMARIS | SINAN | Classificação | Observação |
|---|---|---|---|---|
| numero_envolvidos | não evidenciado | sim | predominantemente SINAN | importante |
| sexo_violador | sim | sim | núcleo comum | essencial |
| raca_etnia_violador | sim | não central | predominantemente CEMARIS | manter no modelo |
| idade/ciclo_vida_violador | sim | sim | núcleo comum | importante |
| parentesco_vinculo | sim | sim | núcleo comum | essencial |
| suspeita_uso_alcool | sim | sim | núcleo comum | importante |
| relacao_institucional | parcialmente | sim | núcleo comum | importante |

### 10. Encaminhamento e acompanhamento

| Campo municipal | CEMARIS | SINAN | Classificação | Observação |
|---|---|---|---|---|
| encaminhamentos[] | não estruturado igual | sim | predominantemente SINAN | manter núcleo municipal |
| status_acompanhamento | sim | não equivalente | predominantemente CEMARIS | importante para assistência |
| local_acompanhamento | sim | não | predominantemente CEMARIS | importante |
| servico_inserido | sim | não | predominantemente CEMARIS | importante |
| situacao_ruptura_psr | sim | não | predominantemente CEMARIS | bloco próprio da assistência |
| outra_situacao | sim | não | predominantemente CEMARIS | texto livre |
| data_encerramento | não evidente | sim | predominantemente SINAN | útil no município |

### 11. Blocos especiais

| Campo municipal | CEMARIS | SINAN | Classificação | Observação |
|---|---|---|---|---|
| psr_sem_documentacao | sim | não | predominantemente CEMARIS | tratar como bloco especial |
| cid10 | não | sim | predominantemente SINAN | bloco técnico condicional |
| circunstancia_lesao | não | sim | predominantemente SINAN | bloco técnico condicional |
| notificador_funcao_assinatura | parcialmente | sim | predominantemente SINAN | bloco técnico/administrativo |

---

## Síntese para implementação

### Núcleo municipal recomendado
- dados da notificação
- identificação do sujeito violado
- residência/território
- perfil social e identitário
- deficiência/transtorno
- múltiplas violações
- múltiplos violadores
- encaminhamento e acompanhamento

### Blocos condicionais CEMARIS
- BPC
- transferência de renda
- medida socioeducativa
- povos/comunidades/GPTEs
- PSR residente/imigrante
- PSR sem documentação
- status e local detalhado do acompanhamento da assistência

### Blocos condicionais SINAN
- CID-10
- violência sexual detalhada da saúde
- procedimentos realizados
- CAT
- violência relacionada ao trabalho
- circunstância da lesão
- dados administrativos do notificador

---

## Observações finais
1. O formulário municipal deve ser mais enxuto que a soma literal dos dois instrumentos.
2. O modelo próprio municipal está correto e deve ser mantido.
3. Exportação e preenchimento assistido para CEMARIS e SINAN devem ser tratados como camada posterior.
4. Os campos padronizados devem ser priorizados para viabilizar dashboards e relatórios.
