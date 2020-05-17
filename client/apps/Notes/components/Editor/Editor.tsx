/** @jsx jsx */
import {useEffect} from 'react';
import {jsx, css} from '@emotion/core';
import {useMutation} from '@apollo/client';

import {useStateFromProp} from '../../../../hooks';
import {Note} from '../../types';
import {NotesQuery} from '../../graphql/NotesQuery';
import {NoteUpdateMutation} from '../../graphql/NoteUpdateMutation';

interface Props {
  activeNote: Note;
}

export function Editor({activeNote}: Props) {
  const [title, setTitle] = useStateFromProp(activeNote.title);
  const [noteUpdateMutation] = useMutation(NoteUpdateMutation);

  useEffect(() => {
    if (title === activeNote.title) {
      return;
    }

    async function mutate() {
      const response = await noteUpdateMutation({
        variables: {
          input: {
            id: activeNote.id,
            title,
          },
        },
        refetchQueries: [{query: NotesQuery}],
      });

      console.log({response});
    }
    mutate();
  }, [title]);

  return (
    <section
      css={css`
        padding: 20px;
      `}
    >
      <div>
        <input
          css={css`
            border: 0;
            font-size: 36px;
          `}
          placeholder="No title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      </div>
      <p>Editor for note ID {activeNote.id}</p>
    </section>
  );
}
