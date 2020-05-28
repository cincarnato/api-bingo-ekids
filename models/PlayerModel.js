const mongoose = require('mongoose');


const PlayerSchema = new mongoose.Schema({
    bingo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bingo'
    },
    name: { type: String },
    card: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
    }],
});

PlayerSchema.set('toJSON', { getters: true });

module.exports.Player = mongoose.model('Player', PlayerSchema);