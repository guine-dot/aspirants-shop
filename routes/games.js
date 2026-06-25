import express from 'express';
import { getAllGames, getGameById, getGamesByCategory, getPackagesByGame } from '../controllers/gameController.js';

const router = express.Router();

router.get('/', getAllGames);
router.get('/:id', getGameById);
router.get('/category/:category', getGamesByCategory);
router.get('/:gameId/packages', getPackagesByGame);

export default router;
