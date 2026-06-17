# Task: Analyze Funnel

## Objetivo

Realizar análise completa de um funil de conversão para identificar a etapa de maior drop-off em volume absoluto, separar causa raiz de ruído (variação por segmento, qualidade de tráfego, sazonalidade) e propor as oportunidades de melhoria com maior impacto esperado.

## Entregáveis esperados

- Mapeamento do funil em eventos discretos, com validação de que cada etapa tem evento instrumentado (se não tiver, isso é reportado como bloqueio antes da análise)
- Tabela de conversão por etapa: volume absoluto, taxa de conversão da etapa anterior, tempo médio entre etapas
- Segmentação da etapa de maior drop-off por canal de aquisição, dispositivo e tipo de usuário (novo vs recorrente)
- Cohort analysis comparando coortes de entrada ao longo do tempo, para distinguir piora estrutural do funil de piora de qualidade de tráfego
- Lista priorizada de hipóteses de causa raiz e oportunidades de melhoria, ordenada por volume absoluto de usuários recuperáveis

## Formato de saída

Relatório com: diagrama/tabela do funil completo, etapa crítica identificada com volume absoluto perdido, segmentação que explica a causa, cohort analysis com leitura explícita, e lista de até 5 oportunidades priorizadas com impacto estimado.
