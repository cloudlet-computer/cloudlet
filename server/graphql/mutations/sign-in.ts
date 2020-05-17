import {IFieldResolver, gql} from 'apollo-server-express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {ApolloContext} from '../../types';

export const typeDefs = gql`
  extend type Mutation {
    signIn(input: SignInInput!): SignInResponse
  }

  input SignInInput {
    username: String!
    password: String!
  }

  type SignInResponse {
    user: User
    token: String
  }
`;

export const resolver: IFieldResolver<any, ApolloContext> = async (
  _,
  args,
  context,
) => {
  const {
    input: {username, password},
  } = args;

  const user = await context.db.user.findOne({
    where: {
      username,
    },
  });

  if (user == null) {
    return null;
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    return null;
  }

  const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET!);

  return {
    user,
    token,
  };
};
