const mongoose = require('mongoose');


const ItemSchema = new mongoose.Schema({
    name: { type: String },
    img: { type: String },
    snd: { type: String }
});

ItemSchema.set('toJSON', { getters: true });

module.exports.Item = mongoose.model('Item', ItemSchema);