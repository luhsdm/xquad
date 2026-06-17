# Task: write-email-sequence

## Objetivo

Criar uma sequência completa de e-mails a partir de um briefing/oferta, com cada e-mail cumprindo uma função clara na jornada (boas-vindas, nutrição, lançamento, carrinho abandonado ou reativação).

## Pré-requisito

Rodar diagnose.md antes, se a sequência depende de um briefing ainda não validado (mecanismo, prova, oferta).

## Entregáveis esperados

- Definição do tipo de sequência e do estágio do lead que ela atende.
- Mapa da sequência: quantidade de e-mails, intervalo entre envios, e função estratégica de cada um.
- Texto completo de cada e-mail: Assunto, Preview text e Corpo.
- Justificativa do framework usado (Soap Opera Sequence, Seinfeld Emails, ou gatilho comportamental) para esta sequência específica.

## Formato de saída

```
## Sequência: [tipo] — [estágio do lead]

### Mapa da sequência
| # | Dia/Gatilho | Função | Framework aplicado |
|---|---|---|---|

### E-mail 1
**Assunto:** ...
**Preview text:** ...
**Objetivo deste e-mail:** ...
**Corpo:**
...

### E-mail 2
[mesma estrutura]
```
