const {Item}  = require( '../models/ItemModel')

module.exports.fetchItems = function () {
    return new Promise((resolve, reject) => {
        Item.find({}).exec((err, res) => (
            err ?  reject(err) : resolve(res)
        ));
    })
}