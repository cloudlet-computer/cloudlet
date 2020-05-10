import express from 'express';
import compression from 'compression';
import path from 'path';
import bcrypt from 'bcrypt';
import {ApolloServer, gql} from 'apollo-server-express';
import {db} from './db';
import {logPlugin, logger} from './apollo';

const typeDefs = gql`
  type User {
    id: ID
    username: String
    name: String
    password: String
    notes: [Note]
  }

  type Note {
    id: ID
    title: String
    createdAt: String
  }

  type Query {
    user(id: ID): User
  }

  type Mutation {
    createUser(username: String!, password: String!): User
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
    Mutation: {
      async createUser(parent, args, context, info) {
        const passwordDigest = await bcrypt.hash(args.password, 12);

        const user = await db.user.create({
          data: {
            username: args.username,
            password: passwordDigest,
          },
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

app.get('/*', (_, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

app.listen({port: 4000}, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);
