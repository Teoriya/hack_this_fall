const router = require('express').Router();
const AuthController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/login', AuthController.login);
router.post('/logout', authMiddleware ,AuthController.logout);
router.get('/data', authMiddleware, AuthController.getUserData);

module.exports = router;