/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import {Link} from 'react-router-dom';

import {color, Button} from '../../ui-kit';
import {useAuth} from '../../context';

export function Navbar() {
  const {logout} = useAuth();

  return (
    <nav
      css={css`
        align-items: center;
        background: white;
        border-bottom: 1px solid ${color.gray};
        display: flex;
        justify-content: space-between;
        padding: 8px 16px;
      `}
    >
      <div>
        <h2>
          <Link
            to="/"
            css={css`
              text-decoration: none;
            `}
          >
            ☁️
          </Link>
        </h2>
      </div>

      <div>
        <Button plain onClick={() => logout()}>
          Sign out
        </Button>
      </div>
    </nav>
  );
}
