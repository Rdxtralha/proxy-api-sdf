const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/query", async (req, res) => {
  try {
    const { texto } = req.body;

    if (!texto) {
      return res.status(400).json({ error: "Parâmetro 'texto' ausente." });
    }

    const resposta = await axios.post("https://yuxinze-apis.onrender.com/ias/gemini", {
      prompt: texto
    });

    const resultadoIA = resposta.data?.resultado?.resposta || resposta.data;

    res.json({ resposta: resultadoIA });
  } catch (err) {
    console.error("❌ Erro ao consultar IA:", err?.response?.data || err.message);
    res.status(500).json({
      error: "Erro ao consultar IA.",
      detalhes: err?.response?.data || err.message
    });
  }
});

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => console.log(`🚀 Proxy ativo na porta ${PORT}`));
