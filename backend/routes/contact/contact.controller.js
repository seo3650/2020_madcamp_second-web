const Contact = require('../../models/contact');
const Account = require('../../models/account');
const Joi = require('joi');
const contact = require('../../models/contact');

exports.register = async (req, res) => {
    /* Verify data */
    let schema = Joi.object().keys({
        id: Joi.number().required(),
        name: Joi.string().required(),
        number: Joi.string().required()
    });
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
    let contacts = await account.contact.filter(function(object) {
        return object["id"] == req.body.user.id;
    })
    console.log(contacts);
    if (contacts.length != 0) {
        res.status(204).json({ message: "Contact is already saved." });
        return;
    }

    const updateResult = await Account.updateOne(
        { _id: account._id },
        { 
            $push: {
                contact: req.body.user
            }
        }
    )
    console.log(updateResult)

    res.status(200).json({ message: updateResult });
    return;
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