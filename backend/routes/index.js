const express = require('express');
const router = express.Router();

const contactRouter = require('./contact/index');
const accountRouter = require('./account/index');
const imageRouter = require('./image/index');

/* GET home page. */
router.use('/contact', contactRouter);
router.use('/account', accountRouter);
router.use('/image', imageRouter)

// router.post('/imageTest', upload.single('image'), function(req, res) {
//     res.json({ result: "Uploaded" })
// })

module.exports = router;
