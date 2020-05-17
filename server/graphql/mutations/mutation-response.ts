import {gql} from 'apollo-server-express';

export const typeDefs = gql`
  interface MutationResponse {
    errors: String!
  }
`;
