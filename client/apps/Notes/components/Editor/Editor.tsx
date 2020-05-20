/** @jsx jsx */
import {useEffect, useState} from 'react';
import {jsx, css} from '@emotion/core';
import {useMutation} from '@apollo/client';

import {VerticalSpacing} from '../../../../ui-kit';
import {useStateFromProp} from '../../../../hooks';
import {Note} from '../../types';
import {NotesQuery} from '../../graphql/NotesQuery';
import {NoteUpdateMutation} from '../../graphql/NoteUpdateMutation';

import {BodyEditor} from './components';

interface Props {
  activeNote: Note;
}

export function Editor({activeNote}: Props) {
  const [title, setTitle] = useStateFromProp(activeNote.title);
  const [bodyValue, setBodyValue] = useState([
    {
      type: 'paragraph',
      children: [{text: ''}],
    },
  ]);
  const [noteUpdateMutation] = useMutation(NoteUpdateMutation);

  useEffect(() => {
    if (title === activeNote.title) {
      return;
    }

    async function mutate() {
      await noteUpdateMutation({
        variables: {
          input: {
            id: activeNote.id,
            title,
          },
        },
        refetchQueries: [{query: NotesQuery}],
      });
    }

    const handler = setTimeout(() => {
      mutate();
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [title]);

  return (
    <section
      css={css`
        padding: 20px;
      `}
    >
      <VerticalSpacing>
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
        <BodyEditor value={bodyValue} onValueChange={setBodyValue} />
      </VerticalSpacing>
    </section>
  );
}
