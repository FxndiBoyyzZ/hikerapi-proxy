const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const HIKER_TOKEN = process.env.HIKER_TOKEN || 'dau2pb0u4m2ceea61bfu5mxwhg06i51r';

app.get('/api/profile', async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: 'ID is required (e.g., /api/profile?id=123456)' });
  }

  try {
    const response = await axios.get(`https://api.hikerapi.com/v2/user/by/id`, {
      headers: {
        'x-access-key': HIKER_TOKEN,
        'accept': 'application/json',
      },
      params: {
        id,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Erro ao buscar perfil', details: error.response?.data || error.message });
  }
});

app.get('/', (req, res) => {
  res.send('API Hiker Proxy Online');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
