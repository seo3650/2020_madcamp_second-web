const Contact = require('../../models/contact');
const Account = require('../../models/account');
const Joi = require('joi');



exports.upload = async (req, res) => {
    /* Get account */
    let account = null;
    try {
        account = await Account.findById(req.headers.userid);
    } catch (e) {
        res.status(401).json({ message: e.message });
        return;
    }

    /* Add image */
    let image = await account.gallery.filter(function(object) {
        return object == req.file.filename;
    })
    console.log(image);
    if (image.length != 0) {
        res.status(204).json({ message: "image is already saved." });
        return;
    }

    const updateResult = await Account.updateOne(
        { _id: account._id },
        { 
            $push: {
                gallery: req.file.filename
            }
        }
    )
    console.log(updateResult)

    res.status(200).json({ message: updateResult });
    return;
};
