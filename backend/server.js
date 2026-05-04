const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.get('/api/message', (req, res) => {
  res.json({ message: 'Привіт від бекенду EmberLens!' });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

// запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер успішно запущено на порту ${PORT}`);
});