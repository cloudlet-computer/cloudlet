/** @jsx jsx */
import {useEffect, useState} from 'react';
import {jsx, css} from '@emotion/core';
import {useMutation} from '@apollo/client';

import {VerticalSpacing, borderRadius} from '../../../../ui-kit';
import {useStateFromProp} from '../../../../hooks';
import {Note} from '../../types';
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
              border-radius: ${borderRadius.base}px;
              font-size: 36px;
              outline: none;
              padding: 8px;
              width: 100%;

              &:focus {
                background: #efefef;
              }
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
