const express = require('express');
const router = express.Router();
const { getProfile, updateUsername } = require('../controllers/profileController');

router.get('/:userId', getProfile);
router.put('/:userId/username', updateUsername);

module.exports = router;