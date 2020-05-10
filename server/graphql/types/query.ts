import {gql, IResolvers} from 'apollo-server-express';
import {ApolloContext} from '../../types';

export const typeDefs = gql`
  type Query {
    user(id: ID): User
  }
`;

export const resolvers: IResolvers<any, ApolloContext> = {
  Query: {
    user(parent, args, context, info) {
      const user = context.db.user.findOne({
        where: {id: parseInt(args.id, 10)},
      });

      return user;
    },
  },
};
