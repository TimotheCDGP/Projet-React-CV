const express = require('express');
const { createCv, updateCv, getVisibleCvs, getCvById, searchCvs } = require('../controllers/cvController');
const authMiddleware = require('../middlewares/authMiddleware'); // Assurez-vous que ce middleware est utilisé pour la protection

const router = express.Router();

router.post('/', authMiddleware, createCv); // Créer un CV
router.put('/:cvId', authMiddleware, updateCv); // Modifier un CV
router.get('/', getVisibleCvs); // Obtenir tous les CV visibles
router.get('/:cvId', getCvById); // Obtenir un CV par ID

router.get('/search', getVisibleCvs); // Obtenir tous les CV visibles (sans recherche)
router.get('/search', authMiddleware, searchCvs); // Recherche de CV par nom et prénom

module.exports = router;