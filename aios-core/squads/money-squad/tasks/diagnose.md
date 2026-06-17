# Task: Diagnóstico Rápido de Saúde Financeira (FAST/Fallback)

## Quando usar

Use esta task quando não houver informação suficiente para rodar `build-pricing-model` ou `analyze-cash-flow` em profundidade, ou quando o usuário pedir uma visão geral rápida antes de aprofundar em um tópico específico. É o modo de entrada padrão do squad.

## Objetivo

Produzir um raio-x financeiro rápido (15-20 minutos de análise) cobrindo as quatro dimensões centrais do squad — unit economics, precificação, caixa e estrutura de custos — identificando sinais de alerta e indicando qual task aprofundada (`build-pricing-model` ou `analyze-cash-flow`) deve ser acionada a seguir.

## Entregáveis esperados

1. Quadro de sinais vitais (ver formato abaixo) com status verde/amarelo/vermelho por dimensão.
2. Lista de no máximo 3 perguntas de premissa faltante que, se respondidas, elevariam a confiança do diagnóstico.
3. Recomendação explícita de próxima task a acionar (`build-pricing-model`, `analyze-cash-flow`, ou nenhuma se os dados ainda forem insuficientes).

## Formato de saída esperado

```
### Sinais Vitais

| Dimensão              | Status | Evidência observada                  | Risco se ignorado          |
|------------------------|--------|----------------------------------------|------------------------------|
| Unit Economics          | 🟡     | LTV:CAC não calculável (falta churn)   | Aquisição pode estar queimando caixa sem retorno |
| Precificação            | 🔴     | Preço não revisado há X meses           | Margem de contribuição erodindo |
| Fluxo de Caixa          | 🟢     | Runway estimado em X meses              | —                             |
| Estrutura de Custos     | 🟡     | Custos fixos crescendo acima da receita | Ponto de equilíbrio subindo  |

### Premissas faltantes (máx. 3)
1. ...
2. ...
3. ...

### Próximo passo recomendado
[build-pricing-model | analyze-cash-flow | aguardar mais dados] — justificativa em 1-2 frases.
```
