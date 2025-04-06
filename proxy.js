import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());

app.get('/', async (req, res) => {
  const texto = req.query.texto;
  if (!texto) {
    return res.status(400).json({ error: 'Texto não fornecido.' });
  }

  try {
    const response = await fetch('https://yuxinze-apis.onrender.com/ias/deepseek', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texto })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao acessar a IA.' });
  }
});

app.listen(port, () => {
  console.log(`Proxy rodando na porta ${port}`);
});
