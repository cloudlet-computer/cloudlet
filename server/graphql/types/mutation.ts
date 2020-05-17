import {gql, IResolvers, ForbiddenError} from 'apollo-server-express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {ApolloContext} from '../../types';

export const typeDefs = gql`
  type Mutation {
    createUser(username: String!, password: String!): User

    signIn(username: String!, password: String!): SignInResponse

    noteCreate: NoteCreateResponse

    noteUpdate(input: NoteUpdateInput!): NoteUpdateResponse
  }

  input NoteUpdateInput {
    id: ID!
    title: String!
  }

  type NoteUpdateResponse {
    note: Note
  }

  type SignInResponse {
    user: User
    token: String
  }

  type NoteCreateResponse {
    note: Note
  }
`;

export const resolvers: IResolvers<any, ApolloContext> = {
  Mutation: {
    async noteCreate(_, __, context) {
      const note = await context.db.note.create({
        data: {
          user: {connect: {id: context.userId}},
          title: '',
        },
      });

      return {note};
    },

    async noteUpdate(_, args, context) {
      const {
        input: {id, title},
      } = args;
      const {db, userId} = context;

      const note = await db.note.findOne({where: {id: parseInt(id, 10)}});

      if (note == null) {
        throw new Error('Not found');
      }

      if (note?.userId !== userId) {
        throw new ForbiddenError('Not authorized');
      }

      const updatedNote = await db.note.update({
        where: {
          id: parseInt(id, 10),
        },
        data: {
          title,
        },
      });

      return updatedNote;
    },

    async createUser(parent, args, context) {
      const passwordDigest = await bcrypt.hash(args.password, 12);

      const user = await context.db.user.create({
        data: {
          username: args.username,
          password: passwordDigest,
        },
      });

      return user;
    },

    async signIn(parent, args, context) {
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
