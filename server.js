const dotenv =require('dotenv')
dotenv.config()
const express = require('express');
require('./mongo.js')
const {ApolloServer} = require('apollo-server-express');
const corsMiddleware = require('./middlewares/corsMiddleware')
const http = require('http');


//Schema
const {resolvers} = require('./gql-resolver.js')
const {typeDefs} = require('./gql-types')


//HTTP PORT
const PORT = process.env.PORT?process.env.PORT:4000

const server = new ApolloServer({
  typeDefs, 
  resolvers,
  subscriptions: {
    onConnect: () => console.log('Connected to websocket'),
    onDisconnect: () => console.log('Disconnected from websocket'),
    onError: (err) => console.error(err)
  },
  tracing: true,
});

const app = express();

server.applyMiddleware({app});

app.use(corsMiddleware)

app.use('/media/items/img', express.static('media/items/img'));
app.use('/media/items/snd', express.static('media/items/snd'));
app.use('/media/assets', express.static('media/assets'));

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

//NORMAL
httpServer.listen({port: PORT}, () => {
  console.log(`Now browse to http://localhost::${PORT}${server.graphqlPath}`)
  console.log(`Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
  }
); 

