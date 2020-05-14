/** @jsx jsx */
import {jsx, css} from '@emotion/core';

interface Props {
  children: React.ReactNode;
}

export function VerticalSpacing({children}: Props) {
  return (
    <div
      css={css`
        display: grid;
        grid-auto-flow: row;
        grid-gap: 16px;
      `}
    >
      {children}
    </div>
  );
}
