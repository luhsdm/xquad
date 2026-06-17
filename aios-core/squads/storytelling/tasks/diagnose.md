# Task: diagnose (modo FAST)

## Objetivo
Diagnóstico rápido da narrativa atual quando não há informação suficiente para
rodar as tasks profundas (build-narrative-arc ou write-brand-story). Funciona
como fallback: identifica o que existe, o que falta e qual task aprofundar a seguir.

## Quando usar
- Cliente chega só com um texto/roteiro/script existente e pede "melhora isso".
- Não há briefing completo sobre protagonista, conflito ou objetivo de conversão.
- Primeira interação do squad com o conteúdo, antes de qualquer construção.

## Entregáveis esperados
- Identificação do protagonista real da narrativa (quem é o herói da história).
- Identificação do conflito/obstáculo central (ou sua ausência).
- Localização do hook atual e nota sobre sua força (primeiros 3s/3 linhas).
- Mapeamento do arco emocional presente (ou achatamento detectado).
- Recomendação de qual task rodar a seguir (build-narrative-arc, write-brand-story
  ou nenhuma, se a narrativa já estiver estruturalmente sólida).

## Formato de saída
```
## Diagnóstico Narrativo Rápido
- Protagonista identificado: ...
- Conflito central: ... (ou "ausente — risco estrutural")
- Força do hook: alta / média / baixa — justificativa em 1 linha
- Arco emocional: presente / achatado / invertido
- Gaps críticos: lista de até 5 bullets
- Recomendação: próxima task + motivo em 1 frase
```
