import {IFieldResolver, gql} from 'apollo-server-express';
import bcrypt from 'bcrypt';
import {ApolloContext} from '../../types';

export const typeDefs = gql`
  extend type Mutation {
    userCreate(input: UserCreateInput!): UserCreateResponse
  }

  input UserCreateInput {
    username: String!
    password: String!
  }

  type UserCreateResponse {
    user: User
  }
`;

export const resolver: IFieldResolver<any, ApolloContext> = async (
  _,
  args,
  context,
) => {
  const {
    input: {password, username},
  } = args;

  const passwordDigest = await bcrypt.hash(password, 12);

  const user = await context.db.user.create({
    data: {
      username: username,
      password: passwordDigest,
    },
  });

  return user;
};
