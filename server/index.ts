import express from 'express';
import compression from 'compression';
import path from 'path';
import {ApolloServer} from 'apollo-server-express';
import {db} from './db';
import {logPlugin, logger} from './apollo';
import {typeDefs, resolvers} from './graphql';
import {ApolloContext} from './types';

const server = new ApolloServer({
  typeDefs,
  context({req}) {
    const context: ApolloContext = {db};

    return context;
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
