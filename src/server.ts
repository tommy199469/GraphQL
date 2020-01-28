import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import schema from './schema';
import mongoose from 'mongoose';


const app = express();
const dbURL = 'mongodb+srv://testing:password123123123@cluster0-oxup0.mongodb.net/test?retryWrites=true&w=majority'

const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
});


app.use('*', cors());
app.use(compression());
server.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app);

httpServer.listen(
  { port: 4000 },
  (): void => {
    mongoose.connect(dbURL, {useNewUrlParser: true , useUnifiedTopology : true});
    mongoose.set('useCreateIndex', true);
    console.log('server start');
  });