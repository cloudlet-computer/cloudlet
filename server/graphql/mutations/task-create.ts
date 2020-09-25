import {IFieldResolver, gql} from 'apollo-server-express';
import {ApolloContext} from '../../types';

export const typeDefs = gql`
  extend type Mutation {
    taskCreate(input: TaskCreateInput!): TaskCreateResponse
  }

  input TaskCreateInput {
    taskListId: ID!
    title: String!
  }

  type TaskCreateResponse {
    task: Task
  }
`;

export const resolver: IFieldResolver<any, ApolloContext> = async (
  _,
  {input},
  context,
) => {
  const {title, taskListId} = input;

  const task = await context.db.task.create({
    data: {
      title,
      taskList: {
        connect: {
          id: parseInt(taskListId, 10),
        },
      },
    },
  });

  return {task};
};
