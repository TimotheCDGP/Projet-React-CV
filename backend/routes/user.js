const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
// pour protéger la route
// router.post('/cv', authMiddleware, createOrUpdateCv);
module.exports = router;