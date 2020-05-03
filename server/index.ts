import {ApolloServer, gql} from 'apollo-server';
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

server.listen().then(({url}) => {
  console.log(`🚀  Server ready at ${url}`);
});
