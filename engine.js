// engine.js

import fs from "fs";
import yaml from "js-yaml";
import Anthropic from "@anthropic-ai/sdk";
import { chooseAgents } from "./agent-selector.js";
import { chooseMode } from "./mode-selector.js";
import { orchestrate } from "./orchestrator.js";
import { withRetry, limitedParallel, extractText } from "./utils.js";
import {
  CRITIC_PROMPT,
  EDITOR_PROMPT,
  SCORE_PROMPT,
  SYNTHESIZER_PROMPT,
  AGENT_ACTIVATION_PROMPT
} from "./prompts.js";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const squadsPath = "./aios-core/squads";

function loadFolderContent(folderPath) {
  if (!fs.existsSync(folderPath)) return "";
  return fs.readdirSync(folderPath)
    .filter(file => fs.lstatSync(`${folderPath}/${file}`).isFile())
    .map(file => fs.readFileSync(`${folderPath}/${file}`, "utf8"))
    .join("\n");
}

function runAgent(agentPath, agentFile, taskContent, question, context) {
  if (!fs.existsSync(agentPath)) return Promise.resolve(null);
  const agentPrompt = fs.readFileSync(agentPath, "utf8");

  return withRetry(() =>
    client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 8000,
      messages: [{ role: "user", content: `
IDIOMA OBRIGATÓRIO: Responda SEMPRE em português brasileiro. Esta regra tem prioridade máxima.

---

${agentPrompt}

---

SUA MISSÃO AGORA:
${taskContent}

PERGUNTA DO USUÁRIO:
${question}

CONTEXTO ACUMULADO (use como referência):
${context.slice(-3000)}

---

${AGENT_ACTIVATION_PROMPT}

INSTRUÇÕES DE EXECUÇÃO:
- Responda NA SUA VOZ — use sua personalidade, frameworks e estilo únicos
- APLIQUE MECANISMOS ÚNICOS: Não diga o que fazer, diga COMO fazer (o processo técnico)
- ESPECIFICIDADE MICRO: Sempre que mencionar um método ou processo, você DEVE nomear ou exemplificar
- PROIBIÇÃO DE TERMOS VAGOS: Proibido usar "técnicas", "estratégias" ou "método" sem detalhamento concreto
- PROIBIDO GENERICISMO: Frases como "soluções inovadoras" resultam em descarte da resposta
- Seja específico, direto e prático. Entregue resultado real, não teoria.
- Responda SEMPRE em português brasileiro.
      ` }],
    }).then(r => `[${agentFile}]:\n${extractText(r)}`)
  );
}

async function runSquad(squadName, question, mode, sharedContext, forcedTask = null) {
  const squadPath = `${squadsPath}/${squadName}`;
  if (!fs.existsSync(`${squadPath}/squad.yaml`)) return "";

  const squad = yaml.load(fs.readFileSync(`${squadPath}/squad.yaml`, "utf8"));
  const allAgents = squad.components.agents || [];

  let workflowSteps = forcedTask ? [forcedTask] : ["diagnose"];

  if (!forcedTask && mode === "PRO") {
    const wfFolder = `${squadPath}/workflows`;
    if (fs.existsSync(wfFolder)) {
      const wfFiles = fs.readdirSync(wfFolder).filter(f => f.endsWith(".yaml"));

      const priority = ["wf-full", "wf-offer", "wf-campaign", "wf-brand", "wf-growth", "wf-board", "wf-story"];
      const sorted = wfFiles.sort((a, b) => {
        const ai = priority.findIndex(p => a.includes(p));
        const bi = priority.findIndex(p => b.includes(p));
        return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
      });

      if (sorted.length > 0) {
        try {
          const wfFile = fs.readFileSync(`${wfFolder}/${sorted[0]}`, "utf8");
          const wf = yaml.load(wfFile);

          if (wf.phases && Array.isArray(wf.phases)) {
            workflowSteps = wf.phases
              .map(p => p.task?.replace(".md", ""))
              .filter(t => t && !t.startsWith("{"));
          } else if (wf.workflow?.sequence) {
            workflowSteps = wf.workflow.sequence
              .map(s => s.action)
              .filter(Boolean);
          } else if (Array.isArray(wf.steps)) {
            workflowSteps = wf.steps;
          }

          if (workflowSteps.length === 0) workflowSteps = ["diagnose"];
        } catch {
          workflowSteps = ["diagnose"];
        }
      }
    }
  }

  console.log(`📋 [${squadName}] Tasks: ${workflowSteps.join(", ")}`);

  const firstTaskPath = `${squadPath}/tasks/${workflowSteps[0]}.md`;
  const firstTaskContent = fs.existsSync(firstTaskPath)
    ? fs.readFileSync(firstTaskPath, "utf8") : "";

  const selectedAgents = (
    await chooseAgents(squadPath, allAgents, question, firstTaskContent)
  ).filter(a => allAgents.includes(a));

  console.log(`🤖 [${squadName}] Agentes: ${selectedAgents.join(", ")}`);

  let context = sharedContext;

  for (const step of workflowSteps) {
    const taskPath = `${squadPath}/tasks/${step}.md`;
    const taskContent = fs.existsSync(taskPath)
      ? fs.readFileSync(taskPath, "utf8") : "";

    const results = await Promise.all(
      selectedAgents.map(agentFile =>
        runAgent(
          `${squadPath}/agents/${agentFile}`,
          agentFile, taskContent, question, context
        )
      )
    );

    context += results.filter(Boolean).join("\n\n");
    context = context.slice(-12000);
  }

  return context;
}

