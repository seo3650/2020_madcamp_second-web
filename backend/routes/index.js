const express = require('express');
const router = express.Router();

const contactRouter = require('./contact/index');

/* GET home page. */
router.use('/contact', contactRouter);

module.exports = router;
