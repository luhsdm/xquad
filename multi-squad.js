// multi-squad.js

import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const VALID_SQUADS = new Set([
  "copy-squad", "traffic-masters", "data-squad", "design-squad",
  "brand-squad", "money-squad", "storytelling", "advisory-board",
  "c-level-squad", "hormozi-squad", "cybersecurity",
]);

export async function chooseAdditionalSquads(question, mainResult, primarySquad = "") {
  const resultSummary = mainResult.slice(0, 300);

  const response = await client.responses.create({
    model: "gpt-4o-mini",
    input: `
Usuário pediu: ${question}
Resultado resumido: ${resultSummary}
Squad principal já usado: ${primarySquad}

Quais outros squads agregariam valor real?

Opções: copy-squad, traffic-masters, data-squad, design-squad,
brand-squad, money-squad, storytelling, advisory-board

Regras:
- máximo 2 squads
- só inclua se agregar valor real e diferente
- se nenhum agregar, responda: none
- retorne apenas nomes separados por vírgula

Resposta:`,
  });

  const raw = response.output_text.trim().toLowerCase();

  if (raw === "none" || raw === "" || raw === "nenhum") return [];

  return raw
    .split(",")
    .map(s => s.trim())
    .filter(s => VALID_SQUADS.has(s) && s !== primarySquad);
}