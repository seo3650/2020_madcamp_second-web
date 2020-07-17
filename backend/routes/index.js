const express = require('express');
const router = express.Router();

const contactRouter = require('./contact/index');
const accountRouter = require('./account/index');

/* GET home page. */
router.use('/contact', contactRouter);
router.use('/account', accountRouter)

module.exports = router;
