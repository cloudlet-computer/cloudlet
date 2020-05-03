import express from 'express';
import compression from 'compression';
import path from 'path';
import {ApolloServer, gql} from 'apollo-server-express';
import {db} from './db';
import {logPlugin, logger} from './apollo';

const typeDefs = gql`
  type User {
    id: ID
    email: String
    name: String
    todos: [Todo]
  }

  type Todo {
    id: ID
    title: String
    completed: Boolean
  }

  type Query {
    user(id: ID): User
  }
`;

const server = new ApolloServer({
  typeDefs,
  context: {db},
  resolvers: {
    Query: {
      user(parent, args, context, info) {
        const user = context.db.user.findOne({
          where: {id: parseInt(args.id, 10)},
        });
        return user;
      },
    },
  },
  logger,
  plugins: [logPlugin],
});

const app = express();
server.applyMiddleware({app});

const clientDistPath = path.join(__dirname, '..', 'dist');

app.use(compression());
app.use(express.static(clientDistPath));

app.get('/notes/*', (_, res) => {
  res.sendFile(path.join(clientDistPath, 'Notes', 'index.html'));
});

app.listen({port: 4000}, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);
