const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');

router.post('/login', authController.login);
router.get('/user', authController.user);
router.post('/logout', authController.logout);
router.post('/refresh', authController.refresh);

module.exports = router;