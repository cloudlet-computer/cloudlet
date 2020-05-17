import {gql, IResolvers} from 'apollo-server-express';
import {ApolloContext} from '../../types';

export const typeDefs = gql`
  type Note {
    id: ID!
    title: String
    createdAt: String!
    updatedAt: String!
  }
`;

export const resolvers: IResolvers<any, ApolloContext> = {
  Note: {},
};
