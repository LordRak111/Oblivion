const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'projects.json');

// GET /api/projects?status=current
router.get('/', async (req, res) => {
  try {
    const rawData = await fs.readFile(DATA_FILE, 'utf-8');
    let projects = JSON.parse(rawData);

    // Фильтрация
    const { status } = req.query;
    if (status) {
      projects = projects.filter(p => p.status === status);
    }

    res.json({
      success: true,
      count: projects.length,
      filter: status || 'all',
      data: projects
    });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка чтения проектов' });
  }
});

module.exports = router;