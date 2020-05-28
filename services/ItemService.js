const {Item}  = require( '../models/ItemModel')

const fetchItems = function () {
    return new Promise((resolve, reject) => {
        Item.find({}).exec((err, res) => (
            err ?  reject(err) : resolve(res)
        ));
    })
}

const findItem = function(id) {
    return new Promise((resolve, reject) => {
        Item.findOne({_id: id}).exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}


const createItem = async function (name) {

    let img = "/media/items/img/" + name + ".png"
    let snd = "/media/items/snd/" + name + ".mp3"

    const doc = new Item({
        name,
        img: img,
        snd: snd
    })

    doc.id = doc._id;

    return new Promise((resolve, rejects) => {
        doc.save((error => {
            if (error) {
                rejects(error)
            }
            resolve(doc)
        }))
    })
}


module.exports.findItem = findItem
module.exports.createItem = createItem
module.exports.fetchItems = fetchItems