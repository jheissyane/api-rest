const express = require('express');
const { getUser, inicio } = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/profile', authenticate, getUser);
router.get('', inicio);

module.exports = router;
