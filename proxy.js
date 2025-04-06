import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 1000;

// 🔓 Libera requisições de qualquer origem
app.use(cors());
app.use(bodyParser.json());

app.post("/ias/gemini", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch("https://yuxinze-apis.onrender.com/ias/gemini?prompt=" + encodeURIComponent(prompt));
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao consultar a IA." });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
