const Cv = require('../models/Cv');

// Créer un CV
const createCv = async (req, res) => {
    const { firstName, lastName, description, education, workExperience, visible } = req.body;

    try {
        const cv = new Cv({
            userId: req.user.id,  // On utilise l'ID de l'utilisateur authentifié
            firstName,
            lastName,
            description,
            education,
            workExperience,
            visible
        });

        await cv.save();
        res.status(201).json(cv);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Modifier un CV
const updateCv = async (req, res) => {
    const { cvId } = req.params;
    const { firstName, lastName, description, education, workExperience, visible } = req.body;

    try {
        const cv = await Cv.findOneAndUpdate(
            { _id: cvId, userId: req.user.id }, // S'assurer que seul l'auteur peut modifier son CV
            { firstName, lastName, description, education, workExperience, visible },
            { new: true }  // Retourner le CV mis à jour
        );

        if (!cv) {
            return res.status(404).json({ message: 'CV not found' });
        }

        res.json(cv);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// Obtenir tous les CV visibles
const getVisibleCvs = async (req, res) => {
    try {
        const cvs = await Cv.find({ visible: true }).populate('userId', 'name email');
        res.json(cvs);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
};

// Obtenir un CV par ID
const getCvById = async (req, res) => {
    const { cvId } = req.params;

    try {
        const cv = await Cv.findById(cvId).populate('userId', 'name email');
        if (!cv || !cv.visible) {
            return res.status(404).json({ message: 'CV not found or not visible' });
        }

        res.json(cv);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
// Chercher un CV par nom / prénom
const searchCvs = async (req, res) => {
    const { name } = req.query;

    try {
        const cvs = await Cv.find({
            visible: true,
            $or: [
                { firstName: { $regex: name, $options: 'i' } },
                { lastName: { $regex: name, $options: 'i' } }
            ]
        }).populate('userId', 'name email');

        res.json(cvs);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Obtenir tous les CVs d'un utilisateur connecté
const getUserCvs = async (req, res) => {
    try {
        const cvs = await Cv.find({ userId: req.user.id }).populate('userId', 'name email');
        res.json(cvs);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createCv, updateCv, getVisibleCvs, getCvById, searchCvs, getUserCvs };