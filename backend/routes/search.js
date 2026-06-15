const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

// Пути к файлам
const NEWS_FILE = path.join(__dirname, '..', 'data', 'news.json');
const PROJECTS_FILE = path.join(__dirname, '..', 'data', 'projects.json');

// GET /api/search?q=ракета
router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Введите поисковый запрос (?q=...)' });

    const query = q.toLowerCase();

    // Читаем данные параллельно
    const [newsRaw, projectsRaw] = await Promise.all([
      fs.readFile(NEWS_FILE, 'utf-8'),
      fs.readFile(PROJECTS_FILE, 'utf-8')
    ]);

    const news = JSON.parse(newsRaw);
    const projects = JSON.parse(projectsRaw);

    // Функция поиска
    const searchInArray = (arr) => arr.filter(item => 
      JSON.stringify(item).toLowerCase().includes(query)
    );

    res.json({
      query: q,
      results: {
        news: searchInArray(news),
        projects: searchInArray(projects),
        // Вакансии можно добавить аналогично
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка поиска' });
    console.error(err);
  }
});

module.exports = router;