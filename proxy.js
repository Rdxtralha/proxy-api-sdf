const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 1000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Proxy da IA rodando 🚀");
});

app.post("/query", async (req, res) => {
  const { texto } = req.body;

  if (!texto) {
    return res.status(400).json({ error: "Parâmetro 'texto' ausente." });
  }

  try {
    const response = await axios.get("https://yuxinze-apis.onrender.com/ias/gemini", {
      params: {
        prompt: texto,
      },
    });

    if (response.data?.status && response.data?.resultado?.resposta) {
      return res.json({ resposta: response.data.resultado.resposta.trim() });
    } else {
      return res.status(500).json({
        error: "Resposta inválida da API da IA",
        detalhes: response.data,
      });
    }
  } catch (error) {
    console.error("Erro ao consultar a IA:", error.message);
    res.status(500).json({ error: "Erro ao consultar a IA", detalhes: error.message });
  }
});

app.listen(port, () => {
  console.log(`🟢 Proxy rodando em http://localhost:${port}`);
});
