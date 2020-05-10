import {gql, IResolvers} from 'apollo-server-express';
import {ApolloContext} from '../../types';

export const typeDefs = gql`
  type User {
    id: ID
    username: String
    name: String
    password: String
    notes: [Note]
  }
`;

export const resolvers: IResolvers<any, ApolloContext> = {
  User: {
    notes(parent, args, context, info) {
      // TODO
      return [];
    },
  },
};
