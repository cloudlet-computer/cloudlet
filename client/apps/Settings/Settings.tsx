import React from 'react';
import {Heading, Container} from 'theme-ui';

import {CreateUser} from './components';

export function Settings() {
  return (
    <Container p={4}>
      <Heading>Settings</Heading>
      <hr />
      <CreateUser />
    </Container>
  );
}
