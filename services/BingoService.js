const {Bingo}  = require( '../models/BingoModel')
const {fetchItems}  = require( './ItemService')

module.exports.findBingo = function (id) {
    return new Promise((resolve, reject) => {
        Bingo.findOne({_id: id}).exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}


module.exports.createBingo = async function (name) {

    let code = randomstring(8)

    const doc = new Bingo({
        name,
        code
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


module.exports.raffleItem = async function (bingoId) {

    let items = await fetchItems()
    let bingo = await findBingo(bingoId)

    let itemsLeft = items.filter(item => !bingo.items.some(i => i._id == item._id))
    
    let randomindex = Math.floor(Math.random() * itemsLeft.length) 
    let randomItem = itemsLeft.length[randomindex]

    return new Promise((resolve, rejects) => {
        Bingo.findOneAndUpdate({_id: bingoId},
            {
                $addToSet: { items: randomItem._id }
    
            },
            {new: true, runValidators: true, context: 'query'},
            (error, doc) => {
                if (error) {
                    rejects(error)
                }

                resolve(doc)
            })


    })
}


function randomstring(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
