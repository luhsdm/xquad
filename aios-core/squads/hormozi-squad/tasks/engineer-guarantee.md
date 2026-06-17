# Task: Engineer Guarantee

## Objetivo

Projetar a garantia mais agressiva que a unit economics e a capacidade operacional do negócio permitem suportar, e finalizar o stack de bônus que acompanha a oferta — entregando a camada final de redução de risco percebido antes do fechamento da Grand Slam Offer.

## Agentes envolvidos

Engenheiro de Garantias (líder), Estrategista de Escassez e Bônus (stack final), Caçador de Gargalos (validação de capacidade de entrega).

## Passos

1. **Levantar dados financeiros mínimos**: margem de contribuição da oferta, taxa de reembolso histórica (ou estimativa de mercado equivalente), custo marginal de entrega.
2. **Levantar capacidade operacional**: o time de entrega aguenta o volume esperado se a garantia aumentar a taxa de conversão (e portanto o volume de clientes)?
3. **Selecionar o tipo de garantia** mais agressivo que a margem suporta: incondicional, performance, invertida, condicional/escalonada ou "melhor que reembolso" — com justificativa explícita de por que esse tipo e não outro mais forte.
4. **Calcular exposição financeira**: cenário pessimista de taxa de reembolso/não-cumprimento de meta versus margem disponível.
5. **Definir os critérios objetivos de acionamento** da garantia por escrito (o que conta como "sucesso" ou "insucesso").
6. **Revisar o stack de bônus final** junto ao Estrategista de Escassez, garantindo que cada bônus aumenta Likelihood of Success ou reduz Effort & Sacrifice, reforçando a própria garantia.

## Entregáveis

- Especificação da garantia com critérios de acionamento, exposição financeira calculada, e parecer de viabilidade operacional do Caçador de Gargalos.
- Stack de bônus final consolidado.

## Formato de saída

```
ENGENHARIA DE GARANTIA
Tipo selecionado: [incondicional / performance / invertida / condicional / melhor-que-reembolso]
Justificativa: [por que este tipo e não um mais agressivo]
Critério de acionamento: [definição objetiva e mensurável]
Exposição financeira (cenário pessimista): [% reembolso esperado x margem]
Parecer de capacidade operacional: [aprovado / aprovado com ressalva / reprovado — motivo]

STACK DE BÔNUS FINAL
  1. [bônus] — variável da Value Equation reforçada: [DO/LoS/TD/E&S]
  2. ...
```
