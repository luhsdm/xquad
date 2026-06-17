import express from "express";
import cors from "cors";
import { runAI } from "./engine.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const result = await runAI(message);

    // 🔥 AQUI — LOG PRA DEBUG
    console.log("RESULTADO DO ENGINE:");
    console.log(result);

    res.json(result);
  } catch (err) {
    console.error("ERRO NO SERVER:", err);
    res.status(500).json({ error: "Erro ao processar" });
  }
});

app.listen(3000, () => {
  console.log("🚀 API rodando em http://localhost:3000");
});