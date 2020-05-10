import {gql, IResolvers} from 'apollo-server-express';
import {ApolloContext} from '../../types';

export const typeDefs = gql`
  type Query {
    me: User
    user(id: ID): User
  }
`;

export const resolvers: IResolvers<any, ApolloContext> = {
  Query: {
    async me(parent, args, context, info) {
      if (context.userId == null) {
        return null;
      }

      const user = await context.db.user.findOne({
        where: {
          id: context.userId,
        },
      });

      return user;
    },
    async user(parent, args, context, info) {
      const user = await context.db.user.findOne({
        where: {id: parseInt(args.id, 10)},
      });

      return user;
    },
  },
};
