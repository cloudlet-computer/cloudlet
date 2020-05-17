import {IFieldResolver, gql} from 'apollo-server-express';
import {ApolloContext} from '../../types';

export const typeDefs = gql`
  extend type Mutation {
    noteCreate: NoteCreateResponse
  }

  type NoteCreateResponse {
    note: Note
  }
`;

export const resolver: IFieldResolver<any, ApolloContext> = async (
  _,
  __,
  context,
) => {
  const note = await context.db.note.create({
    data: {
      user: {connect: {id: context.userId}},
      title: '',
    },
  });

  return {note};
};
