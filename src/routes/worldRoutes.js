const express = require('express');
const router = express.Router();
const { getWorldData, addRewards } = require('../controllers/worldController');

console.log('World routes loaded');   // ← add this line here

router.get('/:userId', getWorldData);
router.post('/:userId/rewards', addRewards);

module.exports = router;