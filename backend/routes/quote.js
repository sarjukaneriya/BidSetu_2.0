const router = require('express').Router();
const { submitQuote,getByRFQ } = require('../controllers/quoteController');
const { verifyToken,verifyRole } = require('../middleware/auth');

router.post('/', verifyToken, verifyRole('seller'), submitQuote);
router.get('/rfq/:id', verifyToken, getByRFQ);

module.exports = router;
