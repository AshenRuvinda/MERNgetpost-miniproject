const express = require('express');
const Card = require('../models/Card');

const router = express.Router();

// POST: Create a new product card
router.post('/', async (req, res) => {
  try {
    const { productName, productDescription, productPrice } = req.body;
    const card = new Card({ productName, productDescription, productPrice });
    await card.save();
    res.status(201).json(card);
  } catch (error) {
    res.status(500).json({ message: 'Error creating card', error });
  }
});

// GET: Fetch all cards
router.get('/', async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cards', error });
  }
});

module.exports = router;