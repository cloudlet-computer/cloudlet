/** @jsx jsx */
import {jsx} from '@emotion/core';

import {Heading} from '../../ui-kit';

import {AppCard} from './components';

export function Home() {
  return (
    <div css={{padding: 20, maxWidth: 1200, margin: 'auto'}}>
      <Heading size="large">☁️ Home</Heading>

      <div
        css={{
          display: 'grid',
          gridGap: 24,
          gridTemplateColumns: 'repeat(3, 1fr)',
          marginTop: 32,
        }}
      >
        <AppCard route="/notes" emoji="✏️" appName="Notes" />
        <AppCard route="/settings" emoji="⚙️" appName="Settings" />
        <AppCard route="/tasks" emoji="✅" appName="Tasks" />
      </div>
    </div>
  );
}
