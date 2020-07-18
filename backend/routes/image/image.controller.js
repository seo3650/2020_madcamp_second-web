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
    try {
        await account.addImage(req.file.filename);
    } catch (e) {
        res.status(500).json({ message: e });
        return;
    }

    res.status(201).send()
};
