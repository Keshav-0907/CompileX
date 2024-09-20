const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    codeData: {
        html: {
            type: String,
            default: ''
        },
        css: {
            type: String,
            default: ''
        },
        javascript: {
            type: String,
            default: ''
        }
    },
}, { timestamps: true });

const Code = mongoose.model('Code1', codeSchema);

module.exports = Code;