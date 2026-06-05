const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

// Путь к файлу с вакансиями
const DATA_FILE = path.join(__dirname, '..', 'data', 'vacancies.json');

// GET /api/vacancies
router.get('/', async (req, res) => {
  try {
    // Читается файл
    const rawData = await fs.readFile(DATA_FILE, 'utf-8');
    const vacancies = JSON.parse(rawData);

    res.json({
      success: true,
      count: vacancies.length,
      data: vacancies
    });
  } catch (err) {
    console.error(err);
    // Если файла нет, вернётся пустой массив вместо ошибки 500
    res.json({ 
      success: true, 
      count: 0, 
      data: [], 
      note: 'База вакансий пуста или файл не найден' 
    });
  }
});

module.exports = router;