const express = require('express');
const { createCv, updateCv, getVisibleCvs, getCvById, searchCvs, getUserCvs } = require('../controllers/cvController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createCv); // Créer un CV
router.put('/:cvId', authMiddleware, updateCv); // Modifier un CV
router.get('/', authMiddleware, getVisibleCvs); // Obtenir tous les CV visibles
router.get('/search', authMiddleware, searchCvs); // Recherche de CV par nom et prénom
router.get('/user', authMiddleware, getUserCvs); // Obtenir tous les CV d'un utilisateur
router.get('/:cvId', authMiddleware, getCvById); // Obtenir un CV par ID


module.exports = router;