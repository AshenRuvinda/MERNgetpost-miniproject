const express = require('express');
const multer = require('multer');
const path = require('path');
const Card = require('../models/Card');

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// POST: Create a new product card with image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { productName, productDescription, productPrice } = req.body;
    console.log('Received data:', { productName, productDescription, productPrice, file: req.file }); // Log data
    if (!productName || !productDescription || !productPrice || !req.file) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const imagePath = req.file.path;
    const card = new Card({
      productName,
      productDescription,
      productPrice: parseFloat(productPrice),
      imagePath,
    });
    await card.save();
    res.status(201).json(card);
  } catch (error) {
    console.error('Error creating card:', error.message, error.stack);
    res.status(500).json({ message: 'Error creating card', error: error.message });
  }
});

// GET: Fetch all cards
router.get('/', async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    console.error('Error fetching cards:', error.message, error.stack);
    res.status(500).json({ message: 'Error fetching cards', error: error.message });
  }
});

module.exports = router;