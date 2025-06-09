const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest:'uploads/' });
const { postRFQ,getRFQs,awardRFQ } = require('../controllers/rfqController');
const { verifyToken,verifyRole } = require('../middleware/auth');

router.post('/', verifyToken, verifyRole('buyer'), upload.single('file'), postRFQ);
router.get('/', verifyToken, getRFQs);
router.put('/:id/award', verifyToken, verifyRole('buyer'), awardRFQ);

module.exports = router;
