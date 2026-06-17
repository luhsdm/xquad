# Task: Build Grand Slam Offer

## Objetivo

Construir, do zero ou a partir de uma oferta existente fraca, uma oferta completa no padrão "Grand Slam Offer": estrutura que maximiza percepção de valor via Value Equation, empacotada de forma que o comprador ideal sinta que recusar é um erro evidente.

## Agentes envolvidos

Mestre de Ofertas (líder), Arquiteto de Valor (auditoria de cada variável), Estrategista de Escassez e Bônus (empilhamento e mecanismos).

## Passos

1. **Nomear o problema**: identificar o problema de alto valor do comprador ideal em uma frase que ele próprio usaria.
2. **Mapear objeções**: listar exaustivamente os medos, dúvidas e objeções prováveis de compra (mínimo 8 a 10 itens).
3. **Rodar a Value Equation** com o Arquiteto de Valor: pontuar Dream Outcome, Likelihood of Success, Time Delay e Effort & Sacrifice, e identificar a variável mais fraca a ser trabalhada primeiro.
4. **Converter objeções em componentes da oferta**: cada objeção mapeada no passo 2 deve virar um bônus, uma garantia ou um ajuste de entrega.
5. **Empilhar bônus** com o Estrategista de Escassez, atribuindo valor individual a cada bônus para ancoragem.
6. **Definir mecanismo de escassez/urgência genuíno** ligado a uma restrição operacional real.
7. **Precificar com base em valor percebido**, não em custo de produção — ancorar o preço pedido contra o valor total empilhado.
8. **Nomear a oferta** pelo resultado prometido e prazo.

## Entregáveis

- Documento de oferta completo: problema, promessa, núcleo da oferta, stack de bônus com valores individuais, garantia (handoff para `engineer-guarantee`), mecanismo de escassez, preço e justificativa, nome final da oferta.

## Formato de saída

```
GRAND SLAM OFFER — [Nome da Oferta]
Problema central: [frase]
Promessa (Dream Outcome): [resultado quantificado + prazo]
Núcleo da oferta: [produto/serviço]
Value Equation (antes → depois): DO [x→y] | LoS [x→y] | TD [x→y] | E&S [x→y]
Stack de bônus:
  1. [bônus] — resolve objeção: [qual] — valor atribuído: [R$]
  2. ...
Garantia: [tipo, ver engineer-guarantee.md para detalhamento]
Escassez/Urgência: [mecanismo + justificativa operacional real]
Preço pedido: [valor] | Valor total empilhado: [valor] | Ancoragem: [proporção]
```
