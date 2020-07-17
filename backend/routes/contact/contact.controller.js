const Contact = require('../../models/contact');
const Account = require('../../models/account');
const Joi = require('joi')

exports.register = async (req, res) => {
    /* Verify data */
    let schema = Joi.object().keys({
        id: Joi.number().required(),
        name: Joi.string().required(),
        number: Joi.string().required()
    });
    console.log(req.body.user);
    // console.log(req.headers.token);
    let result = schema.validate(req.body.user);
    if (result.error) {
        res.status(400).json({ message: result.error.message });
        return;
    }

    /* Get account */
    let account = null;
    try {
        account = await Account.findById(req.headers.userid);
    } catch (e) {
        res.status(401).json({ message: e.message });
        return;
    }

    /* Add contact */
    let contact = null
    try {
        contact = await account.addContact(req.body.user);
    } catch (e) {
        res.status(500).json({ message: e });
        return;
    }

    res.status(200).json({ result: contact })
};

// exports.getContact = async (req, res) => {
//     /* Verify data */
//     const schema = Joi.object().keys({
//         id: Joi.number().required(),
//     })
//     const result = schema.validate(req.body.user);
//     if (result.error) {
//         res.status(400).json({ message: result.error.message });
//         return;
//     }

//     /* Get contact info */
//     let contact = null;
//     try {
//         contact = await Contact.findById(req.body.user.id);
//     } catch (e) {
//         res.status(500).json({ message: e.message });
//         return;
//     }
//     console.log(contact)
//     res.status(200).json({ result: contact })
// }