const {Bingo}  = require( '../models/BingoModel')
const {fetchItems}  = require( './ItemService')


const findBingo = function(id) {
    return new Promise((resolve, reject) => {
        Bingo.findOne({_id: id}).populate('items').exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

const findBingoByCode = function(code) {
    return new Promise((resolve, reject) => {
        Bingo.findOne({code: code}).populate('items').exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}


const createBingo = async function (name) {

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


const raffleItem = function (bingoId) {


    return new Promise(async (resolve, rejects) => {
        let items = await fetchItems()
        let bingo = await findBingo(bingoId)
        let bingoItems = bingo.items
      

        let itemsLeft = items.filter(item => !bingoItems.some(i => i._id.equals(item._id)))
        if(itemsLeft.length>0){
            let randomindex = Math.floor(Math.random() * itemsLeft.length) 

            let randomItem = itemsLeft[randomindex]

            Bingo.findOneAndUpdate({_id: bingoId},
            {
                $addToSet: { items: randomItem}
    
            },
            {new: true, runValidators: true, context: 'query'},
            (error, doc) => {
                if (error) {
                    rejects(error)
                }

                resolve(randomItem)
            })

        }else
        resolve(null)
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



module.exports.findBingo = findBingo
module.exports.findBingoByCode = findBingoByCode
module.exports.createBingo = createBingo
module.exports.raffleItem = raffleItem