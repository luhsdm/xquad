# Task: build-incident-response-plan

## Objetivo
Construir um plano de resposta a incidentes de segurança estruturado segundo as funções do NIST CSF, garantindo que a organização saiba detectar, conter, erradicar, recuperar e aprender de incidentes futuros, preservando evidência forense ao longo do processo.

## Passos
1. **Identify**: mapear ativos críticos, dados sensíveis (incluindo dados pessoais sob LGPD) e cenários de incidente mais prováveis (ransomware, vazamento de dados, comprometimento de credencial, ataque DDoS).
2. **Protect**: definir controles preventivos mínimos esperados antes do incidente (backup testado, segmentação de rede, MFA, logging centralizado).
3. **Detect**: definir fontes de detecção (SIEM, alertas de EDR, monitoramento de rede) e critérios de classificação de severidade do incidente.
4. **Respond**: definir papéis e responsabilidades (RACI), fluxo de comunicação interna/externa, critérios de acionamento de equipe forense e procedimento de contenção que preserve evidência (cadeia de custódia) antes de qualquer ação destrutiva.
5. **Recover**: definir critérios de restauração segura (a partir de backup validado e íntegro), critérios de "incidente encerrado" e monitoramento reforçado pós-recuperação.
6. **Lições aprendidas**: template de post-mortem com linha do tempo, causa raiz, técnicas do atacante mapeadas (MITRE ATT&CK) e plano de ação corretivo com dono e prazo.

## Entregáveis
- Documento de plano de resposta a incidentes (IRP) estruturado por função do NIST CSF.
- Matriz de classificação de severidade de incidente.
- Fluxograma de escalonamento e comunicação (interno, jurídico, ANPD quando aplicável a dados pessoais, clientes).
- Template de relatório pós-incidente (post-mortem).

## Formato de saída
```
## Plano de Resposta a Incidentes
- Identify: ativos críticos e cenários de risco
- Protect: controles preventivos mínimos
- Detect: fontes de detecção e critérios de severidade
- Respond: papéis (RACI), fluxo de comunicação, procedimento de contenção forense
- Recover: critérios de restauração e monitoramento pós-incidente
- Lições aprendidas: template de post-mortem
```
