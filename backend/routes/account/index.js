const express = require('express');
const router = express.Router();

const accountCtrl = require('./account.controller');

router.post('/register', accountCtrl.register);

module.exports = router;