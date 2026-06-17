import Anthropic from "@anthropic-ai/sdk";
import { extractText } from "./utils.js";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function main() {
  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 256,
    messages: [{ role: "user", content: "Explique em 3 linhas o que é um squad de IA estilo C-level." }],
  });

  console.log(extractText(response));
}

main();
