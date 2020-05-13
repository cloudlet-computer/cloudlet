/** @jsx jsx */
import React, {ButtonHTMLAttributes} from 'react';
import {jsx, css} from '@emotion/core';

import {color} from '../color';

interface Props {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({
  children,
  fullWidth = false,
  ...props
}: Props & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      css={css`
        background: ${color.blue};
        border: 1px solid ${color.blue};
        border-radius: 4px;
        color: white;
        cursor: pointer;
        display: block;
        font-size: 16px;
        line-height: 24px;
        padding: 8px 16px;
        width: ${fullWidth ? '100%' : undefined};
      `}
      {...props}
    >
      {children}
    </button>
  );
}
