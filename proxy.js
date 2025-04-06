import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

app.get('/query', async (req, res) => {
  const userQuery = req.query.q;

  if (!userQuery) {
    return res.status(400).json({ error: 'Parâmetro "q" (query) é obrigatório.' });
  }

  try {
    const response = await fetch('https://yuxinze-apis.onrender.com/ias/deepseek', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: userQuery })
    });

    const data = await response.json();

    res.json({ response: data.text });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar resposta da IA.', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy rodando na porta ${PORT}`);
});
