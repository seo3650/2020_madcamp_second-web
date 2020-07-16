const mongoose = require('mongoose');
const { URITooLong } = require('http-errors');
const Schema = mongoose.Schema;

const Contact = new Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String },
    number: { type: String },
},
{
    timestamps: true
})

Contact.statics.register = function({ id, name, number }) {
    const contact = new this({
        id: id,
        name: name,
        number: number,
    })
    return contact.save()
}

Contact.statics.findById = function(id) {
    return this.findOne({'id': id}).exec();
}

module.exports = mongoose.model('Contact', Contact)