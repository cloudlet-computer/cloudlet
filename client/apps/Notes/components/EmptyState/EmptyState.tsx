/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import {useMutation} from '@apollo/client';

import {Button, Heading, VerticalSpacing} from '../../../../ui-kit';
import {NoteCreateMutation} from '../../graphql/NoteCreateMutation';
import {NotesQuery} from '../../graphql/NotesQuery';

export function EmptyState() {
  const [noteCreate] = useMutation(NoteCreateMutation);

  async function handleCreateButtonClick() {
    const result = await noteCreate({
      refetchQueries: [{query: NotesQuery}],
    });

    console.log({result});
  }

  return (
    <div
      css={css`
        align-items: center;
        display: flex;
        justify-content: center;
        margin: auto;
        max-width: 600px;
        padding: 64px 12px;
      `}
    >
      <VerticalSpacing>
        <Heading size="large">Welcome to Notes! ✏️</Heading>
        <p>
          Any work you do here will be automatically synced to your cloudlet.
        </p>
        <div
          css={css`
            display: flex;
          `}
        >
          <Button onClick={handleCreateButtonClick}>Start a new note</Button>
        </div>
      </VerticalSpacing>
    </div>
  );
}
