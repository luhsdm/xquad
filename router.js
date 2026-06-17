// router.js

import OpenAI from "openai";
import fs from "fs";
import yaml from "js-yaml";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
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

  const response = await client.responses.create({
    model: "gpt-4o-mini",
    input: `
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
    `,
  });

  return response.output_text.trim();
}