import React, {useState} from 'react';
import {Box, Heading, Label, Input, Button} from 'theme-ui';
import {useMutation, gql} from '@apollo/client';

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
    <Box as="form" onSubmit={handleSubmit}>
      <Heading>Create user</Heading>

      <Label>Username</Label>
      <Input
        onChange={(event) => setUsername(event.target.value)}
        value={username}
      />

      <Label>Password</Label>
      <Input
        onChange={(event) => setPassword(event.target.value)}
        value={password}
        type="password"
      />

      <Button>Save</Button>
    </Box>
  );
}
