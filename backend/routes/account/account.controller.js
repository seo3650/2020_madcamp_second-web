const Account = require('../../models/account');
const Joi = require('joi')

exports.register = async (req, res) => {
    console.log("Try register: " + req.headers);

    /* Add account */
    let account = null;
    try {
        account = await Account.register(req.headers.userid);
    } catch (e) {
        res.status(500).json({ message: e.message });
        return;
    }
    if (account == null) {
        res.status(204).send();
        return;
    }

    res.status(200).json({ result: req.body.user })
};
