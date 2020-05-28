const {gql} = require('apollo-server-express');


module.exports.typeDefs = gql`

type Bingo{
    id: ID!
    name: String
    code: String
    items: [Item]
}

type Player{
    id: ID!
    bingo: ID
    name: String
    card: [Item]
}

type Item{
    id: ID!
    name: String
    img: String
    snd: String
}

input BingoInput{
    name: String
    code: String
}



type Query{

    bingo(id:ID!): Bingo

    playersByBingo(bingoId:ID!): [Player]

    items: [Item]

}



type Mutation{
    createBingo(input:BingoInput): Bingo

    joinBingo(playerName: String, code:String!): Bingo

    pickItem(playerId: ID, itemId:ID!): Item

    raffleItem(bingoId:ID!): Item
}
`
