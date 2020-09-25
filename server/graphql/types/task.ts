import {gql, IResolvers} from 'apollo-server-express';
import {ApolloContext} from '../../types';

export const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    completedAt: String
    createdAt: String!
    updatedAt: String!
  }
`;

export const resolvers: IResolvers<any, ApolloContext> = {
  Task: {},
};
