// multi-squad.js

import Anthropic from "@anthropic-ai/sdk";
import { extractText } from "./utils.js";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const VALID_SQUADS = new Set([
  "copy-squad", "traffic-masters", "data-squad", "design-squad",
  "brand-squad", "money-squad", "storytelling", "advisory-board",
  "c-level-squad", "hormozi-squad", "cybersecurity",
]);

export async function chooseAdditionalSquads(question, mainResult, primarySquad = "") {
  const resultSummary = mainResult.slice(0, 300);

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 64,
    messages: [{ role: "user", content: `
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

Resposta:` }],
  });

  const raw = extractText(response).trim().toLowerCase();

  if (raw === "none" || raw === "" || raw === "nenhum") return [];

  return raw
    .split(",")
    .map(s => s.trim())
    .filter(s => VALID_SQUADS.has(s) && s !== primarySquad);
}