const express = require('express');
require('./mongo.js')
const {ApolloServer} = require('apollo-server-express');

const {resolvers} = require('./gql-resolver.js')
const {typeDefs} = require('./gql-types')

const server = new ApolloServer({typeDefs, resolvers});

const app = express();
server.applyMiddleware({app});

app.listen({port: 4000}, () =>
    console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);