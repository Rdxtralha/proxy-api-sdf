import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

app.get('/query', async (req, res) => {
  const userQuery = req.query.texto;

  if (!userQuery) {
    return res.status(400).json({ error: 'Parâmetro "texto" é obrigatório.' });
  }

  try {
    const url = `https://yuxinze-apis.onrender.com/ias/deepseek?texto=${encodeURIComponent(userQuery)}`;

    const response = await fetch(url);
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');

    if (!isJson) {
      const text = await response.text();
      return res.status(502).json({
        error: 'Resposta inválida da API da IA',
        contentType,
        body: text
      });
    }

    const data = await response.json();
    res.json({ response: data.resultado });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar resposta da IA.', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy rodando na porta ${PORT}`);
});
