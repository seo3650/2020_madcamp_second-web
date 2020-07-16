const express = require('express');
const router = express.Router();

const contactCtrl = require('./contact.controller');

router.post('/register', contactCtrl.register);
router.post('/getContact', contactCtrl.getContact);

module.exports = router;