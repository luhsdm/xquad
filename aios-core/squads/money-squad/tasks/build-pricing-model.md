# Task: Construir Modelo de Precificação

## Objetivo

Construir (ou revisar) uma estrutura de preços fundamentada em valor percebido e validada por elasticidade estimada, em vez de ancoragem arbitrária ou markup sobre custo. Conduzida principalmente pelo agente Marina Castelhano (pricing), com apoio de Otávio Brandão (unit economics) para validar impacto em LTV/payback.

## Entregáveis esperados

1. Mapa de valor percebido por segmento de cliente (o que cada segmento está dispostos a pagar e por quê).
2. Faixa de aceitação de preço estimada via Van Westendorp (PMI - preço muito baixo / PME - preço barato / PMC - preço caro / PMB - preço muito caro).
3. Proposta de estrutura de preços (tiering, métrica de cobrança, descontos) com break-even recalculado.
4. Estimativa de impacto da mudança proposta sobre LTV, CAC payback e margem de contribuição.
5. Desenho de experimento mínimo de validação (A/B, piloto com novos clientes, grandfathering da base atual).

## Formato de saída esperado

```
### 1. Mapa de Valor por Segmento
| Segmento | Job-to-be-done principal | Disposição a pagar (estimada) | Justificativa |

### 2. Faixa de Aceitação de Preço (Van Westendorp)
- PMI (muito barato): R$ ...
- PME (barato/aceitável): R$ ...
- PMC (caro/aceitável): R$ ...
- PMB (muito caro): R$ ...
- Faixa ótima recomendada: R$ ... a R$ ...

### 3. Estrutura de Preço Proposta
- Métrica de cobrança: [por usuário | por uso | por valor entregue | outro]
- Tiers: ...
- Break-even por tier: ...

### 4. Impacto Estimado em Unit Economics
| Métrica | Antes | Depois | Variação |
| LTV | | | |
| CAC payback (meses) | | | |
| Margem de contribuição | | | |

### 5. Experimento de Validação Recomendado
- Tipo: ...
- Duração: ...
- Métrica de sucesso: ...
```
