import fs from "fs";
import yaml from "js-yaml";
import OpenAI from "openai";
import readlineSync from "readline-sync";
import { chooseSquad } from "./router.js";
import { chooseAgents } from "./agent-selector.js";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const squadsPath = "./aios-core/squads";
const workflowName = "wf-full-copy-project.yaml";

function loadFolderContent(path) {
  if (!fs.existsSync(path)) return "";

  const files = fs.readdirSync(path);
  let content = "";

  files.forEach((file) => {
    const fullPath = `${path}/${file}`;
    if (fs.lstatSync(fullPath).isFile()) {
      content += `\n--- ${file} ---\n`;
      content += fs.readFileSync(fullPath, "utf8");
    }
  });

  return content;
}

async function run() {
  // 🔹 INPUT
  const question = readlineSync.question("O que você quer executar? ");

  // 🔹 ROUTER DE SQUAD
  const squadName = await chooseSquad(question);
  console.log("\n🧭 Squad escolhido:", squadName);

  // 🔹 LOAD SQUAD
  const squadFile = fs.readFileSync(
    `${squadsPath}/${squadName}/squad.yaml`,
    "utf8"
  );
  const squad = yaml.load(squadFile);

  const allAgents = squad.components.agents;

  // 🔹 WORKFLOW
  const workflowFile = fs.readFileSync(
    `${squadsPath}/${squadName}/workflows/${workflowName}`,
    "utf8"
  );
  const workflow = yaml.load(workflowFile);

  let steps = workflow.steps || workflow;

  if (!Array.isArray(steps)) {
    steps = ["diagnose", "create-offer", "write-sales-letter"];
  }

  // 🔹 CONFIG + DATA
  const configContent = loadFolderContent(
    `${squadsPath}/${squadName}/config`
  );

  const dataContent = loadFolderContent(
    `${squadsPath}/${squadName}/data`
  );

  let context = "";

  // 🔥 EXECUÇÃO DO WORKFLOW
  for (const step of steps) {
    console.log(`\n============================`);
    console.log(`🚀 STEP: ${step}`);
    console.log(`============================\n`);

    const taskPath = `${squadsPath}/${squadName}/tasks/${step}.md`;

    let taskContent = "";
    if (fs.existsSync(taskPath)) {
      taskContent = fs.readFileSync(taskPath, "utf8");
    }

    // 🔥 SELETOR DE AGENTES
    const selectedAgents = (await chooseAgents(
      `${squadsPath}/${squadName}`,
      allAgents,
      question,
      taskContent
    )).filter(a => allAgents.includes(a)); // segurança

    console.log("\n🧠 Agentes selecionados:", selectedAgents);

    // 🔥 EXECUÇÃO DOS AGENTES
    const promises = selectedAgents.map(async (agentFile) => {
      const agentPath = `${squadsPath}/${squadName}/agents/${agentFile}`;
      if (!fs.existsSync(agentPath)) return null;

      const agentPrompt = fs.readFileSync(agentPath, "utf8");

      const response = await client.responses.create({
        model: "gpt-5-mini",
        input: `
${agentPrompt}

=== CONFIG ===
${configContent}

=== DATA ===
${dataContent}

=== TASK ===
${taskContent}

=== OBJETIVO ===
"${question}"

=== CONTEXTO ===
${context}

Execute com foco e clareza.
        `,
      });

      return {
        agent: agentFile,
        text: response.output_text,
      };
    });

    const results = await Promise.all(promises);
    const validResults = results.filter(r => r);

    // 🔥 acumula contexto (sem mostrar debug)
    context += validResults
      .map(r => `${r.agent}: ${r.text}`)
      .join("\n\n");

    // 🔥 controle de tokens
    context = context.slice(-8000);
  }

  // 🔥 ORQUESTRADOR FINAL
  const finalResponse = await client.responses.create({
    model: "gpt-5-mini",
    input: `
Você é um estrategista chefe.

${context}

Consolide tudo em um plano direto, claro e executável.
    `,
  });

  console.log("\n🔥 DECISÃO FINAL:\n");
  console.log(finalResponse.output_text);

  // 🔥 SUGESTÃO DE OUTROS SQUADS
  const suggestion = await client.responses.create({
    model: "gpt-5-mini",
    input: `
Baseado nisso:

${finalResponse.output_text}

Sugira outros squads que podem ajudar.
Responda curto.
    `,
  });

  console.log("\n💡 Outros squads recomendados:");
  console.log(suggestion.output_text);
}

run();