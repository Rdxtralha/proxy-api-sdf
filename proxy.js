const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/proxy", async (req, res) => {
    const texto = req.query.texto;

    if (!texto) {
        return res.status(400).json({ error: "Texto não fornecido" });
    }

    try {
        const response = await axios.get(\`https://yuxinze-apis.onrender.com/ias/deepseek?texto=\${encodeURIComponent(texto)}\`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar resposta da IA." });
    }
});

app.listen(PORT, () => {
    console.log(\`Servidor rodando em http://localhost:\${PORT}\`);
});