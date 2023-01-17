const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');

router.post('/login', authController.login);
router.get('/user', authController.user);
router.get('/logout', authController.logout);
router.get('/token', authController.token);

module.exports = router;