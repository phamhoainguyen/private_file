let record = require('../controllers/recordController');
let express = require('express');
let router = express.Router();
let { authorization } = require('../middlewares/authenticate');

router.use(authorization);

router.get('/', record.getAllRecord);
router.post('/', record.createRecord);
//router.get('/getAllRecord/', record.getAllRecord);

router.get('/:id', record.getRecordByID);
router.delete('/:id', record.deleteRecord);
router.put('/:id', record.updateRecord);

module.exports = router;