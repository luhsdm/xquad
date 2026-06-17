import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  const response = await client.responses.create({
    model: "gpt-5-mini",
    input: "Explique em 3 linhas o que é um squad de IA estilo C-level.",
  });

  console.log(response.output_text);
}

main();