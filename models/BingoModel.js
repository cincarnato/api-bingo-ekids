const mongoose = require('mongoose');

const BingoSchema = new mongoose.Schema({
    name: { type: String },
    code: { type: String },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
    }],
    cardQtyItems: {type: Number, default: 9}

});

BingoSchema.set('toJSON', { getters: true });

module.exports.Bingo = mongoose.model('Bingo', BingoSchema);