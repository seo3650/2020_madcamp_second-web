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


module.exports = mongoose.model('Contact', Contact)