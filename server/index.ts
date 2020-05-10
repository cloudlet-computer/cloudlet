import express from 'express';
import compression from 'compression';
import path from 'path';
import {ApolloServer, AuthenticationError} from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import {db} from './db';
import {loadDotenv} from './environment/dotenv';
import {logPlugin, logger} from './apollo';
import {typeDefs, resolvers} from './graphql';
import {ApolloContext} from './types';

loadDotenv();

const server = new ApolloServer({
  typeDefs,
  context({req}): ApolloContext {
    const authToken = req.headers.authorization || '';

    let userId = null;
    jwt.verify(authToken, process.env.JWT_SECRET!, (err, decoded) => {
      if (err) {
        return;
      }

      userId = decoded == null ? null : (decoded as {userId: number}).userId;
    });

    return {db, userId};
  },
  resolvers,
  logger,
  plugins: [logPlugin],
});

const app = express();
server.applyMiddleware({app});

const clientDistPath = path.join(__dirname, '..', 'dist');

app.use(compression());
app.use(express.static(clientDistPath));

app.get('/*', (_, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

app.listen({port: 4000}, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);
