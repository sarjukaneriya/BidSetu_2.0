const router = require('express').Router();
const { getUsers, banUser, postRFQ, submitQuote } = require('../controllers/adminController');
const { verifyToken,verifyRole } = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest:'uploads/' });

router.get('/users', verifyToken, verifyRole('admin'), getUsers);
router.delete('/users/:id', verifyToken, verifyRole('admin'), banUser);
router.post('/rfq', verifyToken, verifyRole('admin'), upload.single('file'), postRFQ);
router.post('/quote', verifyToken, verifyRole('admin'), submitQuote);

module.exports = router;
