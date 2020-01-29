import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import schema from './schema';
import mongoose from 'mongoose';
import resolverMap from './resolverMap'

const app = express();
const dbURL = 'mongodb+srv://testing:password123123123@cluster0-oxup0.mongodb.net/test?retryWrites=true&w=majority'


let subscriptions = { path: '/graphql' }
let context = () => ({ pubsub : resolverMap.pubsub })

console.log('resolverMap.pubsub' , resolverMap.pubsub);
const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
  subscriptions,
  context
});


app.use('*', cors());
app.use(compression());
server.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer)

httpServer.listen(
  { port: 4000 },
  (): void => {
    mongoose.connect(dbURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => { console.log(Error, err.message);});
  });