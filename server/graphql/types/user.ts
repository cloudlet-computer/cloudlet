import {gql, IResolvers} from 'apollo-server-express';
import {ApolloContext} from '../../types';

export const typeDefs = gql`
  type User {
    id: ID
    username: String
    name: String
    password: String
    notes(first: Int): [Note]
  }
`;

export const resolvers: IResolvers<any, ApolloContext> = {
  User: {
    notes(parent, args, context) {
      const {db} = context;
      const {first = 10} = args;

      const notes = db.note.findMany({
        where: {
          userId: parent.id,
        },
        first,
        orderBy: {
          updatedAt: 'desc',
        },
      });

      return notes;
    },
  },
};
