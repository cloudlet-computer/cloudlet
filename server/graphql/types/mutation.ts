import {gql, IResolvers} from 'apollo-server-express';
import bcrypt from 'bcrypt';
import {ApolloContext} from '../../types';

export const typeDefs = gql`
  type Mutation {
    createUser(username: String!, password: String!): User
  }
`;

export const resolvers: IResolvers<any, ApolloContext> = {
  Mutation: {
    async createUser(parent, args, context, info) {
      const passwordDigest = await bcrypt.hash(args.password, 12);

      const user = await context.db.user.create({
        data: {
          username: args.username,
          password: passwordDigest,
        },
      });

      return user;
    },
  },
};
