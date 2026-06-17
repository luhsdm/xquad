// agent-selector.js

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import { withRetry, extractText } from "./utils.js";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function loadFolder(folderPath) {
  if (!fs.existsSync(folderPath)) return "";
  return fs.readdirSync(folderPath)
    .filter(file => fs.lstatSync(`${folderPath}/${file}`).isFile())
    .map(file => {
      const content = fs.readFileSync(`${folderPath}/${file}`, "utf8");
      return `--- ${file} ---\n${content}`;
    })
    .join("\n\n");
}

function preSelectCount(totalAgents) {
  if (totalAgents <= 5)  return totalAgents;
  if (totalAgents <= 10) return 5;
  if (totalAgents <= 20) return 7;
  return 9;
}

export async function chooseAgents(squadPath, agentsList, userInput, taskContent) {

  const totalAgents = agentsList.length;
  const nPreSelect  = preSelectCount(totalAgents);

  console.log(`🔍 Squad: ${totalAgents} agentes → pré-selecionando ${nPreSelect}`);

  const squadYaml = fs.existsSync(`${squadPath}/squad.yaml`)
    ? fs.readFileSync(`${squadPath}/squad.yaml`, "utf8")
    : "";

  // ── NÍVEL 1: pré-seleção com retry ──
  const preSelect = await withRetry(() =>
    client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 256,
      messages: [{ role: "user", content: `
Você é um seletor de especialistas.

Com base na estrutura do squad abaixo, escolha os ${nPreSelect} agentes com maior potencial para essa tarefa.
Esses agentes serão analisados em profundidade na próxima etapa.

=== SQUAD.YAML ===
${squadYaml}

=== TASK ATUAL ===
${taskContent}

=== OBJETIVO DO USUÁRIO ===
${userInput}

Regras:
- escolha EXATAMENTE ${nPreSelect} agentes
- use apenas nomes que aparecem em components.agents no yaml
- retorne apenas os nomes dos arquivos separados por vírgula
      ` }],
    })
  );

  const preSelected = extractText(preSelect)
    .trim()
    .split(",")
    .map(a => a.trim())
    .filter(a => agentsList.includes(a));

  console.log(`✅ Pré-selecionados: ${preSelected.join(", ")}`);

  // ── NÍVEL 2: seleção profunda com retry ──
  const agentsContext = preSelected.map(agentFile => {
    const path = `${squadPath}/agents/${agentFile}`;
    if (!fs.existsSync(path)) return "";
    const content = fs.readFileSync(path, "utf8");
    return `=== AGENT: ${agentFile} ===\n${content}`;
  }).join("\n\n");

  const workflowsContext  = loadFolder(`${squadPath}/workflows`);
  const tasksContext      = loadFolder(`${squadPath}/tasks`);
  const checklistsContext = loadFolder(`${squadPath}/checklists`);
  const dataContext       = loadFolder(`${squadPath}/data`);

  const finalSelect = await withRetry(() =>
    client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 256,
      messages: [{ role: "user", content: `
Você é um seletor de especialistas de elite.

Analise em profundidade os agentes abaixo e escolha os 3 MELHORES para essa execução específica.
Considere personalidade, especialização, histórico e fit exato com a task e objetivo.

=== AGENTES CANDIDATOS (leia completo) ===
${agentsContext}

=== WORKFLOWS DO SQUAD ===
${workflowsContext}

=== TASKS DO SQUAD ===
${tasksContext}

=== CHECKLISTS ===
${checklistsContext}

=== DATA ===
${dataContext}

=== TASK ATUAL ===
${taskContent}

=== OBJETIVO DO USUÁRIO ===
${userInput}

Regras:
- escolha EXATAMENTE 3 agentes dos candidatos acima
- não invente nomes
- retorne apenas os nomes dos arquivos separados por vírgula
      ` }],
    })
  );

  const raw = extractText(finalSelect).trim();
  console.log(`🔎 [RAW finalSelect]: "${raw}"`);

  const clean = raw.replace(/\*\*/g, "").replace(/`/g, "").trim();
  const final = clean.split(",").map(a => a.trim()).filter(a => agentsList.includes(a));

  console.log(`🎯 Agentes finais: ${final.join(", ")}`);

  // Se o filtro zerou tudo, usa os pré-selecionados como fallback
  if (final.length === 0) {
    console.log(`⚠️ Fallback: usando primeiros 3 pré-selecionados`);
    return preSelected.slice(0, 3);
  }

  return final;
  }