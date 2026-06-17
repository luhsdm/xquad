# Task: Analisar Fluxo de Caixa e Projeções

## Objetivo

Produzir uma projeção de fluxo de caixa direto cobrindo no mínimo 3 meses (idealmente 13 semanas rolantes quando houver dados granulares), identificando runway, ciclo de conversão de caixa e pontos de risco de ruptura de caixa. Conduzida principalmente pelo agente Heitor Salgueiro, com apoio de Beatriz Quental para cenários e Renato Vasconcelos para validar classificação de custos fixos/variáveis usados na projeção.

## Entregáveis esperados

1. Projeção de fluxo de caixa direto (saldo inicial, entradas, saídas, saldo final) por período, cobrindo pelo menos 3 meses.
2. Cálculo de runway atual (caixa disponível / burn rate médio dos últimos 3 meses).
3. Cálculo do ciclo de conversão de caixa (PMR + PME - PMP).
4. Três cenários de caixa (otimista/realista/pessimista) com premissas de recebimento e pagamento explicitadas.
5. Lista de ações recomendadas se o cenário pessimista indicar ruptura de caixa dentro do horizonte projetado.

## Formato de saída esperado

```
### Projeção de Fluxo de Caixa Direto (mín. 3 meses)
| Período | Saldo Inicial | Entradas | Saídas | Saldo Final |
| Mês 1 | | | | |
| Mês 2 | | | | |
| Mês 3 | | | | |

### Runway
- Caixa disponível: R$ ...
- Burn rate médio (últimos 3 meses): R$ ...
- Runway estimado: X meses

### Ciclo de Conversão de Caixa
- PMR (prazo médio de recebimento): X dias
- PME (prazo médio de estoques): X dias
- PMP (prazo médio de pagamento): X dias
- CCC = PMR + PME - PMP = X dias

### Cenários (3 meses mínimo)
| Cenário | Premissa de recebimento | Premissa de pagamento | Saldo final projetado |
| Otimista | | | |
| Realista | | | |
| Pessimista | | | |

### Ações Recomendadas (se cenário pessimista indicar ruptura)
1. ...
2. ...
```
