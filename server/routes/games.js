const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const Package = require('../models/Package');

// Get all games
router.get('/', async (req, res) => {
  try {
    const games = await Game.find({ isActive: true }).populate('packages');
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch games', error: err.message });
  }
});

// Get game by ID
router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id).populate('packages');
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch game', error: err.message });
  }
});

// Get packages for a game
router.get('/:gameId/packages', async (req, res) => {
  try {
    const packages = await Package.find({
      game: req.params.gameId,
      isActive: true
    });
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch packages', error: err.message });
  }
});

module.exports = router;
