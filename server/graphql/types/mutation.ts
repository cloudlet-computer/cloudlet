import {gql, IResolvers} from 'apollo-server-express';

import {ApolloContext} from '../../types';

import {resolver as noteCreate} from '../mutations/note-create';
import {resolver as noteUpdate} from '../mutations/note-update';
import {resolver as signIn} from '../mutations/sign-in';
import {resolver as userCreate} from '../mutations/user-create';
import {resolver as taskCreate} from '../mutations/task-create';
import {resolver as taskListCreate} from '../mutations/task-list-create';

export const typeDefs = gql`
  type Mutation {
    _: Boolean!
  }
`;

export const resolvers: IResolvers<any, ApolloContext> = {
  Mutation: {
    _: () => true,
    noteCreate,
    noteUpdate,
    userCreate,
    signIn,
    taskCreate,
    taskListCreate,
  },
};
