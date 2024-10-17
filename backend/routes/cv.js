const express = require('express');
const { createCv, updateCv, getVisibleCvs, getCvById, searchCvs } = require('../controllers/cvController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createCv); // Créer un CV
router.put('/:cvId', authMiddleware, updateCv); // Modifier un CV
router.get('/search', authMiddleware, searchCvs); // Recherche de CV par nom et prénom
router.get('/', authMiddleware, getVisibleCvs); // Obtenir tous les CV visibles
router.get('/:cvId', authMiddleware, getCvById); // Obtenir un CV par ID

module.exports = router;