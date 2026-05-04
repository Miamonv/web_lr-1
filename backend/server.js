const express = require('express');
const cors = require('cors');

require('dotenv').config();

const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs'); // шифрування паролів
const jwt = require('jsonwebtoken'); // генерація JWT токенів

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const app = express();
app.use(cors());
app.use(express.json());

// реєстрація нового користувача
app.post('/api/auth/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Цей email вже зайнятий' });

    const hashedPassword = await bcrypt.hash(password, 12);

    // додати юзера до бази
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({ token, message: 'Реєстрація успішна!' });
  } catch (err) {
    next(err);
  }
});

// вхід
app.post('/api/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Невірний email або пароль' });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(401).json({ message: 'Невірний email або пароль' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.json({ token, message: 'Вхід успішний!' });
  } catch (err) {
    next(err);
  }
});

// Middleware для перевірки токена
const authenticate = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Немає доступу. Будь ласка, увійдіть в систему.' });
  }

  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Недійсний або прострочений токен' });
  }
};

// GET тільки для авторизованих користувачів
app.get('/api/lessons/passed', authenticate, async (req, res, next) => {
  try {
    const passedLessons = await prisma.passedLesson.findMany({
      where: { userId: req.userId },
      orderBy: { passedAt: 'desc' },
    });
    res.json(passedLessons);
  } catch (err) {
    next(err);
  }
});

// POST для збереження нового пройденого уроку
app.post('/api/lessons/passed', authenticate, async (req, res, next) => {
  try {
    const { lessonId, title } = req.body;

    const newLesson = await prisma.passedLesson.create({
      data: {
        userId: req.userId,
        lessonId: lessonId,
        title: title
      }
    });
    res.status(201).json(newLesson);
  } catch (err) {
    next(err);
  }
});

// обробник помилок
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Внутрішня помилка сервера' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер успішно запущено на порту ${PORT}`);
});