const mongoose = require('mongoose');
const { URITooLong } = require('http-errors');
const Schema = mongoose.Schema;
const Contact = require('./contact');

const Account = new Schema({
    userId: { type: String, required: true, unique: true },
    contact: { type: Object },
    gallery: { type: Object }
},
{
    timestamps: true
});

Account.statics.register = function(userId) {
    const account = new this({
        userId: userId,
        contact: [],
        gallery: []
    });
    
    return account.save()
};

Account.statics.findById = function(userId) {
    return this.findOne({'userId': userId});
};

Account.methods.addContact = function({ id, name, number }) {
    const contact = new Contact({
        id: id,
        name: name,
        number: number,
    });

    
    let result = this.contact.filter(function(object) {
        return object["id"] === id;
    })
    if (result.length != 0) {
        return contact;
    }

    var temp = JSON.parse(JSON.stringify( this.contact ))
    temp.push(contact);
    this.contact = temp;
    console.log(this)
    this.save();
    return contact;
};

module.exports = mongoose.model('Account', Account)