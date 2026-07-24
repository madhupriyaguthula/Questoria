const express = require('express');
const router = express.Router();
const { getChronicle } = require('../controllers/chronicleController');

router.get('/:userId', getChronicle);

module.exports = router;