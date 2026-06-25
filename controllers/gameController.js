import Game from '../models/Game.js';
import Package from '../models/Package.js';

export const getAllGames = async (req, res) => {
  try {
    const { search, sort } = req.query;
    let query = { isActive: true };

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const games = await Game.find(query)
      .sort({ orderIndex: 1, name: 1 })
      .populate('packages');

    res.json(games);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id).populate('packages');
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getGamesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const games = await Game.find({ category, isActive: true })
      .sort({ orderIndex: 1, name: 1 })
      .populate('packages');

    res.json(games);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getPackagesByGame = async (req, res) => {
  try {
    const { gameId } = req.params;
    const packages = await Package.find({ game: gameId, isActive: true });
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
