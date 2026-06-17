# Task: diagnose

## Objetivo

Este é o modo FAST do squad advisory-board e o ponto de entrada mais usado do sistema: produzir um diagnóstico geral rápido de negócio quando a demanda do usuário não tem informação suficiente para acionar um squad especializado, ou quando nenhum squad especializado se encaixa. O objetivo não é profundidade máxima — é extrair sinal real e direcionável em uma única passada, cobrindo as quatro dimensões do conselho (mercado, operações, pessoas, finanças), mesmo com informação parcial ou ambígua sobre o negócio.

Esta task deve funcionar bem tanto para um negócio detalhado em parágrafos quanto para uma descrição de uma frase — nesse último caso, o diagnóstico deve declarar explicitamente as suposições feitas e onde a falta de informação limita a confiança da leitura.

## Entregáveis esperados

- Leitura rápida das quatro dimensões (mercado/competitividade, operações, pessoas/cultura, finanças/crescimento), mesmo que de forma desigual em profundidade conforme a informação disponível.
- Identificação do(s) sintoma(s) mais urgente(s) e da causa provável por trás (não só listar sintomas).
- Sinalização explícita de qual squad especializado (se algum) deveria assumir a partir daqui, caso o diagnóstico revele um problema de domínio específico (ex: branding, finanças avançadas, tráfego pago).
- Pelo menos uma recomendação imediata acionável, mesmo que o diagnóstico completo exija mais informação.

## Formato de saída esperado

```
## Diagnóstico Rápido

### Leitura por dimensão
- Mercado: ...
- Operações: ...
- Pessoas/Cultura: ...
- Finanças/Crescimento: ...

### Sinal mais urgente
[sintoma + causa provável]

### Suposições assumidas (quando informação for insuficiente)
- ...

### Recomendação imediata
[uma ação concreta e executável já]

### Encaminhamento sugerido
[squad especializado, se aplicável, ou "continuar com advisory-board para roadmap completo"]
```
