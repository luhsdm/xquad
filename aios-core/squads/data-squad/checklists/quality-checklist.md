# Checklist de Qualidade — Análise de Dados e Dashboards

- [ ] Toda métrica reportada tem fórmula de cálculo explícita, não apenas um nome ambíguo
- [ ] North Star Metric está definida e ligada a valor entregue ao usuário, não a uma métrica de vaidade
- [ ] Cada etapa de funil analisada corresponde a um evento efetivamente instrumentado, não a uma etapa especulada
- [ ] Toda taxa de conversão ou métrica agregada foi verificada por segmento (canal, dispositivo, tipo de usuário) antes de apontar causa raiz
- [ ] Janela de conversão temporal foi definida explicitamente em análises de funil, evitando inflar conversão com eventos tardios sem relação causal
- [ ] Nenhuma afirmação de causalidade foi feita a partir de correlação sem teste controlado ou evidência adicional
- [ ] Todo teste A/B citado atingiu tamanho de amostra e significância estatística mínima (95% de confiança) antes de ser declarado vencedor
- [ ] Dashboards separam claramente visão executiva (poucas métricas, cadência espaçada) de visão operacional (granular, drill-down)
- [ ] Toda métrica exibida em dashboard ou relatório aparece com comparação (meta, período anterior ou benchmark), nunca isolada
- [ ] Visualização escolhida é adequada ao tipo de dado (sem pizza com muitas categorias, sem gauge/3D decorativo)
- [ ] Toda apresentação para decisão executiva abre com a conclusão/recomendação, não com a metodologia
- [ ] Cada gráfico ou bloco analítico relevante carrega um "so what" explícito conectando o dado à ação recomendada
