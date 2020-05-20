/** @jsx jsx */
import React, {ButtonHTMLAttributes} from 'react';
import {jsx, css} from '@emotion/core';

import {borderRadius} from '../border-radius';
import {color} from '../color';

interface Props {
  children: React.ReactNode;
  fullWidth?: boolean;
  plain?: boolean;
  size?: 'small' | 'medium';
}

export function Button({
  children,
  fullWidth = false,
  plain = false,
  type = 'button',
  size = 'medium',
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
          padding: 0;
        `}
        type={type}
        {...props}
      >
        {children}
      </button>
    );
  }

  let padding = '0px';
  let fontSize = 'inherit';
  if (size === 'small') {
    padding = '4px 8px';
    fontSize = '14px';
  } else if (size === 'medium') {
    padding = '8px 16px';
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
        font-size: ${fontSize};
        line-height: inherit;
        padding: ${padding};
        width: ${fullWidth ? '100%' : undefined};
      `}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
