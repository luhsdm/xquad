import OpenAI from "openai";
import fs from "fs";
import yaml from "js-yaml";
import readlineSync from "readline-sync";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 1. Ler o squad.yaml
const file = fs.readFileSync("./aios-core/squads/c-level-squad/squad.yaml", "utf8");
const squad = yaml.load(file);

// 2. Criar agentes (simplificado)
const agents = [
  { role: "CEO", prompt: "Pense como CEO focado em crescimento e escala." },
  { role: "CMO", prompt: "Pense como CMO focado em aquisição e conversão." },
  { role: "CTO", prompt: "Pense como CTO focado em tecnologia e eficiência." },
];

// 3. Pergunta central
const question = readlineSync.question("Digite sua pergunta: ");

async function runSquad() {
  let responses = [];

  for (const agent of agents) {
    const res = await client.responses.create({
      model: "gpt-5-mini",
      input: `${agent.prompt}\nPergunta: ${question}`,
    });

    const text = res.output_text;

    console.log(`\n🧠 ${agent.role}:\n${text}`);

    responses.push(`${agent.role}: ${text}`);
  }

  // 4. Orquestrador (decisão final)
  const final = await client.responses.create({
    model: "gpt-5-mini",
    input: `
    Você é um CEO final tomando decisão.

    Aqui estão as opiniões:
    ${responses.join("\n")}

    Agora dê uma decisão clara, direta e executável.
    `,
  });

  console.log("\n🔥 DECISÃO FINAL:\n");
  console.log(final.output_text);
}

runSquad();