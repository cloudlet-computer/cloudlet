/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import {Link} from 'react-router-dom';

import {borderRadius, Button, Heading} from '../../../../ui-kit';

interface Props {
  emoji: string;
  route: string;
  appName: string;
}

export function AppCard({emoji, route, appName}: Props) {
  return (
    <Link
      to={route}
      css={css`
        color: inherit;
        display: block;
        text-decoration: none;
      `}
    >
      <div
        css={css`
          border: 1px solid #ddd;
          border-radius: ${borderRadius.base}px;
          box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
          padding: 32px 24px;
          position: relative;
          transition: box-shadow 200ms, transform 200ms;
          transform: translate3d(0, 0, 0);

          &:hover {
            box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
            transform: translate3d(0, -4px, 0);
          }
        `}
      >
        <div
          css={css`
            font-size: 36px;
            left: 4px;
            top: -24px;
            position: absolute;
          `}
        >
          <span role="img">{emoji}</span>
        </div>
        <Heading>{appName}</Heading>
        <Button plain>Open &rarr;</Button>
      </div>
    </Link>
  );
}
