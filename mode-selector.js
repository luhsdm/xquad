// mode-selector.js

const COMPLEX_TRIGGERS = [
  "estratégia", "estratégico", "campanha", "lançamento", "funil",
  "posicionamento", "marca", "rebrand", "planejamento", "análise",
  "comparar", "otimizar", "escalar", "estrutura", "completo",
  "detalhado", "aprofundado", "passo a passo", "como montar",
  "me ajuda a", "quero criar", "preciso de um plano",
  "reescreva", "reescrever", "melhore", "melhorar", "eleve",
  "oferta", "proposta", "produto", "vender", "faturar",
  "low ticket", "upsell", "order bump", "funil", "lançar",
];

const SHORT_QUESTION_THRESHOLD = 6;
const LONG_QUESTION_THRESHOLD = 20;

export function chooseMode(question) {
  const lower = question.toLowerCase();
  const wordCount = question.trim().split(/\s+/).length;

  // Perguntas muito curtas → sempre FAST
  if (wordCount < SHORT_QUESTION_THRESHOLD) return "FAST";

  // Perguntas longas → sempre PRO (contexto suficiente para análise profunda)
  if (wordCount >= LONG_QUESTION_THRESHOLD) return "PRO";

  // Perguntas médias → verifica triggers
  const hasComplexTrigger = COMPLEX_TRIGGERS.some(t => lower.includes(t));
  if (hasComplexTrigger) return "PRO";

  return "FAST";
}