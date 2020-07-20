const express = require('express');
const router = express.Router();

const imageCtrl = require('./image.controller');

/* Image upload  */
const multer = require('multer');
const storage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null, '/root/madcamp_second/backend/public/images');
    },
    
    filename: function(req, file, cb) {
        console.log(file.originalname);
        cb(null, req.headers.userid 
            + "_" + req.headers.imagekind 
            + "_" + file.originalname);
    }
});

const upload = multer({storage: storage});

router.post('/upload', upload.single('image'), imageCtrl.upload);

router.get('/download', imageCtrl.download);
module.exports = router;