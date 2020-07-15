/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import {useMutation} from '@apollo/client';

import {color, Button, VerticalSpacing} from '../../../../ui-kit';
import {Note} from '../../types';
import {NoteCreateMutation} from '../../graphql/NoteCreateMutation';
import {NotesQuery} from '../../graphql/NotesQuery';

interface Props {
  notes: Note[];
  onNoteSelect(note: Note): void;
}

const formatDate = Intl.DateTimeFormat('en', {
  month: 'long',
  year: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
}).format;

export function Sidebar({notes, onNoteSelect}: Props) {
  const [noteCreate] = useMutation(NoteCreateMutation);

  async function handleCreateButtonClick() {
    const {data} = await noteCreate({
      refetchQueries: [{query: NotesQuery}],
    });

    onNoteSelect(data.noteCreate.note);
  }

  return (
    <div
      css={css`
        border-right: 1px solid ${color.gray};
        height: 100%;
        overflow-y: scroll;
        padding: 16px 0;
      `}
    >
      <VerticalSpacing>
        <div
          css={css`
            padding: 0 10px;
          `}
        >
          <Button fullWidth size="small" onClick={handleCreateButtonClick}>
            New note
          </Button>
        </div>
        <div>
          {notes.map((note) => {
            const {id, title, updatedAt} = note;

            return (
              <button
                key={id}
                onClick={() => onNoteSelect(note)}
                css={css`
                  display: block;
                  border: 0;
                  border-bottom: 1px solid ${color.gray};
                  cursor: pointer;
                  font-size: inherit;
                  padding: 24px 12px;
                  text-align: left;
                  width: 100%;

                  &:first-of-type {
                    border-top: 1px solid ${color.gray};
                  }

                  :hover {
                    background: ${color.gray};
                  }
                `}
              >
                <p>{title === '' ? <em>No title</em> : title}</p>
                <p
                  css={css`
                    font-size: 12px;
                    font-style: italic;
                    margin-top: 8px;
                  `}
                >
                  {formatDate(new Date(parseInt(updatedAt, 10)))}
                </p>
              </button>
            );
          })}
        </div>
      </VerticalSpacing>
    </div>
  );
}
