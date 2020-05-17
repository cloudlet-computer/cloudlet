/** @jsx jsx */
import {jsx, css} from '@emotion/core';

import {Heading} from '../../ui-kit';

import {CreateUser} from './components';

export function Settings() {
  return (
    <div
      css={css`
        padding: 20px;
      `}
    >
      <Heading size="large">Settings</Heading>
      <hr />
      <CreateUser />
    </div>
  );
}
