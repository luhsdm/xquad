# Checklist de Qualidade — Squad Cybersecurity

- [ ] Escopo do teste de intrusão foi formalmente autorizado por escrito (Statement of Work / Rules of Engagement) antes de qualquer ação ofensiva.
- [ ] Vulnerabilidades identificadas foram classificadas por score CVSS e severidade (Crítica/Alta/Média/Baixa).
- [ ] Evidências sensíveis (dados pessoais, credenciais, tokens) estão mascaradas no relatório final.
- [ ] Achados técnicos foram mapeados a frameworks de referência (OWASP Top 10, OWASP ASVS, MITRE ATT&CK) quando aplicável.
- [ ] Hardening aplicado foi validado em ambiente de homologação antes de produção, com plano de rollback documentado.
- [ ] Controles de hardening foram comparados contra CIS Benchmark ou CIS Controls aplicável.
- [ ] Plano de resposta a incidentes cobre as cinco funções do NIST CSF (Identify/Protect/Detect/Respond/Recover).
- [ ] Procedimento de resposta a incidentes preserva cadeia de custódia forense antes de qualquer ação de remediação destrutiva.
- [ ] Relatório pós-incidente (post-mortem) inclui linha do tempo, causa raiz e plano de ação corretivo com dono e prazo.
- [ ] Conformidade declarada (LGPD, ISO 27001) está sustentada por evidência documental e trilha de auditoria, não apenas afirmação verbal.
- [ ] Toda exceção de controle de segurança possui dono, prazo de remediação e aprovação formal de risco aceito.
- [ ] Dependências de terceiros (SCA) e código-fonte (SAST/DAST) foram avaliados antes da aprovação de release em produção.
