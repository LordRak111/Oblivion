const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

// Путь к файлу БД
const DATA_FILE = path.join(__dirname, '..', 'data', 'news.json');

// GET /api/news?page=1&limit=10
router.get('/', async (req, res) => {
  try {
    // Читаем файл
    const rawData = await fs.readFile(DATA_FILE, 'utf-8');
    const news = JSON.parse(rawData);

    // Параметры пагинации
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // По умолчанию 10

    // Логика пагинации
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedNews = news.slice(startIndex, endIndex);

    res.json({
      success: true,
      count: paginatedNews.length,
      total: news.length,
      page: page,
      data: paginatedNews
    });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка чтения новостей' });
  }
});

module.exports = router;