export { runSquad };

export async function runAI(question) {
  const [plan, mode] = await Promise.all([
    orchestrate(question),
    Promise.resolve(chooseMode(question)),
  ]);

  const squads = plan.map(p => p.squad);

  console.log("⚡ Modo:", mode);
  console.log("🔗 Squads ativados:", squads);

  const squadResults = await limitedParallel(
    plan.map(({ squad, task }) => () => runSquad(squad, question, mode, "", task)),
    2
  );

  const mainRaw = squadResults[0] || "";
  const complementaryRaw = squadResults.slice(1).join("\n\n");

  console.log("🔍 [Controle de Qualidade] Analisando rascunhos...");
  console.log("🧹 [Sintetizador] Organizando rascunhos...");

  const [critiqueResponse, synthesisResponse] = await Promise.all([
    withRetry(() =>
      client.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 4096,
        messages: [{ role: "user", content: CRITIC_PROMPT(mainRaw + "\n\n" + complementaryRaw, question) }],
      })
    ),
    withRetry(() =>
      client.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 4096,
        messages: [{ role: "user", content: SYNTHESIZER_PROMPT(mainRaw, complementaryRaw) }],
      })
    ),
  ]);

  const critique = extractText(critiqueResponse);
  const cleanContext = extractText(synthesisResponse);

  let finalOutput = "";
  let currentScore = 0;
  let scoreDetails = {};
  let attempts = 0;

  console.log("✍️ [Editor-Chefe] Lapidando resposta final...");

  while (currentScore < 8 && attempts < 3) {
    const previousAttempt = attempts > 0 ? {
      text: finalOutput.slice(0, 2000),
      score: currentScore,
      clarity: scoreDetails.clarity || 0,
      specificity: scoreDetails.specificity || 0,
      persuasion: scoreDetails.persuasion || 0,
    } : null;

    const finalResponse = await withRetry(() =>
      client.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 8000,
        messages: [{ role: "user", content: EDITOR_PROMPT(cleanContext, critique, question, squads[0], previousAttempt) }],
      })
    );

    finalOutput = extractText(finalResponse);

    const scoreResponse = await withRetry(() =>
      client.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        messages: [{ role: "user", content: SCORE_PROMPT(finalOutput, question) }],
      })
    );

    const scoreText = extractText(scoreResponse);

    try {
      scoreDetails = JSON.parse(scoreText.match(/\{.*\}/s)?.[0] || "{}");
      currentScore = scoreDetails.overall || 0;
      console.log(`✨ Tentativa ${attempts + 1} - Score: ${currentScore}/10 (C:${scoreDetails.clarity} S:${scoreDetails.specificity} P:${scoreDetails.persuasion})`);
    } catch {
      currentScore = parseInt(scoreText.match(/\d+/)?.[0] || "0");
      console.log(`✨ Tentativa ${attempts + 1} - Score (fallback): ${currentScore}/10`);
    }

    attempts++;

    if (currentScore < 8 && attempts < 3) {
      console.log("🔄 Refinando com feedback da tentativa anterior...");
    }
  }

  return {
    text: finalOutput,
    squads,
    qualityScore: currentScore,
  };
}