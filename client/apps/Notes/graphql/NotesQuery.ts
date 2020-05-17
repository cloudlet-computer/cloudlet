import {gql} from '@apollo/client';

export const NotesQuery = gql`
  query NotesQuery {
    me {
      notes {
        id
        title
        updatedAt
      }
    }
  }
`;
