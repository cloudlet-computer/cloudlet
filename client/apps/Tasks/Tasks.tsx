/** @jsx jsx */
import {jsx, css} from '@emotion/core';

import {Heading} from '../../ui-kit';

export function Tasks() {
  return (
    <div
      css={css`
        padding: 20px;
      `}
    >
      <Heading size="large">Tasks</Heading>
    </div>
  );
}
