import {
  gql,
  IResolvers,
  ForbiddenError,
  UserInputError,
} from 'apollo-server-express';
import {ApolloContext} from '../../types';

export const typeDefs = gql`
  type User {
    id: ID
    username: String
    name: String
    password: String
    notes(first: Int): [Note]
    taskLists(first: Int): [TaskList]
    taskList(id: ID!): TaskList
  }
`;

export const resolvers: IResolvers<any, ApolloContext> = {
  User: {
    notes(parent, args, context) {
      const {db} = context;
      const {first = 10} = args;

      const notes = db.note.findMany({
        where: {
          userId: parent.id,
        },
        first,
        orderBy: {
          updatedAt: 'desc',
        },
      });

      return notes;
    },

    async taskList(parent, args, context) {
      const {db} = context;
      const {id} = args;

      const taskList = await db.taskList.findOne({
        where: {id: parseInt(id, 10)},
      });

      if (taskList == null) {
        throw new UserInputError('Not found');
      }

      if (taskList.userId !== parent.id) {
        throw new ForbiddenError('Not authorized');
      }

      return taskList;
    },

    async taskLists(parent, _, context) {
      const {db} = context;

      return await db.taskList.findMany({
        where: {
          userId: parent.id,
        },
      });
    },
  },
};
