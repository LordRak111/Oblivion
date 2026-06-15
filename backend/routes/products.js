const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'products.json');

// GET /api/products?category=Ракеты&search=Орбита&page=1&limit=12
router.get('/', async (req, res) => {
  try {
    const rawData = await fs.readFile(DATA_FILE, 'utf-8');
    let products = JSON.parse(rawData);

    // Фильтрация по категории
    const { category, search, page = 1, limit = 12 } = req.query;
    
    if (category && category !== 'Все') {
      products = products.filter(p => p.category === category);
    }

    // Поиск
    if (search) {
      const q = search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.shortDesc.toLowerCase().includes(q)
      );
    }

    // Пагинация
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedProducts = products.slice(startIndex, startIndex + limitNum);

    res.json({
      success: true,
      count: paginatedProducts.length,
      total: products.length,
      page: pageNum,
      totalPages: Math.ceil(products.length / limitNum),
      items: paginatedProducts
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка чтения каталога' });
  }
});

module.exports = router;