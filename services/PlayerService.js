const {Player}  = require( '../models/PlayerModel')
const {findBingoByCode}  = require( './BingoService')
const {findItem}  = require( './ItemService')

const playersByBingo = function (bingoId) {
    return new Promise((resolve, reject) => {
        Player.find({bingo: bingoId}).populate('card').exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

const fetchPlayers = function () {
    return new Promise((resolve, reject) => {
        Player.find({}).exec((err, res) => (
            err ?  reject(err) : resolve(res)
        ));
    })
}


const findPlayer = function(id) {
    return new Promise((resolve, reject) => {
        Player.findOne({_id: id}).populate('bingo').populate('card').exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}

const joinBingo =  function (playerName, code) {
    

    return new Promise(async (resolve, rejects) => {

        let bingo = await findBingoByCode(code)
        
        if(!bingo){
            resolve(null)
        }else{
            const doc = new Player({
                name: playerName,
                bingo: bingo._id,
                card: []
            })
    
            doc.id = doc._id;
    
            doc.save((error => {
                if (error) {
                    rejects(error)
                }
                doc.bingo = bingo
                resolve(doc)
            }))
        }

       
    })
}


const pickItem = function (playerId, itemId) {
   

    return new Promise(async (resolve, rejects) => {
        let item = await findItem(itemId)
        let player = await findPlayer(playerId)

        if(!player.card.some(i => i._id.equals(item._id)) && player.card.length < player.bingo.cardQtyItems){
            Player.findOneAndUpdate({_id: playerId},
                {
                    $addToSet: { card: itemId }
        
                },
                {new: true, runValidators: true, context: 'query'},
                (error, doc) => {
                    if (error) {
                        rejects(error)
                    }
    
                    resolve(item)
                })
        }else{
            resolve(null)
        }

            

    })
}


module.exports.pickItem = pickItem
module.exports.joinBingo = joinBingo
module.exports.playersByBingo = playersByBingo
module.exports.findPlayer = findPlayer