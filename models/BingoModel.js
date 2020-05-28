const mongoose = require('mongoose');

const BingoSchema = new mongoose.Schema({
    name: { type: String },
    code: { type: String },
    items: [{  type: String}],

});

BingoSchema.set('toJSON', { getters: true });

module.exports.Bingo = mongoose.model('Bingo', BingoSchema);