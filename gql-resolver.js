const {findBingo, createBingo, raffleItem} = require('./services/BingoService')
const {playersByBingo, joinBingo, pickItem} = require('./services/PlayerService')
const {fetchItems} = require('./services/ItemService')
const {pubsub} = require('./PubSub')
const { withFilter } = require('graphql-subscriptions');

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

            return new Promise( (resolve, reject) => {
                raffleItem(bingoId).then(r => {
                    
                    if(r){
                        r.bingoId = bingoId
                        pubsub.publish('itemAdded', r);
                    }

                    resolve(r)
                }).catch(err => reject(err))
            })
            
        }
    },
    Subscription: {
        itemAdded: {
            resolve: (payload) => {
                return payload; //Manipulate at you wish
            },
            subscribe: withFilter(
            () => pubsub.asyncIterator('itemAdded'), 
            (payload, variables) => {
                return payload.bingoId === variables.bingoId;
             }),
            //subscribe: () => pubsub.asyncIterator('itemAdded')
        }
    },
};