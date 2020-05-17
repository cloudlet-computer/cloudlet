/** @jsx jsx */
import {useState} from 'react';
import {jsx, css} from '@emotion/core';
import {useQuery} from '@apollo/client';

import {NAVBAR_HEIGHT} from '../../ui-kit';

import {Editor, EmptyState, Sidebar} from './components';
import {NotesQuery} from './graphql/NotesQuery';
import {Note} from './types';

export function Notes() {
  const [activeNote, setActiveNote] = useState<Note>();
  const {loading, error, data} = useQuery(NotesQuery);

  if (loading || error || data == null) {
    return null;
  }

  if (data.me.notes.length === 0) {
    return <EmptyState />;
  }

  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 250px 1fr;
        height: calc(100vh - ${NAVBAR_HEIGHT});
      `}
    >
      <Sidebar
        notes={data.me.notes}
        onNoteSelect={(note) => setActiveNote(note)}
      />
      {activeNote == null ? (
        <p>Empty editor state</p>
      ) : (
        <Editor activeNote={activeNote} />
      )}
    </div>
  );
}
