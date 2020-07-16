const Contact = require('../../models/contact');
const Joi = require('joi')

exports.register = async (req, res) => {
    /* Verify data */
    const schema = Joi.object().keys({
        id: Joi.number().required(),
        name: Joi.string().required(),
        number: Joi.string().required()
    })
    const result = schema.validate(req.body.user);
    if (result.error) {
        res.status(400).json({ message: result.error.message });
        return;
    }

    /* Register contact */
    let contact = null;
    try {
        contact = await Contact.register(req.body.user);
    } catch (e) {
        res.status(500).json({ message: e.message });
        return;
    }

    res.status(200).json({ result: req.body.user })
};

exports.getContact = async (req, res) => {
    /* Verify data */
    const schema = Joi.object().keys({
        id: Joi.number().required(),
    })
    const result = schema.validate(req.body.user);
    if (result.error) {
        res.status(400).json({ message: result.error.message });
        return;
    }

    /* Get contact info */
    let contact = null;
    try {
        contact = await Contact.findById(req.body.user.id);
    } catch (e) {
        res.status(500).json({ message: e.message });
        return;
    }
    console.log(contact)
    res.status(200).json({ result: contact })
}