import {IFieldResolver, gql} from 'apollo-server-express';
import {ApolloContext} from '../../types';

export const typeDefs = gql`
  extend type Mutation {
    taskListCreate(input: TaskListCreateInput!): TaskListCreateResponse
  }

  input TaskListCreateInput {
    title: String!
  }

  type TaskListCreateResponse {
    taskList: TaskList
  }
`;

export const resolver: IFieldResolver<any, ApolloContext> = async (
  _,
  {input},
  context,
) => {
  const {title} = input;

  const taskList = await context.db.taskList.create({
    data: {
      user: {connect: {id: context.userId}},
      title,
    },
  });

  return {taskList};
};
