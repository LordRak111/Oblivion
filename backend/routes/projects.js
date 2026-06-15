const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'projects.json');

// GET /api/projects
router.get('/', async (req, res) => {
  try {
    const rawData = await fs.readFile(DATA_FILE, 'utf-8');
    const projects = JSON.parse(rawData);

    // Опциональная фильтрация (если надо)
    const { status } = req.query;
    const filtered = status && status !== 'all'
      ? projects.filter(p => p.status === status)
      : projects;

    res.json({
      success: true,
      count: filtered.length,
      total: projects.length,
      filter: status || 'all',
      items: filtered
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      success: false, 
      error: 'Ошибка чтения проектов' 
    });
  }
});

module.exports = router;