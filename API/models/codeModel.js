const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
    codeData: {
        html: String,
        css: String,
        javascript: String
    }
})

const code = mongoose.model('code', codeSchema);

module.exports = code;