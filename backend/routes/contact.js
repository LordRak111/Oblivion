const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const CONTACTS_FILE = path.join(__dirname, '..', 'data', 'contacts.json');

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Заполните все поля' });
    }

    const newContact = {
      id: Date.now(),
      name,
      email,
      message,
      date: new Date().toISOString()
    };

    // Читаем старые контакты, добавляем новый, сохраняем
    let contacts = [];
    try {
      const data = await fs.readFile(CONTACTS_FILE, 'utf-8');
      contacts = JSON.parse(data);
    } catch (e) {
      // Если файла нет, создаем пустой массив
      contacts = [];
    }

    contacts.push(newContact);
    await fs.writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2));

    res.status(201).json({ 
      success: true, 
      message: 'Сообщение отправлено', 
      id: newContact.id 
    });

  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = router;