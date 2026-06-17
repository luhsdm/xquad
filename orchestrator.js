// orchestrator.js

import OpenAI from "openai";
import fs from "fs";
import yaml from "js-yaml";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const squadsPath = "./aios-core/squads";

function loadAllSquadDescriptions() {
  if (!fs.existsSync(squadsPath)) return "";
  return fs.readdirSync(squadsPath)
    .filter(squad => fs.existsSync(`${squadsPath}/${squad}/squad.yaml`))
    .map(squad => {
      const data = yaml.load(fs.readFileSync(`${squadsPath}/${squad}/squad.yaml`, "utf8"));
      const tags = (data.tags || []).join(", ");
      const tasks = (data.components?.tasks || []).join(", ");
      return `- ${squad}: ${data.description || ""} [tags: ${tags}] [tasks disponíveis: ${tasks}]`;
    })
    .join("\n");
}

export async function orchestrate(question) {
  const squadDescriptions = loadAllSquadDescriptions();

  const response = await client.responses.create({
    model: "gpt-4o-mini",
    input: `
Você é o orquestrador central de um sistema multi-agente.

Analise a intenção do usuário e decida:
1. Quais squads ativar
2. Qual task principal cada squad deve executar

Squads disponíveis (com tasks disponíveis):
${squadDescriptions}

Pergunta do usuário:
"${question}"

Retorne um JSON válido nesse formato exato:
{
  "plan": [
    { "squad": "copy-squad", "task": "write-email-sequence" },
    { "squad": "hormozi-squad", "task": "create-offer" }
  ],
  "reason": "explicação curta"
}

Regras:
- escolha apenas squads que genuinamente agregam valor
- escolha a task que mais se alinha com o pedido do usuário
- use apenas nomes de squads e tasks que existem nas listas acima
- retorne APENAS o JSON, sem texto adicional
    `,
  });

  try {
    const raw = response.output_text.trim().replace(/```json|```/g, "");
    const parsed = JSON.parse(raw);
    console.log("🧠 Plano do orquestrador:", JSON.stringify(parsed.plan, null, 2));
    console.log("📋 Motivo:", parsed.reason);
    return parsed.plan || [];
  } catch {
    console.log("⚠️ Erro no orquestrador, usando fallback");
    return [{ squad: "advisory-board", task: "diagnose" }];
  }
}