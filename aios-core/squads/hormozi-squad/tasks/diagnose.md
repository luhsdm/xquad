# Task: Diagnose (FAST fallback)

## Objetivo

Diagnóstico rápido de uma oferta ou negócio existente quando não há tempo/contexto para o fluxo completo de construção de oferta. Identifica em poucos minutos onde está o maior ponto de perda de conversão ou de crescimento, apontando qual agente do squad deve ser acionado a seguir.

## Quando usar

- O usuário traz uma oferta já existente que "não está convertendo" e quer um veredito rápido antes de reconstruir tudo.
- Não há dados completos disponíveis (uso estimativas e perguntas-chave em vez de exigir métricas perfeitas).

## Passos

1. Capturar a oferta atual em uma frase: o quê, para quem, por quanto, em que prazo.
2. Rodar checagem rápida da Value Equation (Dream Outcome, Likelihood of Success, Time Delay, Effort & Sacrifice) — nota estimada de 1 a 10 em cada variável.
3. Checar se existe garantia, e se sim, de que tipo e com qual exposição de risco aparente.
4. Checar se existe stack de bônus e se cada bônus resolve uma objeção nomeada.
5. Checar se existe mecanismo de escassez/urgência e se é genuíno.
6. Checar rapidamente, via perguntas diretas, qual dos três pilares (Aquisição, Entrega, Retenção) está mais sob pressão hoje.

## Entregáveis

- Diagnóstico de 1 página com: nota por variável da Value Equation, status da garantia, status do stack de bônus/escassez, pilar mais provável de ser o gargalo.
- Recomendação de qual task completa rodar a seguir (`build-grand-slam-offer` ou `engineer-guarantee`) e qual agente liderar.

## Formato de saída

```
DIAGNÓSTICO RÁPIDO
Oferta atual: [frase única]
Value Equation: Dream Outcome [x/10] | Likelihood [x/10] | Time Delay [x/10] | Effort [x/10]
Garantia: [tipo ou ausente] — exposição: [baixa/média/alta]
Bônus/Escassez: [presente e genuíno / presente e falso / ausente]
Gargalo operacional provável: [Aquisição/Entrega/Retenção]
Próximo passo recomendado: [task + agente]
```
