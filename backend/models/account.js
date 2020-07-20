const mongoose = require('mongoose');
const { URITooLong } = require('http-errors');
const Schema = mongoose.Schema;
const Contact = require('./contact');

const Account = new Schema({
    userId: { type: String, required: true, unique: true },
    contact: [{
        id: String,
        name: String, 
        number: String
    }],
    gallery: [String]
},
{
    timestamps: true
});

Account.statics.register = function (userId) {
    const account = new this({
        userId: userId,
        contact: [],
        gallery: []
    });
    this.findOne({'userId': userId}, function(err, obj) {
        if (obj == null) {
            return account.save();
        } else {
            return null;
        }
    })
};

Account.statics.findById = function(userId) {
    return this.findOne({'userId': userId});
};

module.exports = mongoose.model('Account', Account)