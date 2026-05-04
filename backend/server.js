const express = require('express');
const cors = require('cors');

require('dotenv').config();

const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const app = express();
app.use(cors());
app.use(express.json());

// GET
app.get('/api/lessons/passed', async (req, res, next) => {
  try {
    const userId = 1;

    const passedLessons = await prisma.passedLesson.findMany({
      where: { userId: userId },
      orderBy: { passedAt: 'desc' },
    });

    res.json(passedLessons);
  } catch (err) {
    next(err);
  }
});

// POST
app.post('/api/lessons/passed', async (req, res, next) => {
  try {
    const { userId, lessonId, title } = req.body;

    const newLesson = await prisma.passedLesson.create({
      data: {
        userId: userId || 1,
        lessonId: lessonId,
        title: title
      }
    });

    res.status(201).json(newLesson);
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Внутрішня помилка сервера' });
});

// запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер успішно запущено на порту ${PORT}`);
});