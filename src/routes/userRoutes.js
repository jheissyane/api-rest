const express = require('express');
const { getUser } = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/profile', authenticate, getUser);

module.exports = router;
