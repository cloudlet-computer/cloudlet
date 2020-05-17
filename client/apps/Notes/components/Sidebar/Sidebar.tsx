/** @jsx jsx */
import {jsx, css} from '@emotion/core';

import {color} from '../../../../ui-kit';
import {Note} from '../../types';

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
  return (
    <div
      css={css`
        border-right: 1px solid ${color.gray};
      `}
    >
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
  );
}
