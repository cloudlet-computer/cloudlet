/** @jsx jsx */
import {jsx, css} from '@emotion/core';

import {color} from '../../../../ui-kit';
import {Note} from '../../types';

interface Props {
  notes: Note[];
  onNoteSelect(note: Note): void;
}

export function Sidebar({notes, onNoteSelect}: Props) {
  return (
    <div
      css={css`
        border-right: 1px solid ${color.gray};
      `}
    >
      {notes.map((note) => {
        const {id, title} = note;

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
            {title === '' ? <em>No title</em> : <p>{title}</p>}
          </button>
        );
      })}
    </div>
  );
}
