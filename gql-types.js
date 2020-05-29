const {gql} = require('apollo-server-express');


module.exports.typeDefs = gql`

type Bingo{
    id: ID!
    name: String
    code: String
    cardQtyItems: Int
    items: [Item]
}

type Player{
    id: ID!
    bingo: Bingo!
    name: String
    card: [Item]
}

type Item{
    id: ID!
    name: String
    img: String
    snd: String
}



type Query{

    bingo(id:ID!): Bingo

    playersByBingo(bingoId:ID!): [Player]

    items: [Item]

}



type Mutation{
    createBingo(name:String!): Bingo!

    joinBingo(playerName: String!, code:String!): Player

    pickItem(playerId: ID!, itemId:ID!): Item

    raffleItem(bingoId:ID!): Item
}

type Subscription {
  itemAdded(bingoId: ID!): Item
}

`
