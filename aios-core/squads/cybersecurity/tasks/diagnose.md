# Task: diagnose

## Objetivo
Avaliação rápida (FAST fallback) da postura de segurança atual de um ambiente, produto ou organização, quando não há tempo ou contexto para um assessment completo. Serve como triagem inicial para decidir se é necessário escalar para `run-pentest-assessment` ou `build-incident-response-plan`.

## Quando usar
- Início de engajamento, sem informações detalhadas do cliente/ambiente.
- Necessidade de resposta rápida sobre "qual é a situação de segurança hoje".
- Triagem antes de alocar esforço maior de pentest, hardening ou auditoria.

## Passos
1. Levantar contexto básico: tipo de ambiente (cloud/on-premise/híbrido), criticidade dos dados (há dados pessoais? LGPD aplicável?), exposição externa (internet-facing?).
2. Checar sinais rápidos de risco: existência de política de segurança formal, último pentest realizado, uso de MFA em contas privilegiadas, existência de plano de resposta a incidentes.
3. Classificar maturidade aproximada usando referência simplificada de NIST CSF (Identify/Protect/Detect/Respond/Recover) — nível inexistente, inicial, gerenciado, otimizado.
4. Identificar os 3 a 5 riscos mais evidentes e de maior impacto potencial.
5. Recomendar próximo passo: pentest, hardening, plano de resposta a incidentes ou avaliação de compliance.

## Entregáveis
- Resumo de postura de segurança (1 página).
- Classificação de maturidade por função do NIST CSF.
- Lista priorizada de riscos identificados com recomendação de ação imediata.

## Formato de saída
```
## Diagnóstico Rápido de Segurança
- Contexto: ...
- Maturidade NIST CSF (aproximada): Identify [ ] Protect [ ] Detect [ ] Respond [ ] Recover [ ]
- Top riscos identificados: 1) ... 2) ... 3) ...
- Recomendação de próximo passo: ...
```
