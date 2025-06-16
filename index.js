const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Libera CORS
app.use(cors());

// Token da sua API
const API_KEY = 'dau2pb0u4m2ceea61bfu5mxwhg06i51r';

app.get('/profile', async (req, res) => {
  const { username } = req.query;

  if (!username) return res.status(400).json({ error: 'Usuário não informado' });

  try {
    const response = await fetch(`https://api.hikerapi.com/v2/user/by/username/${username}`, {
      method: 'GET',
      headers: {
        'x-access-key': API_KEY,
        'accept': 'application/json',
      }
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: 'Erro na API proxy', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
