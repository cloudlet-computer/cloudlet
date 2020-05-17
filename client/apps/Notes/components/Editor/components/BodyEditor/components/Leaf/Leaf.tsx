/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import {Text} from 'slate';
import {RenderLeafProps} from 'slate-react';

interface Props {
  leaf: Text & {
    bold?: boolean;
  };
}

export function Leaf({attributes, children, leaf}: RenderLeafProps & Props) {
  return (
    <span
      {...attributes}
      css={css`
        font-weight: ${leaf.bold ? 'bold' : 'normal'};
      `}
    >
      {children}
    </span>
  );
}
