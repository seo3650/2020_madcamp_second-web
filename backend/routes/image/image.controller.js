const Contact = require('../../models/contact');
const Account = require('../../models/account');
const Joi = require('joi');
const fs = require('fs');

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

exports.download = async (req, res) => {
    /* let account */
    let account = null;
    try {
        account = await Account.findById(req.headers.userid);
    } catch (e) {
        res.status(401).json({ message: e.message });
        return;
    }

    /* Download register */
    console.log(req.query);
    const fileName = "/root/madcamp_second/backend/public/images/"
        + req.headers.userid + "_"
        + req.headers.imagekind + "_" 
        + req.query.name + ".jpg";
    console.log(fileName)
    res.sendFile(fileName);
    // fs.readFile(fileName, function (err, data) {
    //     if (err) {
    //         console.log(err);
    //         res.status(404).json({message: err.message});
    //         return;
    //     } 
    //     console.log(data);
    //     res.status(200).json({message: "TODO"});
    // })
    
    return;
}
