import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());

app.get('/', async (req, res) => {
  const texto = req.query.texto;
  if (!texto) return res.status(400).json({ erro: 'Texto não fornecido' });

  try {
    const response = await fetch('https://yuxinze-apis.onrender.com/ias/deepseek', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: texto })
    });

    const data = await response.json();
    res.json({ resposta: data.result });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar resposta da IA', detalhe: error.message });
  }
});

app.listen(port, () => {
  console.log(`Proxy rodando na porta ${port}`);
});