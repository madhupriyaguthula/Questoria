const express = require('express');
const router = express.Router();
const { startBattle, submitAnswer, getBattle } = require('../controllers/bossController');

router.post('/:userId/start', startBattle);
router.post('/:battleId/answer', submitAnswer);
router.get('/:battleId', getBattle);

module.exports = router;