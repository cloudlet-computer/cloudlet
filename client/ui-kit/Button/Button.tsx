/** @jsx jsx */
import React, {ButtonHTMLAttributes} from 'react';
import {jsx, css} from '@emotion/core';

import {color} from '../color';

interface Props {
  children: React.ReactNode;
  fullWidth?: boolean;
  plain?: boolean;
}

export function Button({
  children,
  fullWidth = false,
  plain = false,
  type = 'button',
  ...props
}: Props & ButtonHTMLAttributes<HTMLButtonElement>) {
  if (plain) {
    return (
      <button
        css={css`
          background: none;
          border: none;
          color: ${color.blue};
          cursor: pointer;
          font-size: inherit;
          line-height: inherit;
        `}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      css={css`
        background: ${color.blue};
        border: 1px solid ${color.blue};
        border-radius: 4px;
        color: white;
        cursor: pointer;
        display: block;
        font-size: inherit;
        line-height: inherit;
        padding: 8px 16px;
        width: ${fullWidth ? '100%' : undefined};
      `}
      {...props}
    >
      {children}
    </button>
  );
}
