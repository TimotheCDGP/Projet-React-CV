const express = require('express');
const { createRecommendation, getRecommendationsByCvId } = require('../controllers/recommendationController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createRecommendation); // Créer une recommandation
router.get('/:cvId', getRecommendationsByCvId); // Obtenir toutes les recommandations d'un CV

module.exports = router;