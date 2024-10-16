const Recommendation = require('../models/Recommendation');

// Créer une recommandation
const createRecommendation = async (req, res) => {
    const { cvId, message } = req.body;

    try {
        const recommendation = new Recommendation({
            cvId,
            userId: req.user.id,  // On utilise l'ID de l'utilisateur authentifié
            message
        });

        await recommendation.save();
        res.status(201).json(recommendation);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Obtenir toutes les recommandations d'un CV
const getRecommendationsByCvId = async (req, res) => {
    const { cvId } = req.params;

    try {
        const recommendations = await Recommendation.find({ cvId }).populate('userId', 'name email');
        res.json(recommendations);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createRecommendation, getRecommendationsByCvId };