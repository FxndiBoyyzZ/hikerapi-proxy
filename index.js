const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const HIKER_TOKEN = process.env.HIKER_TOKEN || 'dau2pb0u4m2ceea61bfu5mxwhg06i51r';

// Cache em memória
const cache = {};

// Rota para buscar perfil pelo username (com cache)
app.get('/api/profile', async (req, res) => {
  const username = req.query.username;
  if (!username) return res.status(400).json({ error: 'Username is required' });

  if (cache[username]) {
    return res.json({ fromCache: true, data: cache[username] });
  }

  try {
    const response = await axios.get(`https://api.hikerapi.com/v1/user/by/username`, {
      headers: {
        'x-access-key': HIKER_TOKEN,
        'accept': 'application/json',
      },
      params: { username },
    });

    cache[username] = response.data;
    res.json({ fromCache: false, data: response.data });
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao buscar perfil',
      details: error.response?.data || error.message,
    });
  }
});

// Rota /api/redis (POST) — simula salvar no cache
app.post('/api/redis', (req, res) => {
  const { key, value } = req.body;
  if (!key || !value) {
    return res.status(400).json({ error: 'Both key and value are required in JSON body' });
  }

  cache[key] = value;
  res.json({ status: 'ok', stored: { key, value } });
});

// Rota padrão
app.get('/', (req, res) => {
  res.send('API Hiker Proxy Online');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
