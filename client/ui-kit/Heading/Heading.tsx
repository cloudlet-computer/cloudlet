/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import {ReactNode} from 'react';

interface Props {
  children: ReactNode;
  size?: 'large' | 'medium';
}

export function Heading({children, size = 'medium'}: Props) {
  return (
    <h2
      css={css`
        font-size: ${size === 'medium' ? 24 : 36}px;
        font-weight: 700;
        line-height: 1.1;
      `}
    >
      {children}
    </h2>
  );
}
