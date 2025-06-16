const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const HIKER_TOKEN = process.env.HIKER_TOKEN || 'dau2pb0u4m2ceea61bfu5mxwhg06i51r';

app.get('/api/profile', async (req, res) => {
  const username = req.query.username;
  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const response = await axios.get(`https://api.hikerapi.com/api/instagram/info`, {
      params: {
        username,
        token: HIKER_TOKEN,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Erro ao buscar perfil', details: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('API Hiker Proxy Online');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
