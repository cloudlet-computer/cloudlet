import {gql, IResolvers} from 'apollo-server-express';
import {ApolloContext} from '../../types';

export const typeDefs = gql`
  type TaskList {
    id: ID!
    title: String
    tasks: [Task]
  }
`;

export const resolvers: IResolvers<any, ApolloContext> = {
  TaskList: {
    async tasks(parent, _, context) {
      const tasks = await context.db.task.findMany({
        where: {
          id: parent.id,
        },
      });

      return tasks;
    },
  },
};
