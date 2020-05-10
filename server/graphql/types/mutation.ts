import {gql, IResolvers} from 'apollo-server-express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {ApolloContext} from '../../types';

export const typeDefs = gql`
  type Mutation {
    createUser(username: String!, password: String!): User

    signIn(username: String!, password: String!): SignInPayload
  }

  type SignInPayload {
    user: User
    token: String
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

    async signIn(parent, args, context, info) {
      const {username, password} = args;

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
    },
  },
};
