import React, {useState} from 'react';
import {useMutation, gql} from '@apollo/client';

import {Button, Heading, Input, VerticalSpacing} from '../../../../ui-kit';

export function CreateUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [createUser] = useMutation(gql`
    mutation CreateUser($username: String!, $password: String!) {
      createUser(username: $username, password: $password) {
        id
        username
      }
    }
  `);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const result = await createUser({
      variables: {
        username,
        password,
      },
    });

    console.log(result);
  }

  return (
    <form onSubmit={handleSubmit}>
      <VerticalSpacing>
        <Heading>Create user</Heading>

        <Input
          label="Username"
          onChange={(event) => setUsername(event.target.value)}
          value={username}
        />

        <Input
          label="Password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          type="password"
        />

        <div>
          <Button>Save</Button>
        </div>
      </VerticalSpacing>
    </form>
  );
}
