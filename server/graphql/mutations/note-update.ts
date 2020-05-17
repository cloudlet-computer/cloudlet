import {IFieldResolver, gql, ForbiddenError} from 'apollo-server-express';
import {ApolloContext} from '../../types';

export const typeDefs = gql`
  extend type Mutation {
    noteUpdate(input: NoteUpdateInput!): NoteUpdateResponse
  }

  input NoteUpdateInput {
    id: ID!
    title: String!
  }

  type NoteUpdateResponse {
    note: Note
  }
`;

export const resolver: IFieldResolver<any, ApolloContext> = async (
  _,
  args,
  context,
) => {
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
};
