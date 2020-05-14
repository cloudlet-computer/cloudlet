/** @jsx jsx */
import React, {InputHTMLAttributes} from 'react';
import {jsx, css} from '@emotion/core';

import {borderRadius} from '../border-radius';
import {color} from '../color';

interface Props {
  label?: string;
}

export function Input({
  label,
  ...props
}: Props & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      {label == null ? null : (
        <label
          css={css`
            display: block;
            margin-bottom: 4px;
          `}
        >
          {label}
        </label>
      )}
      <input
        css={css`
          appearance: none;
          background-color: white;
          border: 1px solid ${color.text};
          border-radius: ${borderRadius.base}px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1),
            inset 0 -1px 2px rgba(0, 0, 0, 0.1);
          display: block;
          font-size: inherit;
          line-height: inherit;
          padding: 8px;
          width: 100%;
        `}
        {...props}
      />
    </div>
  );
}
