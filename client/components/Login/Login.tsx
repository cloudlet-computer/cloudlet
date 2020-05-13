/** @jsx jsx */
import {useState} from 'react';
import {useMutation, gql} from '@apollo/client';
import {jsx, Box, Container, Heading, Input as OldInput, Label} from 'theme-ui';

import {Button, Input} from '../../ui-kit';
import {useAuth} from '../../context';

export function Login() {
  const {login} = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signInMutation] = useMutation(gql`
    mutation SignInMutation($username: String!, $password: String!) {
      signIn(username: $username, password: $password) {
        token
      }
    }
  `);

  async function handleSubmit() {
    const {data} = await signInMutation({variables: {username, password}});

    if (data.signIn != null) {
      login(data.signIn.token);
    }
  }

  return (
    <Container sx={{maxWidth: 400}}>
      <Box
        sx={{
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          padding: 4,
          borderRadius: 4,
        }}
      >
        <Heading>Log in</Heading>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <Input
            label="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <Input
            label="Password"
            value={password}
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />

          <Button fullWidth type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
}
