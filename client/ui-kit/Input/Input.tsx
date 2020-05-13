/** @jsx jsx */
import React, {InputHTMLAttributes} from 'react';
import {jsx, css} from '@emotion/core';

import {color} from '../color';

interface Props {
  label?: string;
}

export function Input({
  label,
  ...props
}: Props & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <React.Fragment>
      {label == null ? null : (
        <label
          css={css`
            display: block;
          `}
        >
          {label}
        </label>
      )}
      <input
        css={css`
          appearance: none;
          background-color: transparent;
          border: 1px solid ${color.text};
          border-radius: 4px;
          display: block;
          font-size: inherit;
          line-height: inherit;
          padding: 8px;
          width: 100%;
        `}
        {...props}
      />
    </React.Fragment>
  );
}
