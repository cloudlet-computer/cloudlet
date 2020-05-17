import {gql} from '@apollo/client';

export const NoteUpdateMutation = gql`
  mutation NoteUpdate($input: NoteUpdateInput!) {
    noteUpdate(input: $input) {
      note {
        id
        title
      }
    }
  }
`;
