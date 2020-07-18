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
        let testSn = req.body.TEST_SN;
        let qSn = req.body.Q_SN;

        let mimeType;
        switch (file.mimetype) {
            case "image/jpeg" | "image/jpg":
                mimeType = "jpg";
                break;
            case "image/png":
                mimeType = "png";
                break;
            case "image/gif":
                mimeType = "gif";
                break;
            case "image/bmp":
                mimeType = "bmp";
                break;
            default:
                mimeType = "jpg";
        }
        cb(null, file.originalname);
    }
});

const upload = multer({storage: storage});

router.post('/upload', upload.single('image'), imageCtrl.upload);

module.exports = router;