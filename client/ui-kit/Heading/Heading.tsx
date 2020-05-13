/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import {ReactNode} from 'react';

interface Props {
  children: ReactNode;
}

export function Heading({children}: Props) {
  return (
    <h2
      css={css`
        font-weight: 700;
        line-height: 1.1;
      `}
    >
      {children}
    </h2>
  );
}
