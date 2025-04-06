const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/query", async (req, res) => {
  try {
    const resposta = await axios.post("http://speedhosting.cloud:2009", req.body);
    res.json(resposta.data);
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(500).json({ error: "Erro ao consultar IA." });
  }
});

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => console.log(`Proxy ativo na porta ${PORT}`));
