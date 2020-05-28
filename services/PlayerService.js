const {Player}  = require( '../models/PlayerModel')

module.exports.playersByBingo = function (bingoId) {
    return new Promise((resolve, reject) => {
        Player.find({bingo: bingoId}).exec((err, res) => (
            err ? reject(err) : resolve(res)
        ));
    })
}


module.exports.joinBingo = async function (playerName, bingoId) {

    const doc = new Player({
        name: playerName,
        bingo: bingoId,
        card: []
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


module.exports.pickItem = async function (playerId, itemId) {

    return new Promise((resolve, rejects) => {
        person.findOneAndUpdate({_id: playerId},
            {
                $addToSet: { card: itemId }
    
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
