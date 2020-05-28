const {findBingo, createBingo, raffleItem} = require('./services/BingoService')
const {playersByBingo, joinBingo, pickItem} = require('./services/PlayerService')
const {fetchItems} = require('./services/ItemService')

module.exports.resolvers = {
    Query: {
        bingo: (_, {id}) => {
            return findBingo(id)
        },
        playersByBingo: (_, {bingoId}) => {
            return playersByBingo(bingoId)
        },  
        items: (_) => {
            return fetchItems()
        },
    },
    Mutation: {
        createBingo: (_, {name}) => {
            return createBingo(name)
        },
        joinBingo: (_, {playerName, code}) => {
            return joinBingo(playerName, code)
        },
        pickItem: (_, {playerId, itemId}) => {
            return pickItem(playerId, itemId)
        },
        raffleItem: (_, {bingoId}) => {
            return raffleItem(bingoId)
        }
    }
};