// router.js

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import yaml from "js-yaml";
import { extractText } from "./utils.js";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const squadsPath = "./aios-core/squads";

function loadSquadDescriptions() {
  if (!fs.existsSync(squadsPath)) return "";

  return fs.readdirSync(squadsPath)
    .filter(squad => {
      const yamlPath = `${squadsPath}/${squad}/squad.yaml`;
      return fs.existsSync(yamlPath);
    })
    .map(squad => {
      const yamlPath = `${squadsPath}/${squad}/squad.yaml`;
      const data = yaml.load(fs.readFileSync(yamlPath, "utf8"));
      return `- ${squad}: ${data.description || ""}`;
    })
    .join("\n");
}

export async function chooseSquad(userInput) {
  const squadDescriptions = loadSquadDescriptions();

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 64,
    messages: [{ role: "user", content: `
Você é um roteador inteligente de squads.

Analise a intenção do usuário e escolha o squad mais adequado.

Squads disponíveis:
${squadDescriptions}

Regras:
- escolha o squad cuja descrição melhor resolve a pergunta
- responda SOMENTE com o nome da pasta do squad (ex: copy-squad)
- sem aspas, sem explicação

Pergunta:
"${userInput}"
    ` }],
  });

  return extractText(response).trim();
}