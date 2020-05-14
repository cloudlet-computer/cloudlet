/** @jsx jsx */
import React, {ButtonHTMLAttributes} from 'react';
import {jsx, css} from '@emotion/core';

import {borderRadius} from '../border-radius';
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
          border-radius: ${borderRadius.base}px;
          color: ${color.blue};
          cursor: pointer;
          font-size: inherit;
          line-height: inherit;
          padding: 4px;
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
        border-radius: ${borderRadius.base}px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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
