import {gql} from '@apollo/client';

export const NoteCreateMutation = gql`
  mutation NoteCreate {
    noteCreate {
      note {
        id
        title
      }
    }
  }
`;
